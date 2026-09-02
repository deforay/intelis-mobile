import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VlSelectPatientDetailsPage } from './vl-select-patient-details.page';

describe('VlSelectPatientDetailsPage', () => {
  let component: VlSelectPatientDetailsPage;
  let fixture: ComponentFixture<VlSelectPatientDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VlSelectPatientDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
