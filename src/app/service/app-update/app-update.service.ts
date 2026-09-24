import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, timeout } from 'rxjs';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Storage } from '@ionic/storage-angular';

// The version published on Google Play, kept in docs/version.json on main and served by the
// app's GitHub Pages site. It is raised by hand once a release is live on Play, so the app
// never points users at a build they cannot install yet.
const PUBLISHED_VERSION_URL = 'https://deforay.github.io/intelis-mobile/version.json';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.deforay.vlsm';

@Injectable({ providedIn: 'root' })
export class AppUpdateService {
  // Dismissing the notice hides it until the app is started again.
  dismissed = false;

  constructor(private http: HttpClient, private appVersion: AppVersion, private storage: Storage) { }

  // Asked of the device each time: the stored copy is written after start-up, so right after
  // an update it can still hold the previous version.
  async installedVersion(): Promise<string | null> {
    try {
      return await this.appVersion.getVersionNumber();
    } catch (e) {
      return await this.storage.get('appVersionNumber');
    }
  }

  // The published version when it is newer than the one installed; null otherwise, and
  // whenever the file cannot be read, so being offline shows nothing.
  async newerPublishedVersion(installed: string): Promise<string | null> {
    if (!installed) {
      return null;
    }
    try {
      const published: any = await lastValueFrom(
        this.http.get(PUBLISHED_VERSION_URL, { params: { t: String(Date.now()) } }).pipe(timeout(8000))
      );
      const latest = published && typeof published.latest === 'string' ? published.latest : null;
      return latest && isVersionBelow(installed, latest) ? latest : null;
    } catch (e) {
      return null;
    }
  }
}

export function isVersionBelow(current: string, other: string): boolean {
  const parse = (v: string) => String(v || '').replace(/^v/i, '').split('.').map(p => parseInt(p, 10) || 0);
  const a = parse(current), b = parse(other);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const x = a[i] || 0, y = b[i] || 0;
    if (x !== y) { return x < y; }
  }
  return false;
}
