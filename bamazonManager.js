const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "OiTuimMbWiw10!",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  console.log("Connected!");
});

function viewProducts() {
  connection.query("select * from products", function(err, results) {
    if (err) throw err;
    console.log("Available items:");
    for (let i = 0; i < results.length; i++) {
      console.log(`
  -------------      
  ID: ${results[i].item_id}
  Product name: ${results[i].product_name}
  Price: $${results[i].price}
  Quantity: ${results[i].stock_quantity}
  -------------
        `);
    }
  });
}

function viewLowInventory() {
  let anyLow = false;
  connection.query("select * from products", function(err, results) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].stock_quantity < 5) {
        anyLow = true;
        console.log(`
The Following Items are Low in Quantity:
-------------      
ID: ${results[i].item_id}
Product name: ${results[i].product_name}
Price: $${results[i].price}
Quantity: ${results[i].stock_quantity}
-------------
`);
        connection.end();
      }
    }
    if (!anyLow) {
      console.log("There are no items with low inventory!");
      connection.end();
    }
  });
}

function addToInventory() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "item",
          message: "What is the ID of the item you want to add to?"
        },
        {
          type: "input",
          name: "amount",
          message: "How much would you like to add to the item's quantity?"
        }
      ])
      .then(function(answer) {
        connection.query(
          "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
          [answer.amount, answer.item],
          function(err, results) {
              if(err) throw err;
              console.log(`Successfully added ${answer.amount} to item number ${answer.item}`)
              connection.end()
          }
        );
      });
  }

function newProduct(product, department, itemPrice, stock) {
  connection.query(
    "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",
    [product, department, itemPrice, stock],
    function(err) {
      if (err) throw err;
    }
  );
}

inquirer
  .prompt([
    {
      type: "list",
      name: "command",
      message:
        "Welcome to the manager console. What action would you like to do?",
      choices: [
        "View all products",
        "View low inventory",
        "Increase quantity of an item",
        "Add an item to the store"
      ]
    }
  ])
  .then(function(choice) {
    switch (choice.command) {
      case "View all products":
        viewProducts();
        connection.end();
      case "View low inventory":
        viewLowInventory();
      case "Increase quantity of an item":
        addToInventory();
    }
  });


