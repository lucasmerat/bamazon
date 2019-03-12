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
  
  function checkQuantity(id, orderQuantity){
    console.log("the id is " + id)
  
}

  readItems();

  inquirer.prompt([
      {
        type:"input",
        name:"item",
        message:"Type the ID of the item you would like to bid on"
      },
      {
        type:"input",
        name:"quantity",
        message:"How many units of the product do you want to purchase?"
      }
  ]).then(function(order){
      let orderQuantity = parseInt(order.quantity);
      let id = Number(order.item);
      connection.query("SELECT stock_quantity, price FROM products WHERE item_id = ?", id, function(err, results){
        if(err) throw err;
        console.log(results)
        let price = results[0].price
        if (results[0].stock_quantity > orderQuantity){
            let newQuantity = results[0].stock_quantity - orderQuantity
            updateDatabase(newQuantity, price, id)
            let pricePaid = orderQuantity * price;
            console.log(`Success, you purchased ${orderQuantity} items for $${pricePaid}`)
        } else {
          console.log('Insufficient quantity of product, please try again')
          connection.end();
        }
    })
  })

  function updateDatabase(newQuantity, price, id){
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newQuantity
          },
          {
            item_id: id
          }
        ],
        function(err) {
          if (err) throw err;
        }
      );
  }