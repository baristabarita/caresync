# CareSync: A simple Appointment Record Management System for Doctors

## Manage your Appointment Records in one platform!

Welcome to the CareSync README! This document is designed to provide users, developers, and stakeholders with a comprehensive overview of our CareSync system. CareSync is an advanced online platform dedicated to streamlining the management of appointment records. It serves as an essential tool for healthcare providers, clinics, and hospitals seeking efficient, secure, and user-friendly ways to handle appointment data.

## Getting Started

### Developer's Guide to Setting up the Project
---
1. Clone the project in any local directory you like
Example using the git CLI
```
git clone https://github.com/baristabarita/caresync.git
```
2. CD into the root folder
```
cd caresync
```
3. CD into the api and/or server folder
```
cd api or cd server
```
4. Install dependencies
```
npm install
```
5. Run the project from each folder
```
npm run dev for client folder, npm start for server folder
```

### Commands To Run During Develompemnt
---
1. Start your local front-end server
```
npm run dev

```
2. Make sure to that your XAMPP with the imported database and mySQL server is running as well

3. Start your local back-end server
```
npm start

```  


## File Structure Overview

### Client Folder Structure
---
1. `src\assets` - This is where you place images (.png, .svg, etc...)
2. `src\common` -  Where common configs are compiled and accessed
3. `src\components` - Common components to be used throughout the application
4. `src\pages` - where the pages are compiled and accessed
5. `src\util` -  Where the util codes are compiled and accessed

### Client Folder Structure
---
1. `api\controllers` - where the site's functionalities are compiled
2. `api\db` - where the database model is located
3. `api\models` - where the models accessed by the controllers are compiled
4. `api\routes` - These are the essential pathways for the controllers and validators
5. `api\validations` - validations codes

## Pulling and Code Review
---
1. When you clone the repository, make sure you are in the `mainh` branch. You can check by running this command:
```
git status
```
Expected output would be:
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```
2.Pull the latest changes
```
git pull
```
3. When you have finished adding your changes, make sure you are in your respective `name-branch` branch()
```
Example for #3:

//1. Switch to respective branch
$ git checkout name-branch

//2. Check Branch using the command bellow
$ git status

//3. Check if in the branch 
$ git branch
* ticket-12
master

//4. Commit your files and either push or pull the changes
$ git add .

$ git commit -m "Testing Push and Pull Request"

$ git push

```