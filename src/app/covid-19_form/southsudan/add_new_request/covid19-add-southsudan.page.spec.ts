import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { Covid19AddSouthsudanPage } from './covid19-add-southsudan.page';

describe('Covid19AddSouthsudanPage', () => {
  let component: Covid19AddSouthsudanPage;
  let fixture: ComponentFixture<Covid19AddSouthsudanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Covid19AddSouthsudanPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(Covid19AddSouthsudanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
