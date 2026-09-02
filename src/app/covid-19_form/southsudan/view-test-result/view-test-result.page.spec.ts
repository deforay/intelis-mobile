import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { ViewTestResultPage } from './view-test-result.page';

describe('ViewTestResultPage', () => {
  let component: ViewTestResultPage;
  let fixture: ComponentFixture<ViewTestResultPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestResultPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTestResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
