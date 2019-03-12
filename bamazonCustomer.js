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
        message:"Type the ID of the item you would like to buy"
      },
      {
        type:"input",
        name:"quantity",
        message:"How many units of the product do you want to purchase?"
      }
  ]).then(function(order){
      let orderQuantity = parseInt(order.quantity);
      let id = Number(order.item);
      connection.query("SELECT stock_quantity, product_sales, price FROM products WHERE item_id = ?", id, function(err, results){
        if(err) throw err;
        let price = results[0].price
        console.log(price)
        if (results[0].stock_quantity > orderQuantity){
            let newQuantity = results[0].stock_quantity - orderQuantity
            let pricePaid = orderQuantity * price;
            let previousSales = results[0].product_sales;
            updateDatabase(newQuantity, pricePaid, previousSales, id)
            console.log(`Success, you purchased ${orderQuantity} items for $${pricePaid}`)
            connection.end();
        } else {
          console.log('Insufficient quantity of product, please try again')
          connection.end();
        }
    })
  })

  function updateDatabase(newQuantity, pricePaid, previousSales, id){
    let newSales = previousSales + pricePaid;
    console.log(newSales)
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            stock_quantity: newQuantity,
            product_sales: newSales
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