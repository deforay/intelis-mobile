import { InitDataService } from './init-data.service';

describe('InitDataService.merge', () => {
  const svc = new InitDataService(null as any, null as any);

  it('upserts list items by id and keeps untouched ones', () => {
    const existing = { facilitiesList: [{ facility_id: 1, facility_name: 'A' }, { facility_id: 2, facility_name: 'B' }] };
    const incoming = { facilitiesList: [{ facility_id: 2, facility_name: 'B2' }, { facility_id: 3, facility_name: 'C' }] };
    const out = svc.merge(existing, incoming);
    expect(out.facilitiesList.map(f => f.facility_id)).toEqual([1, 2, 3]);
    expect(out.facilitiesList.find(f => f.facility_id === 2).facility_name).toBe('B2');
  });

  it('keeps the stored list when the incremental response has an empty one', () => {
    const out = svc.merge({ userList: [{ user_id: 7 }] }, { userList: [] });
    expect(out.userList.length).toBe(1);
  });

  it('merges nested module blocks and replaces scalars', () => {
    const existing = { activeModule: 'vl', eid: { statusFilterList: [{ value: 1, show: 'x' }], resultsList: [{ value: 'a', show: 'a' }] } };
    const incoming = { activeModule: 'vl,eid', eid: { statusFilterList: [{ value: 2, show: 'y' }] } };
    const out = svc.merge(existing, incoming);
    expect(out.activeModule).toBe('vl,eid');
    expect(out.eid.statusFilterList.length).toBe(2);
    expect(out.eid.resultsList.length).toBe(1);
  });

  it('returns the incoming payload when nothing is stored', () => {
    expect(svc.merge(null, { formId: 3 })).toEqual({ formId: 3 });
  });
});
