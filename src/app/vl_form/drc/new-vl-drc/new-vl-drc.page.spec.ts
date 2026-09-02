import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { NewVlDrcPage } from './new-vl-drc.page';

describe('NewVlDrcPage', () => {
  let component: NewVlDrcPage;
  let fixture: ComponentFixture<NewVlDrcPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVlDrcPage ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewVlDrcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
