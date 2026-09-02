import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MohdrcEnterTestResultPage } from './mohdrc-enter-test-result.page';

describe('MohdrcEnterTestResultPage', () => {
  let component: MohdrcEnterTestResultPage;
  let fixture: ComponentFixture<MohdrcEnterTestResultPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(MohdrcEnterTestResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
