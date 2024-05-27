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
            setTimeout(resolve, 2000);
        });

        //find logoout and click
        let sidebarElement = await driver.findElement(By.id('sidebar'));
        let logout = await sidebarElement.findElement(By.id('logout'));

        // Click the <div> element
        await logout.click();

        // Delay
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        //wait for login button then go to addRecord
        await driver.wait(until.elementLocated(By.css('button')), 10000);
        await addRecord(driver);

    }catch(error){
        console.error(error);
    }finally{
        try{
        await new Promise((resolve) => {
            setTimeout(resolve, 3000); 
        });
        }catch(e){
            console.error(e)
        }
    }
}

async function addRecord (driver) {
    // let driver = await new Builder().forBrowser('chrome').build();
       
    try {
        //LOGIN
        // await driver.get('http://localhost:5173');
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

        // Wait until redirected to the dashboard
        await driver.wait(until.elementLocated(By.id('dashboard-tab')), 10000);
        
        //find sidebar & appointment tab & click
        let sidebarElement = await driver.findElement(By.id('sidebar'));
        let appointmentElement = await sidebarElement.findElement(By.id('appointments-tab'));
        await appointmentElement.click();

        //find 'add new record' button & click
        let addButton = await driver.findElement(By.id('add-button')); 
        await addButton.click();

        //input fields
        await driver.findElement(By.name("patient_name")).sendKeys("Crabs Koda", Key.RETURN);
        await driver.findElement(By.name("patient_age")).sendKeys("12", Key.RETURN);
        await driver.findElement(By.name("patient_dob")).sendKeys("2000-07-21", Key.RETURN);
        await driver.findElement(By.name("patient_gender")).sendKeys("Male", Key.RETURN);
        await driver.findElement(By.name("visit_date")).sendKeys("2000-07-21", Key.RETURN);
        await driver.findElement(By.name("purpose")).sendKeys("Vasectomy", Key.RETURN);
        await driver.findElement(By.name("diagnosis")).sendKeys("Delulu", Key.RETURN);
        await driver.findElement(By.name("prescription")).sendKeys("Give Koda to Heneg", Key.RETURN);
        await driver.findElement(By.name("record_status")).sendKeys("Pending");

        // Delay
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        //confirm submit
        let submitButton = await driver.findElement(By.id('button-2'));
        await submitButton.click();

        // Delay
        await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        try {
            // Wait for the alert to appear & dismiss
            await driver.wait(until.alertIsPresent(), 5000);
            let alert = await driver.switchTo().alert();
            await alert.accept();

            // Delay
            await new Promise((resolve) => {
                setTimeout(resolve, 2000);
            });

            // Wait until refresh, move to editRecords
            await driver.wait(until.elementLocated(By.id('details-button')), 10000);
            await editRecord(driver);

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
}

async function editRecord (driver) {
    try {
        driver.sleep(8000);

        //find 'view details' button and click
        let detailsButton = await driver.findElement(By.id('details-button'));
        await detailsButton.click();

        // Delay
         await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        //find 'edit record' button and click
        let editButton = await driver.findElement(By.id('edit-button'));
        await editButton.click();

        //change fields
        await driver.findElement(By.name("visit_date")).sendKeys("01-01-2000");
        await driver.findElement(By.name("purpose")).sendKeys("Rehabilitation");
        await driver.findElement(By.name("diagnosis")).sendKeys("Delulu");
        await driver.findElement(By.name("prescription")).sendKeys("Give Koda to Heneg");
        await driver.findElement(By.name("record_status")).sendKeys("Ongoing");

        //click submit button
        let submitButton = await driver.findElement(By.id('confirm-button'));
        await submitButton.click();

        // Delay
        await new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
         // Wait until refresh, move to deleteRecords
         await driver.wait(until.elementLocated(By.id('delete-button')), 10000);
         await deleteRecord(driver);
    }
}

async function deleteRecord (driver) {
    try {
        driver.sleep(8000);

        // Delay
         await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        //find 'delete record' button and click
        let deleteButton = await driver.findElement(By.id('delete-button'));
        await deleteButton.click();

         // Delay
         await new Promise((resolve) => {
            setTimeout(resolve, 1000);
        });

        //confirm delete
        let submitButton = await driver.findElement(By.id('button-2'));
        await submitButton.click();

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        try{
            await new Promise((resolve) => {
                setTimeout(resolve, 3000);
            });
            }catch(e){
                console.error(e)
            }
    }

    await driver.quit();
}

async function execute (){
    await registerAccount().then(()=>loginandlogout()).then(()=>addRecord())
}


execute();