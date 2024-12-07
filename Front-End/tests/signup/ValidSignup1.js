// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('ValidSignup', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('ValidSignup', async function() {
    await driver.get("http://localhost:5174/register")
    await driver.manage().window().setRect({ width: 856, height: 824 })
    await driver.findElement(By.name("email")).sendKeys("nijayeeumaya9@gmail.com")
    await driver.findElement(By.name("password")).sendKeys("000")
    await driver.findElement(By.name("firstName")).click()
    await driver.findElement(By.name("firstName")).click()
    await driver.findElement(By.name("firstName")).sendKeys("Umaya")
    await driver.findElement(By.name("lastName")).sendKeys("Gunarathne")
    await driver.findElement(By.name("phone")).sendKeys("0716607787")
    await driver.findElement(By.css(".row:nth-child(6) > .col:nth-child(2) .form-control")).click()
    await driver.findElement(By.css(".row:nth-child(6) > .col:nth-child(2) .form-control")).sendKeys("000")
    await driver.findElement(By.name("age")).click()
    await driver.findElement(By.name("age")).sendKeys("22")
    await driver.findElement(By.name("gender")).click()
    await driver.findElement(By.name("gender")).sendKeys("Female")
    {
      const element = await driver.findElement(By.css(".registerContent"))
      await driver.actions({ bridge: true }).moveToElement(element).clickAndHold().perform()
    }
    {
      const element = await driver.findElement(By.css(".registerContent"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.css(".registerContent"))
      await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    }
    await driver.findElement(By.css(".registerContent")).click()
    await driver.findElement(By.name("email")).sendKeys("umaya9@gmail.com")
    await driver.findElement(By.css(".space > input")).click()
    await driver.findElement(By.css(".field:nth-child(2) > input")).sendKeys("nijayeeumaya9@gmail.com")
    await driver.findElement(By.css(".pass-key")).sendKeys("000")
  })
})
