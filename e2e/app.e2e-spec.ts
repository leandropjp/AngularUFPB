import { AngularUFPBTESTESPage } from './app.po';

describe('angular-ufpb-testes App', function() {
  let page: AngularUFPBTESTESPage;

  beforeEach(() => {
    page = new AngularUFPBTESTESPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
