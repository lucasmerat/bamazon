const mysql = require('mysql');
const inquirer = require('inquirer');

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
    console.log("Connected!")
  })

  checkQuantity(2)

  function readItems() {
    connection.query("select * from products", function(err, results) {
      if (err) throw err;
      console.log('Available items:')
      for(let i=0;i<results.length;i++){
      console.log(`
-------------      
ID: ${results[i].item_id}
Product name: ${results[i].product_name}
Price: $${results[i].price}
-------------
      `)
     // connection.end();
      }
      console.log("Above are all available items. Please enter the ID number of the item you would like to bid on")
    });
  }

  readItems();

//   inquirer.prompt([
//       {
//         type:"input",
//         name:"item",
//         message:"Type the ID of the item you would like to bid on"
//       },
//       {
//         type:"input",
//         name:"quantity",
//         message:"How many units of the product do you want to purchase?"
//       }
//   ]).then(function(answers){
//       console.log(answers)
        
//   })

  function checkQuantity(id){
    connection.query("select stock_quantity from products where item_id = ?", id, function(err, results){
        if(err) throw err;
        console.log(typeof results[0].stock_quantity)
    })
  }

