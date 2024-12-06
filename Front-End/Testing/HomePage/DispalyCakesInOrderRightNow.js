const { Builder, By } = require('selenium-webdriver');

(async function testCase3() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Open the URL
    await driver.get('http://localhost:5173/');

    // Set window size
    await driver.manage().window().setRect({ width: 796, height: 816 });

    // Click on the image
    await driver.findElement(By.css('.col-lg-3:nth-child(2) img')).click();
  } finally {
    // Quit the driver
    await driver.quit();
  }
})();
