import { ScalingRotaryPhonePage } from './app.po';

describe('scaling-rotary-phone App', () => {
  let page: ScalingRotaryPhonePage;

  beforeEach(() => {
    page = new ScalingRotaryPhonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
