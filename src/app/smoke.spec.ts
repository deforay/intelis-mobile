import { TestBed } from '@angular/core/testing';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { RouterTestingModule } from '@angular/router/testing';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './login/login.module';
import { LoginPage } from './login/login.page';

describe('smoke: upgraded stack bootstraps', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule, LoginPageModule, RouterTestingModule],
      // No Cordova in the browser: the real plugin returns undefined instead of a promise.
      providers: [{ provide: SQLite, useValue: { create: () => new Promise(() => {}) } }],
    }).compileComponents();
  });

  it('renders the root component with ion-app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('ion-app')).toBeTruthy();
  });

  it('renders the login page with its Material form fields', async () => {
    const fixture = TestBed.createComponent(LoginPage);
    fixture.detectChanges();
    await fixture.whenStable();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('mat-form-field').length).toBeGreaterThan(0);
    expect(el.querySelector('ion-content')).toBeTruthy();
  });
});
