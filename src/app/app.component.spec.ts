import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have false greenScheme by default`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.greenScheme).toBeFalsy();
  }));

  it(`should toggle greenScheme when the button is clicked`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const colorToggle  = fixture.debugElement.query(By.css('#colorSchemeButton'));
    colorToggle.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(app.greenScheme).toBeTruthy();
  }));
});
