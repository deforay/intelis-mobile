import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { EnterTestResultPage } from './enter-test-result.page';

describe('EnterTestResultPage', () => {
  let component: EnterTestResultPage;
  let fixture: ComponentFixture<EnterTestResultPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterTestResultPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterTestResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
