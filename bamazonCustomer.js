var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require('cli-table');
// var t = new Table;
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

//values for user
var totalPrice;

//values from selected item
var availableQuantity;
var itemPrice;




//   results.forEach(function(product){
//   t.cell('item',product.item_id);
//   t.cell('Product',product.product_name);
//   t.cell('Department',product.department_name);
//   t.cell('Price',product.price, Table.number(2));
//   t.cell('Quantity',product.stock_quantity);
//   t.newRow();

// });
// console.log(t.toString());




connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  queryAlldata();
});




function queryAlldata() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log( res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
         +res[i].price + " | " +  res[i].stock_quantity);
     
    }
    chooseAction();
  });

}


function chooseAction() {
 
  inquirer
  .prompt([
  {
    type: "input",
    name:"item_id",
    message: "Enter product ID you would like to purchase?"
      
  },
  {
    type: "input",
    name:"stock_quantity",
    message: "How many units would you like to purchase?"
    
  }
  ]).then(function(response) {
    getItemIdInfo(response.item_id, response.stock_quantity);

   
    
  });
};


function getItemIdInfo(itemId, quantity){
    var query = "SELECT * FROM products WHERE ?";
  connection.query(query, { item_id: itemId },function(err, res) {
    // for (var i = 0; i < res.length; i++) {
    //   console.log( res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " 
    //      +res[i].price + " | " +  res[i].stock_quantity);
    // }
     itemPrice = res[0].price;
     availableQuantity = res[0].stock_quantity; 
    checkOrder(itemId, quantity, availableQuantity, itemPrice);

  });
}

function checkOrder(itemId, quantity, availableQuantity, itemPrice) {
  if( quantity <= availableQuantity){
    totalPrice = quantity * itemPrice;
    var updatedQuantity = availableQuantity - quantity;
    console.log("Your total price is: $"  + totalPrice);
    var sql = "UPDATE products SET stock_quantity=" + updatedQuantity + " WHERE item_id=" + itemId;
    
    connection.query(sql,
            function(error) {
              if (error) throw err;
              console.log("Order placed successfully!");
            }
          );
  }
  else{
    console.log("Insufficient Stocked Quantity");
  }
}


