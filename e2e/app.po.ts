import { browser, by, element } from 'protractor';

export class AppPage {

  navigateTo(link: string) {
    return browser.get(link);
  }

  getParagraphText(selector: string) {
    return element(by.css(selector)).getText();
  }

  getAllElements(selector: string) {
    return element.all(by.css(selector));
  }

  getElement(selector: string) {
    return element(by.css(selector));
  }
}
