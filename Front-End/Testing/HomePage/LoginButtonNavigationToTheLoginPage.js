const { Builder, By, Key, until } = require('selenium-webdriver');

(async function loginButtonNavigatingToLoginPage() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Navigate to the webpage
    await driver.get('http://localhost:5173/');
    
    // Resize the window
    await driver.manage().window().setRect({ width: 782, height: 823 });
    
    // Click the first button
    await driver.findElement(By.css('button:nth-child(1)')).click();
    
    // Click on the input field and enter text
    const inputField = await driver.findElement(By.css('.field:nth-child(2) > input'));
    await inputField.click();
    await inputField.sendKeys('Thimi');
  } finally {
    // Close the browser
    await driver.quit();
  }
})();
