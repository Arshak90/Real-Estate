import { RealestatePage } from './app.po';

describe('realestate App', () => {
  let page: RealestatePage;

  beforeEach(() => {
    page = new RealestatePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
