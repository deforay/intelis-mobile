import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SelectPatientDetailsDrcPage } from './select-patient-details-drc.page';

describe('SelectPatientDetailsDrcPage', () => {
  let component: SelectPatientDetailsDrcPage;
  let fixture: ComponentFixture<SelectPatientDetailsDrcPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(SelectPatientDetailsDrcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
