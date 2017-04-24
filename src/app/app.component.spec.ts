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
    const target = fixture.debugElement.query(By.css('#escher-target'));    
    expect(app.greenScheme).toBeFalsy();
    expect(('green-scheme' in target.classes)).toBeFalsy();
  }));

  it(`should toggle greenScheme when the button is clicked`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    const colorToggle  = fixture.debugElement.query(By.css('#colorSchemeButton'));
    const target = fixture.debugElement.query(By.css('#escher-target'));    
    colorToggle.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(app.greenScheme).toBeTruthy();
    expect(('green-scheme' in target.classes)).toBeTruthy();    
  }));
});
