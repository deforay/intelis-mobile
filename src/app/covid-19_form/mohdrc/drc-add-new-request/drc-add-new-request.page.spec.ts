import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { DRCAddNewRequestPage } from './drc-add-new-request.page';

describe('DRCAddNewRequestPage', () => {
  let component: DRCAddNewRequestPage;
  let fixture: ComponentFixture<DRCAddNewRequestPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DRCAddNewRequestPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(DRCAddNewRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
