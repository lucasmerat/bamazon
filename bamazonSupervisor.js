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
    connection.query("SELECT departments.department_id, products.department_name, departments.over_head_costs, SUM(products.product_sales) AS department_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments LEFT JOIN products ON products.department_name = departments.department_name GROUP BY departments.department_id ORDER BY departments.department_id ASC", function(err,results){
        if (err) throw err;
        // console.log(results)
        let data = [['Department ID','Department Name', 'Department Overhead Costs', 'Product Sales', 'Total Profit']]
        for(let i=0;i<results.length;i++){
            data.push([results[i].department_id, results[i].department_name, results[i].over_head_costs, results[i].department_sales, results[i].total_profit])
        }
         let output = table.table(data)
         console.log(output)
    })
  }