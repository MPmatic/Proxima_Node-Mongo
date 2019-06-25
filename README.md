# Info

Application is created with Node.js, MongoDB and Mongoose. It is simple CRUD api. Code is covered with tests written with Mocha and Chai.

## Instructions

After successful cloning, use `npm install` to install the dependencies.

### Database Setup

0. Make sure you have mongodb installed and running on your machine.
1. App contains two separate databases, one for testing and one for development
2. Inside root folder find a folder `/databaseSetup`, which includes two files.
3. Run `node dbCreation`. This creates`Store` database and adds two documents into collection named `products`
4. `StoreTest`database is created automatically when you run `npm test`.
**Assuming you are running MongoDB on port :27017. You can edit connection settings on line 2 of dbCreation.js file .**

### Test

1. You can run `npm test` command to perform unit testing. In this mode server is connected to database `StoreTest`.
**Do not forget to delete the databases afterwards.**

### Start

1. To start the application run `npm start`. In this mode server is connected to database `Store`.
**Do not forget to delete the databases afterwards.**

### Database Deletion

1. Inside root folder find a folder `/databaseSetup`, which includes two files.
2. Run `node dbDrop`. This command deletes/drops `StoreTest` and `Store` databases.
