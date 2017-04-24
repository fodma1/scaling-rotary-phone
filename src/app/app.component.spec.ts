import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { getMap } from './helpers/getMap';

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

  it(`should load the builder and compute the stats`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.fileHandler(getMap());
    expect(app.builder).toBeTruthy();

    // Oh I miss lodash. Maybe there's a nicer way in d3.js
    // I'm moving over because of the lack of time.
    function sortFn(a, b) {
      if (a.key < b.key) return -1;
      if (a.key === b.key) return 0;
      return 1;
    }

    // Ensure order.
    expect(app.nodeStats.sort(sortFn)).toEqual([
      {key: 'metabolite', value: 38},
      {key: 'midmarker', value: 18},     
      {key: 'multimarker', value: 23}
    ]);
  }));

});
