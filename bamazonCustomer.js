// Required packages to run app
var mysql = require("mysql");
var inquirer = require("inquirer");

// Database connection info
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazonDB"
});

// Launch app upon successful connection
connection.connect(function (err) {
    if (err) throw err;
    productsInStock();
    console.log("\nWELCOME TO BAMAZON!");
    console.log("\n••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••\n");
});

// Present user with available products
function productsInStock() {
  connection.query("SELECT * FROM products", function (err, res) {
      for (var i = 0; i < res.length; i++) {
          console.log("Product ID: " + res[i].item_id + "  |  " + "Product Name: " + res[i].product_name + "  |  " + "Department: " + res[i].department_name + "  |  " + "Price: " + res[i].price.toString() + "  |  " + "Quantity Available: " + res[i].stock_quantity.toString());
      }
      console.log("\n••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••\n");
      productInfo();
  });
}

function productInfo() {
    inquirer.prompt([
        {
            type: "input",
            message: "Insert the Product ID of the product you'd like to buy:",
            name: "product",
        },

        {
            type: "input",
            name: "quantity",
            message: "Insert the quantity you'd like to buy:",
        }
        
    ]).then(function (res) {
        var userProduct = res.product;
        var userQuantity = res.quantity;

        connection.query("SELECT * FROM products WHERE ?", { item_id: userProduct }, function (err, response) {
            if (err) throw err;

            if (response.length === 0) {
                console.log("Invalid respose. Select a Product ID from the list.");
                productsInStock();
            } else {
                // Response if the quantity requested by the user is in stock
                var productResponse = response[0];
                if (userQuantity <= productResponse.stock_quantity) {
                    console.log("Great choice!");

                    // // Update the inventory
                    var updateStock = "UPDATE products SET stock_quantity = " + (productResponse.stock_quantity - userQuantity) + " WHERE item_id = " + userProduct;

                    connection.query(updateStock, function (err, data) {
                        if (err) throw err;

                        console.log("Success! Your total is $" + productResponse.price * userQuantity);
                        console.log("Thanks for shopping with Bamazon. Come back soon!");
                        console.log("\n••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••\n");
                        shopAgain();
                    })
                } else {
                    console.log("Insufficient quantity. Please try again.");
                    shopAgain();
                }
            }
        })
    })
}


// Prompts user to shop again. If user chooses yes, app starts again; if no, connect ends
function shopAgain() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to keep shopping?",
            name: "confirm"
        }
    ]).then(function (res) {
        if (res.confirm) {
            console.log("\n----------------------------------------------------------------------\n");
            productsInStock();
         
        } else {
            console.log("Thank you for shopping Bamazon!");
            connection.end();
        }
    })
}