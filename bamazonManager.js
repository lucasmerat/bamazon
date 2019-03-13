const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("table");

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
    let data = [["Product Name", "Item ID", "Price", "Stock Quantity"]];
    for (let i = 0; i < results.length; i++) {
      data.push([
        results[i].product_name,
        results[i].item_id,
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    let output = table.table(data);
    console.log(output);
    console.log(
        `
  All available products are listed above. What would you like to do next?
  `
      );
    start();
  });
}

function viewLowInventory() {
  let anyLow = false;
  connection.query("select * from products", function(err, results) {
    let data = [["Product Name", "Item ID", "Price", "Stock Quantity"]];
    for (let i = 0; i < results.length; i++) {
      if (results[i].stock_quantity < 5) {
        anyLow = true;
        data.push([
          results[i].product_name,
          results[i].item_id,
          results[i].price,
          results[i].stock_quantity
        ]);
        let output = table.table(data);
        console.log(output);
        console.log(
            `
All products with low stock are listed above. What would you like to do next?
      `
          );
        start();
      }
    }
    if (!anyLow) {
      console.log(`
There are no items with low inventory!
      `);
      start();
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
          if (err) throw err;
          console.log(
            `
Successfully added ${answer.amount} to item number ${answer.item}
`
          );
          start();
        }
      );
    });
}

function newProduct(product, department, itemPrice, stock) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "product",
        message: "What is name of the product you are adding?"
      },
      {
        type: "list",
        name: "department",
        message: "Choose a department category for the product.",
        choices: ["Kitchen", "Clothing", "Electronics", "Outdoor", "Food", "Doors", "Music"]
      },
      {
        type: "input",
        name: "price",
        message: "Please set a price for the item you are adding",
        validate: function(value) {
          if (isNaN(value)) {
            return false;
          } else {
            return true;
          }
        }
      },
      {
        type: "input",
        name: "stock",
        message: "Please set a starting quantity for the product",
        validate: function(value) {
          if (isNaN(value)) {
            return false;
          } else {
            return true;
          }
        }
      }
    ])
    .then(function(answers) {
      connection.query(
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",
        [answers.product, answers.department, answers.price, answers.stock],
        function(err) {
          if (err) throw err;
          console.log(`
Success! You added ${answers.stock} of the item ${answers.product} in the ${
            answers.department
          } department at a price of $${answers.price}
`);
          start();
        }
      );
    });
}

start();

function start() {
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
          "Add an item to the store",
          "Quit console"
        ]
      }
    ])
    .then(function(choice) {
      switch (choice.command) {
        case "View all products":
          viewProducts();
          break;
        case "View low inventory":
          viewLowInventory();
          break;
        case "Increase quantity of an item":
          addToInventory();
          break;
        case "Add an item to the store":
          newProduct();
          break;
        case "Quit console":
          connection.end();
          break;
      }
    });
}
