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
    password: "",
    database: "bamazon"
  });
  
  // connect to the mysql server and sql database
  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start(){
    inquirer.prompt([
        {
            type:'list',
            name:"action",
            message:"Welcome to the supervisor console. Would you like to view sales by department, or create a new department?",
            choices: ['View sales by department', 'Create a department', 'Quit console']
        }
    ]).then(function(answer){
        switch (answer.action){
            case 'View sales by department':
            viewSales();
            break;
            case 'Create a department':
            createDepartment();
            break;
            case 'Quit console':
            connection.end();
        }
    })
}

  function viewSales(){
    connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales) AS department_sales, (SUM(products.product_sales) - departments.over_head_costs) AS total_profit FROM departments LEFT JOIN products ON products.department_name = departments.department_name GROUP BY departments.department_id ORDER BY departments.department_id ASC", function(err,results){
        if (err) throw err;
        let data = [['Department ID','Department Name', 'Department Overhead Costs', 'Product Sales', 'Total Profit']]
        for(let i=0;i<results.length;i++){
            data.push([results[i].department_id, results[i].department_name, results[i].over_head_costs, results[i].department_sales, results[i].total_profit])
        }
         let output = table.table(data)
         console.log(output)
        start();
    });
  }

  function createDepartment(){
  inquirer.prompt([
      {
        type:"input",
        name:"departmentName",
        message:"What is the name of the department?"
      },
      {
        type:"input",
        name:"overhead",
        message:"What are the total overhead costs of the department?",
        validate: function(value) {
            if (isNaN(value)) {
              return false;
            } else {
              return true;
            }
          }
      }  
  ]).then(function(answers){
    connection.query(
        "INSERT INTO departments (department_name, over_head_costs) VALUES (?,?)",
        [answers.departmentName, answers.overhead],
        function(err) {
          if (err) throw err;
          console.log(`
Success! You created the department ${answers.departmentName} with total overhead costs of ${answers.overhead}
`);
start();
        }
      )
  })
}