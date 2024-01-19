const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

describe('Login Test', () => {
  let driver;

  beforeAll(async () => {
    // Set up Selenium WebDriver
    const chromeOptions = new chrome.Options();
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should log in successfully', async () => {
    await driver.get('http://localhost:3000/login');

 
    await driver.findElement(By.id('Username')).sendKeys('enthusiast');
    await driver.findElement(By.id('Password')).sendKeys('Enthusiast');
    await driver.findElement(By.css('button[type="submit"]')).click();

 
    await driver.wait(until.urlIs('http://localhost:3000/'), 5000);

    const isLoggedIn = await driver.executeScript('return sessionStorage.getItem("isLoggedIn") === "true";');
    expect(isLoggedIn).toBe(true);
  });

  it('should show error for invalid login', async () => {
    
    await driver.get('http://localhost:3000/login');


    await driver.findElement(By.id('Username')).sendKeys('invalid-username');
    await driver.findElement(By.id('Password')).sendKeys('invalid-password');
    await driver.findElement(By.css('button[type="submit"]')).click();


    await driver.wait(until.elementLocated(By.className('alert-danger')), 5000);


    const errorAlert = await driver.findElement(By.className('alert-danger')).isDisplayed();
    expect(errorAlert).toBe(true);
  });
});
