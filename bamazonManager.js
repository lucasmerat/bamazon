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

  function viewProducts(){
    connection.query("select * from products", function(err, results) {
        if (err) throw err;
        console.log('Available items:')
        for(let i=0;i<results.length;i++){
        console.log(`
  -------------      
  ID: ${results[i].item_id}
  Product name: ${results[i].product_name}
  Price: $${results[i].price}
  Quantity: ${results[i].stock_quantity}
  -------------
        `)
        }
      });
  }

  function viewLowInventory(){
    connection.query("select * from products", function(err, results) {
    for(let i=0;i<results.length;i++){
        if(results[i].stock_quantity < 5){
            console.log(`
The Following Items are Low in Quantity:
-------------      
ID: ${results[i].item_id}
Product name: ${results[i].product_name}
Price: $${results[i].price}
Quantity: ${results[i].stock_quantity}
-------------
`)
        }
    }
})
}

addToInventory(1000,10)

  function addToInventory(newQuantity, id){ //In inquirer, need to get new quantity from a pull of current quantity + added number
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
    )}

  function newProduct(product, department, itemPrice, stock){
    connection.query(
        "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",
        [product,department,itemPrice,stock],
        function(err) {
          if (err) throw err;
        }
    )
  }

inquirer.prompt([
    {

    }
]).then(function(choice){

})