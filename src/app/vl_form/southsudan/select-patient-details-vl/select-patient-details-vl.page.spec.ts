import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPatientDetailsVlPage } from './select-patient-details-vl.page';

describe('SelectPatientDetailsVlPage', () => {
  let component: SelectPatientDetailsVlPage;
  let fixture: ComponentFixture<SelectPatientDetailsVlPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SelectPatientDetailsVlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
