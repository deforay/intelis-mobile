import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import * as moment from 'moment';

/**
 * Handles the reference data the server returns from /api/v1.1/init.php:
 * incremental sync bookkeeping, merging of incremental responses into the
 * stored copy, and writing facilities to SQLite in batches.
 */
@Injectable({ providedIn: 'root' })
export class InitDataService {
  /** Fields that identify an item inside the init lists, in order of preference. */
  private static readonly KEY_FIELDS = ['facility_id', 'geo_id', 'user_id', 'value'];
  /** 10 columns per row; SQLite allows 32,766 bound parameters per statement. */
  private static readonly FACILITY_CHUNK = 2500;
  private static readonly SYNCED_AT_KEY = 'initSyncedAt';

  constructor(private sqlite: SQLite, private storage: Storage) {}

  /**
   * The value to send as latestDateTime so the server returns only changes since
   * the last successful init. One day of overlap covers clock and timezone
   * differences; the merge is by id, so overlap is harmless. Null means "send
   * nothing", which makes the server return the full dataset.
   */
  async latestDateTimeForSync(): Promise<string | null> {
    const syncedAt = await this.storage.get(InitDataService.SYNCED_AT_KEY);
    if (!syncedAt) {
      return null;
    }
    return moment.unix(Number(syncedAt)).subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss');
  }

  /** Remember when init last succeeded. Prefers the server's own timestamp. */
  async recordInitSync(serverTimestamp?: number): Promise<void> {
    const ts = Number(serverTimestamp) || Math.floor(Date.now() / 1000);
    await this.storage.set(InitDataService.SYNCED_AT_KEY, ts);
  }

  async clearSyncMarker(): Promise<void> {
    await this.storage.remove(InitDataService.SYNCED_AT_KEY);
  }

  /**
   * Merge an incremental init response into the stored one. Lists whose items
   * carry an id are upserted by that id; other non-empty values replace the
   * stored value; empty incoming lists leave the stored list untouched, since an
   * incremental response is empty for lists that did not change.
   */
  merge(existing: any, incoming: any): any {
    if (!existing || typeof existing !== 'object') {
      return incoming;
    }
    if (!incoming || typeof incoming !== 'object') {
      return existing;
    }
    const out: any = { ...existing };
    for (const key of Object.keys(incoming)) {
      const inc = incoming[key];
      const cur = existing[key];
      if (Array.isArray(inc)) {
        if (!inc.length) {
          continue;
        }
        const keyField = Array.isArray(cur) ? this.keyFieldOf(inc[0] || cur[0]) : this.keyFieldOf(inc[0]);
        if (keyField && Array.isArray(cur)) {
          const byId = new Map<any, any>();
          for (const item of cur) { byId.set(String(item[keyField]), item); }
          for (const item of inc) { byId.set(String(item[keyField]), item); }
          out[key] = Array.from(byId.values());
        } else {
          out[key] = inc;
        }
      } else if (inc && typeof inc === 'object' && cur && typeof cur === 'object' && !Array.isArray(cur)) {
        out[key] = this.merge(cur, inc);
      } else if (inc !== null && inc !== undefined && inc !== '') {
        out[key] = inc;
      }
    }
    return out;
  }

  private keyFieldOf(item: any): string | null {
    if (!item || typeof item !== 'object') {
      return null;
    }
    return InitDataService.KEY_FIELDS.find(f => item[f] !== undefined) || null;
  }

  /** Upsert facilities into SQLite in batches that stay under the bound-parameter limit. */
  async insertFacilities(facilities: any[]): Promise<number> {
    if (!Array.isArray(facilities) || !facilities.length) {
      return 0;
    }
    const db: SQLiteObject = await this.sqlite.create({ name: 'vlsm_mobile.db', location: 'default' });
    const head = 'INSERT OR REPLACE INTO facility_details (facility_id,facility_name,facility_code,facility_state,facility_state_id,facility_district,facility_district_id,other_id,testing_points,status) VALUES ';
    let written = 0;
    for (let start = 0; start < facilities.length; start += InitDataService.FACILITY_CHUNK) {
      const chunk = facilities.slice(start, start + InitDataService.FACILITY_CHUNK);
      const params: any[] = [];
      const rows: string[] = [];
      for (const f of chunk) {
        rows.push('(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        params.push(f.facility_id, f.facility_name, f.facility_code, f.facility_state, f.facility_state_id,
          f.facility_district, f.facility_district_id, f.other_id, f.testing_points, f.status);
      }
      await db.executeSql(head + rows.join(', '), params);
      written += chunk.length;
    }
    return written;
  }
}
