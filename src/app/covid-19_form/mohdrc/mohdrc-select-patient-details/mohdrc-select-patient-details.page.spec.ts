import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MohdrcSelectPatientDetailsPage } from './mohdrc-select-patient-details.page';

describe('MohdrcSelectPatientDetailsPage', () => {
  let component: MohdrcSelectPatientDetailsPage;
  let fixture: ComponentFixture<MohdrcSelectPatientDetailsPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(MohdrcSelectPatientDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
