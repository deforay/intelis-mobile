import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EidSelectPatientDetailsPage } from './eid-select-patient-details.page';

describe('EidSelectPatientDetailsPage', () => {
  let component: EidSelectPatientDetailsPage;
  let fixture: ComponentFixture<EidSelectPatientDetailsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(EidSelectPatientDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
