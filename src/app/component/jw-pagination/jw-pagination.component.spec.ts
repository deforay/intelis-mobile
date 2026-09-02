import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { JwPaginationComponent } from './jw-pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';

describe('JwPaginationComponent', () => {
  let component: JwPaginationComponent;
  let fixture: ComponentFixture<JwPaginationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JwPaginationComponent ],
      imports: [IonicModule.forRoot(),CommonModule,BrowserModule,NgxPaginationModule]
    }).compileComponents();

    fixture = TestBed.createComponent(JwPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
