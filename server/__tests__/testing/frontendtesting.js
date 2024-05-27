const { Builder, By, Key, until } = require("selenium-webdriver");

//run this app and open caresync
async function registerAccount() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:5173');
        driver.sleep(8000);
        // Find the <button> element with the name attribute 'register-button'
        let buttonElement = await driver.findElement(By.css('button[name="register-button"]'));

        // Find the <a> element within the <button> element
        let anchorElement = await buttonElement.findElement(By.css('a'));

        // Click the <a> element
        await anchorElement.click();

        await driver
            .findElement(By.name("firstName"))
            .sendKeys("John", Key.RETURN);

        await driver
        .findElement(By.name("lastName"))
        .sendKeys("Doe", Key.RETURN);

        await driver
        .findElement(By.name("profession"))
        .sendKeys("Gynecologist", Key.RETURN);

        await driver
        .findElement(By.name("email"))
        .sendKeys("jdoe@gmail.com", Key.RETURN);

        await driver
        .findElement(By.name("contact"))
        .sendKeys("09123456789", Key.RETURN);

        await driver
        .findElement(By.name("password"))
        .sendKeys("12345678", Key.RETURN);

        await driver
        .findElement(By.name("confirmPassword"))
        .sendKeys("12345678", Key.RETURN);

        let submitElement = await driver.findElement(By.css('button[type="submit"]'));

        await new Promise((resolve) => 
            setTimeout(resolve, 2000)
        );
        await submitElement.click();
    } catch(error) {
        console.error('An error occurred:', error);
    } finally {
        try {
            // Wait for the alert to appear
            let alert = await driver.switchTo().alert();
    
            // Dismiss the alert (click Cancel/Dismiss)
            await alert.accept();
        } catch (error) {
            // If there's no alert, ignore the error
        }
    
        // Add a delay using a promise (for demonstration purposes)
        await new Promise((resolve) => {
            setTimeout(resolve, 1000); // 1000 milliseconds (1 second)
        });
    
        // Close the browser
        await driver.quit();
    }
}

async function loginandlogout(){
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('http://localhost:5173');
        driver.sleep(8000);

        await driver
        .findElement(By.name("email"))
        .sendKeys("jdoe@gmail.com", Key.RETURN);

        await driver
        .findElement(By.name("password"))
        .sendKeys("12345678", Key.RETURN);

        await new Promise((resolve) => {
            setTimeout(resolve, 1000); // (1 second)
        });

        let submitElement = await driver.findElement(By.css('button'));

        await submitElement.click();

        await new Promise((resolve) => {
            setTimeout(resolve, 2000); // (3 second)
        });
        let logout = await driver.findElement(By.id('logout'));

        // Click the <div> element
        await logout.click();

    }catch(error){
        console.error(error);
    }finally{
        try{
        await new Promise((resolve) => {
            setTimeout(resolve, 3000); // (3 second)
        });
        }catch(e){
            console.error(e)
        }

        await driver.quit();

    }
}

async function execute (){
    registerAccount().then(()=>loginandlogout())
}


execute();