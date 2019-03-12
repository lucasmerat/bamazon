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

viewSales()

  function viewSales(){
    connection.query('SELECT department_name, sum(product_sales) AS sales FROM products GROUP BY department_name', function(err,results){
        if (err) throw err;
        console.log(results)
        let data = [['department_name','product_sales']]
         for(let i=0;i<results.length;i++){
            data.push([results[i].department_name, results[i].sales])
        }
         let output = table.table(data)
         console.log(output)
    })
  }