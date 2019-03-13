# Bamazon Storefront

## Description

A CLI application that connects with a MySQL database to create a 3-view storefront. The application has a customer view, to purchase product, a manager view to check inventory and update stock, and a supervisor view to analyze departmental-level sales and metrics. This was created for week 11 of UT Austin coding bootcamp. 

## Technologies used
- [Inquirer](https://www.npmjs.com/package/inquirer)
- [mysql](https://www.npmjs.com/package/mysql)

## Install instructions

### Clone project and install dependencies
To begin, clone the repo to your desktop and run `npm install` to download all dependencies

### Setup MySQL & your database

Ensure you have downloaded MySQL on your computer. If you have not, go [to the MySQL installation page](https://dev.mysql.com/downloads/mysql/) and install the latest version for your operating system. Next, use the schema found in the sql folder in the project in a MySQL client to create your database. Once your database and tables have been initialized, you are ready to begin running the node files to use the virtual storefront from multiple views.

### Manager Interace

`node bamazonManager.js`


The manager view is a good place to start, because you can use it to populate inventory into your store. The following are actions you can do from your manager view:

- View products for sale: This will display all items you have for sale including their stock, price, and what department they are in. 

- View low inventory: This will display any items that are under 5 quantity in stock. That way you can be aware of what items you need to restock. 

- Add to inventory: If you noticed something low in stock in the last command, you can use this one to increase the inventory in your database of a given item. 

- Add a new product: In the case that you are adding an entirely new product to your store, this function will guide you through the steps of adding relevant information about a product to add it to the database. 

### Customer View

`node bamazonCustomer.js`

The customer view lets the user view what items are available to for purchase, and allows them to make purchases, updating the availability of items in the database. If the database is empty, be sure to start in the manager view and add some inventory. 

### Supervisor View

`node bamazonSupervisor.js`

This view will allow the user to view things at the departmental level. It will allow you to check your total sales, total overhead costs and total profit for each department you have items listed in. There is also a function that allows you to add an additional department to your database. 