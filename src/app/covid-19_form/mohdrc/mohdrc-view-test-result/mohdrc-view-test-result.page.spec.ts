import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MohdrcViewTestResultPage } from './mohdrc-view-test-result.page';

describe('MohdrcViewTestResultPage', () => {
  let component: MohdrcViewTestResultPage;
  let fixture: ComponentFixture<MohdrcViewTestResultPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(MohdrcViewTestResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
