import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { AddNewRequestPage } from './add-new-request.page';

describe('AddNewRequestPage', () => {
  let component: AddNewRequestPage;
  let fixture: ComponentFixture<AddNewRequestPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRequestPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
