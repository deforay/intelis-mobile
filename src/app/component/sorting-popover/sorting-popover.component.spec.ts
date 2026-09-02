import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { SortingPopoverComponent } from './sorting-popover.component';

describe('SortingPopoverComponent', () => {
  let component: SortingPopoverComponent;
  let fixture: ComponentFixture<SortingPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingPopoverComponent ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(SortingPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
