// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('test6', function() {
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
  it('test6', async function() {
    await driver.get("http://localhost:5173/")
    await driver.manage().window().setRect({ width: 796, height: 816 })
    await driver.findElement(By.css(".col-lg-3:nth-child(5) img")).click()
    await driver.findElement(By.css(".searchButton")).click()
    assert(await driver.switchTo().alert().getText() == "Added to cart")
  })
})
