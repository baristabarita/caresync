const { Builder, By, Key, until } = require("selenium-webdriver");

//run this app and open caresync
async function registerAccount() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://localhost:5173');
        
        // Find the element containing "register here" text
        let element = await driver.findElement(By.xpath("//a[@href='/docregister']"));
        
        // Iterate over found elements
        for(let element of elements) {
            // Check if the element is visible
            if(await element.isDisplayed()) {
                // Click the element
                await element.click();
                // Optionally break the loop if only the first element needs to be clicked
                break;
            }
        }
        driver.sleep(3000);
    } catch(error) {
        console.error('An error occurred:', error);
    } finally {
        await driver.quit();
    }
}

registerAccount();