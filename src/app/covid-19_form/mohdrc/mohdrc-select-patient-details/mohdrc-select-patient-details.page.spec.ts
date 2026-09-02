import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MohdrcSelectPatientDetailsPage } from './mohdrc-select-patient-details.page';

describe('MohdrcSelectPatientDetailsPage', () => {
  let component: MohdrcSelectPatientDetailsPage;
  let fixture: ComponentFixture<MohdrcSelectPatientDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MohdrcSelectPatientDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
