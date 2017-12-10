import { NewsAppPage } from './app.po';

describe('news-app App', () => {
  let page: NewsAppPage;

  beforeEach(() => {
    page = new NewsAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
