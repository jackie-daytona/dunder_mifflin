// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

/*
    SETUP
*/


// Express
var express = require('express');   // We are using the express library for the web server
var app = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
PORT = 8107;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector')

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({ extname: ".hbs" }));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.


/*
    ROUTES
*/
// app.js

app.get('/', function (req, res) {
    res.render('index');
});


// Products

app.get('/products', function (req, res) {
    let query1 = "SELECT * FROM Products;";                 // Define our query

    db.pool.query(query1, function (error, rows, fields) {  // Execute the query

        res.render('products', { data: rows });             // Render the products.hbs file, and also send the renderer
    })                                                      // an object where 'data' is equal to the 'rows' we
});                                                         // received back from the query


app.post('/add-product-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let listPrice = parseFloat(data.listPrice);
    if (isNaN(listPrice)) {
        listPrice = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Products (name, listPrice) VALUES ('${data.name}', ${listPrice})`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Products
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-product-ajax/', function (req, res, next) {
    let data = req.body;
    let productID = parseInt(data.id);
    let deleteProduct = `DELETE FROM Products WHERE productID = ?`;
    db.pool.query(deleteProduct, [productID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});


app.put('/put-product-ajax', function (req, res, next) {
    let data = req.body;

    let listPrice = parseFloat(data.listPrice);
    let name = parseInt(data.name);

    let queryUpdatePrice = `UPDATE Products SET listPrice = ? WHERE productID = ?`;
    let selectProduct = `SELECT * FROM Products WHERE productID = ?`

    // Run the 1st query
    db.pool.query(queryUpdatePrice, [listPrice, name], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the 
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectProduct, [listPrice], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


// Branches

app.get('/branches', function (req, res) {                  // Get Branches 
    let query1 = "SELECT * FROM Branches;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('branches', { data: rows });
    })
});

app.post('/add-branch-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Branches (name, address, phone) VALUES ('${data.name}', '${data.address}', '${data.phone}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Branches
            query2 = `SELECT * FROM Branches;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-branch-ajax/', function (req, res, next) {
    let data = req.body;
    let branchID = parseInt(data.id);
    let deleteBranch = `DELETE FROM Branches WHERE branchID = ?`;
    db.pool.query(deleteBranch, [branchID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});


// Departments

app.get('/departments', function (req, res) {                  // Get Departments 
    let query1 = "SELECT * FROM Departments;";

    db.pool.query(query1, function (error, rows, fields) {

        res.render('departments', { data: rows });
    })
});

app.post('/add-department-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Departments (name) VALUES ('${data.name}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Departments
            query2 = `SELECT * FROM Departments;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


// Employees

app.get('/employees', function (req, res) {                  // Get Employees
    let query1 = "SELECT employeeID, Employees.name, Employees.email, Employees.phone, Branches.name AS branch, Departments.name AS department \
                FROM Employees \
                INNER JOIN Branches on Branches.branchID = Employees.branchID \
                INNER JOIN Departments on Departments.departmentID = Employees.departmentID;";
    let query2 = "SELECT branchID, Branches.name FROM Branches"
    let query3 = "SELECT departmentID, Departments.name FROM Departments"

    db.pool.query(query1, function (error, rows, fields) {

        let employees = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let branches = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let departments = rows;

                res.render('employees', { data: employees, branches: branches, departments: departments });
            })

        })

    })
});


app.post('/add-employee-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let email = parseInt(data.email);
    if (isNaN(email)) {
        email = 'NULL'
    }

    // Capture NULL values
    let phone = parseInt(data.phone);
    if (isNaN(phone)) {
        phone = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (name, email, phone, branchID, departmentID) VALUES ('${data.name}', '${data.email}', '${data.phone}', '${data.branch}', '${data.department}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Employees
            query2 = `SELECT employeeID, Employees.name, Employees.email, Employees.phone, Branches.name AS branch, Departments.name AS department \
                FROM Employees \
                INNER JOIN Branches on Branches.branchID = Employees.branchID \
                INNER JOIN Departments on Departments.departmentID = Employees.departmentID;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});


app.delete('/delete-employee-ajax/', function (req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data.employeeID);
    let deleteEmployee = `DELETE FROM Employees WHERE employeeID = ?`;
    db.pool.query(deleteEmployee, [employeeID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/put-employee-ajax', function (req, res, next) {
    let data = req.body;

    let email = data.email;
    let phone = data.phone;
    let branchID = parseInt(data.branchID);
    let departmentID = parseInt(data.departmentID);
    let name = parseInt(data.name);

    let queryUpdateEmployee = `UPDATE Employees SET email = ?, phone = ?, branchID = ?, departmentID = ? WHERE employeeID = ?`;
    let selectInfo = `SELECT employeeID, Employees.name, Employees.email, Employees.phone, Branches.name AS branch, Departments.name AS department \
                FROM Employees \
                INNER JOIN Branches on Branches.branchID = Employees.branchID \
                INNER JOIN Departments on Departments.departmentID = Employees.departmentID
                WHERE employeeID = ?;`;

    db.pool.query(queryUpdateEmployee, [email, phone, branchID, departmentID, name], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectInfo, [name], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


/////// Customers /////////

app.get('/customers', function (req, res) {
    let query1 = "SELECT customerID, Customers.businessName, Customers.representativeName, Customers.email, Customers.phone, Customers.address, Employees.name AS employee, Branches.name AS branch \
    FROM Customers \
    LEFT JOIN Employees on Customers.employeeID = Employees.employeeID \
    INNER JOIN Branches on Customers.branchID = Branches.branchID;";

    let query2 = "SELECT * FROM Employees;";
    let query3 = "SELECT * FROM Branches;";

    db.pool.query(query1, function (error, rows, fields) {
        let customers = rows;

        db.pool.query(query2, (error, rows, fields) => {
            let employees = rows;
            
            db.pool.query(query3, (error, rows, fields) => {
                let branches = rows;
                
                return res.render('customers', {data: customers, employees: employees, branches: branches});
            })
        })
    })
});

app.post('/add-customer-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let employee = parseInt(data.employee);
    if (isNaN(employee)) {
        employee = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (businessName, representativeName, email, phone, address, employeeID, branchID) VALUES ('${data.businessName}', '${data.representativeName}', '${data.email}', '${data.phone}', '${data.address}', '${employee}', '${data.branch}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Employees
            query2 = `SELECT customerID, Customers.businessName, Customers.representativeName, Customers.email, Customers.phone, Customers.address, Employees.name AS employee, Branches.name AS branch\
                FROM Customers \
                INNER JOIN Employees on Employees.employeeID = Customers.employeeID
                INNER JOIN Branches on Branches.branchID = Customers.branchID;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-customer-ajax/', function (req, res, next) {
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomer = `DELETE FROM Customers WHERE customerID = ?`;
    db.pool.query(deleteCustomer, [customerID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/put-customer-ajax', function (req, res, next) {
    let data = req.body;

    let repName = data.repName;
    let email = data.email;
    let phone = data.phone;
    let address = data.address;
    let employeeID = data.employee;
    let branchID = data.branch;
    let customerID = data.businessName;

    let queryUpdateCustomer = `UPDATE Customers SET representativeName = ?, email = ?, phone = ?, address = ?, employeeID = ?, branchID = ? WHERE Customers.customerID = ?`;
    let selectEmployee = `SELECT * FROM Employees WHERE employeeID = ?`;
    let selectBranch = `SELECT * FROM Branches WHERE branchID = ?`;

    // Run the 1st query
    db.pool.query(queryUpdateCustomer, [repName, email, phone, address, employeeID, branchID, customerID], function (error, rows, fields) {
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectEmployee, [employeeID], function (error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    db.pool.query(selectBranch, [branchID], function (error, rows, fields) {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        } else {
                            res.send(rows);
                        }
                    })
                }
            })
        }
    })
});

/////// Invoice Items ///////

app.get('/invoice_items', function (req, res) {
    let query1 = `SELECT invoiceItemID, Invoices.invoiceID AS invoiceID, Products.name AS productID, InvoiceItems.itemQuantity, InvoiceItems.unitPrice, InvoiceItems.lineTotal\
    FROM InvoiceItems \
    INNER JOIN Invoices on Invoices.invoiceID = InvoiceItems.invoiceID \
    INNER JOIN Products on Products.productID = InvoiceItems.productID;`;

    let query2 = `SELECT * FROM Invoices;`;
    let query3 = `SELECT * FROM Products;`;

    db.pool.query(query1, function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else {
            let invoiceItems = rows;
            db.pool.query(query2, (error, rows, fields) => {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    let invoices = rows;
                    db.pool.query(query3, (error, rows, fields) => {
                        if (error) {
                            console.log(error);
                            res.sendStatus(400);
                        }
                        else {
                            let products = rows;
                            return res.render('invoice_items', {data: invoiceItems, invoices: invoices, products: products});
                        }
                    })
                }
            })
        }
    })
});

app.post('/add-invoice-item-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO InvoiceItems (invoiceID, productID, itemQuantity, unitPrice, lineTotal) VALUES ('${data.invoiceID}', '${data.productID}', '${data.itemQuantity}', '${data.unitPrice}', '${data.lineTotal}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Employees
            query2 = `SELECT invoiceItemID, Invoices.invoiceID AS invoiceID, Products.productID AS productID, InvoiceItems.itemQuantity, InvoiceItems.unitPrice, InvoiceItems.lineTotal\
                FROM InvoiceItems \
                INNER JOIN Invoices on InvoiceItems.invoiceID = Invoices.invoiceID
                INNER JOIN Products on InvoiceItems.productID = Products.productID;`;
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-invoice-item-ajax/', function (req, res, next) {
    let data = req.body;
    let invoiceItemID = parseInt(data.invoiceItemID);
    let deleteInvoiceItem = `DELETE FROM InvoiceItems WHERE invoiceItemID = ?`;
    db.pool.query(deleteInvoiceItem, [invoiceItemID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/put-invoice-item-ajax', function (req, res, next) {
    let data = req.body;

    let invoiceItemID = parseInt(data.invoiceItemID);
    let invoiceID = parseInt(data.invoiceID);
    let productID = parseInt(data.productID);
    let itemQuantity = parseInt(data.itemQuantity);
    let unitPrice = parseFloat(data.unitPrice);
    let lineTotal = parseFloat(data.lineTotal);

    let queryUpdateInvoiceItem = `UPDATE InvoiceItems SET invoiceID = ?, productID = ?, itemQuantity = ?, unitPrice = ?, lineTotal = ? WHERE invoiceItemID= ?`;
    let selectInfo = `SELECT invoiceItemID, Invoices.invoiceID, Products.name AS product, InvoiceItems.itemQuantity, InvoiceItems.unitPrice, InvoiceItems.lineTotal \
                FROM InvoiceItems \
                INNER JOIN Invoices on InvoiceItems.invoiceID = Invoices.invoiceID \
                INNER JOIN Products on InvoiceItems.productID = Products.productID
                WHERE invoiceItemID = ?;`;

    db.pool.query(queryUpdateInvoiceItem, [invoiceID, productID, itemQuantity, unitPrice, lineTotal, invoiceItemID], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the people's
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectInfo, [invoiceItemID], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});


// Invoices
app.get('/invoices', function (req, res) {                  // Get Employees
    let query1 = "SELECT invoiceID, Customers.businessName AS customer, Employees.name AS employee, Branches.name AS branch, DATE_FORMAT(invoiceDate, '%m-%d-%Y') AS invoiceDate, itemQuantity, totalPrice  \
    FROM Invoices \
    INNER JOIN Customers ON Customers.customerID = Invoices.customerID \
    INNER JOIN Employees ON Employees.employeeID = Invoices.employeeID \
    INNER JOIN Branches ON Branches.branchID = Invoices.branchID;"
    let query2 = "SELECT customerID, businessName FROM Customers"
    let query3 = "SELECT branchID, Branches.name FROM Branches"
    let query4 = "SELECT employeeID, Employees.name FROM Employees"

    db.pool.query(query1, function (error, rows, fields) {

        let invoices = rows;

        db.pool.query(query2, (error, rows, fields) => {

            let customers = rows;

            db.pool.query(query3, (error, rows, fields) => {

                let branches = rows;

                db.pool.query(query4, (error, rows, fields) => {

                    let employees = rows;

                    res.render('invoices', { data: invoices, customers: customers, branches: branches, employees: employees });
                })

            })

        })
    })
});


app.post('/add-invoice-ajax', function (req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    
    // Create the query and run it on the database
    let query1 = `INSERT INTO Invoices (customerID, employeeID, branchID, invoiceDate, itemQuantity, totalPrice) VALUES ('${data.customer}', '${data.employee}', '${data.branch}', '${invoiceDate}','${data.itemQuantity}', '${data.totalPrice}')`;
    db.pool.query(query1, function (error, rows, fields) {
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else {
            // If there was no error, perform a SELECT * on Invoices
            let query2 = "SELECT invoiceID, Customers.businessName AS customer, Employees.name AS employee, Branches.name AS branch, DATE_FORMAT(invoiceDate, '%m-%d-%Y') AS invoiceDate, itemQuantity, totalPrice  \
            FROM Invoices \
            INNER JOIN Customers ON Customers.customerID = Invoices.customerID \
            INNER JOIN Employees ON Employees.employeeID = Invoices.employeeID \
            INNER JOIN Branches ON Branches.branchID = Invoices.branchID;"
            db.pool.query(query2, function (error, rows, fields) {

                // If there was an error on the second query, send a 400
                if (error) {
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else {
                    res.send(rows);
                }
            })
        }
    })
});

app.delete('/delete-invoice-ajax/', function (req, res, next) {
    let data = req.body;
    let invoiceID = parseInt(data.invoiceID);
    let deleteInvoice = `DELETE FROM Invoices WHERE invoiceID = ?`;
    db.pool.query(deleteInvoice, [invoiceID], function (error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

app.put('/put-invoice-ajax', function (req, res, next) {
    let data = req.body;

    let customerID = parseInt(data.customer);
    let employeeID = parseInt(data.employee);
    let branchID = parseInt(data.branch);
    let invoiceDate = data.invoiceDate;
    let itemQuantity = parseInt(data.itemQuantity);
    let totalPrice = parseFloat(data.totalPrice);
    let name = parseInt(data.name);

    let queryUpdateInvoice = `UPDATE Invoices SET customerID = ?, employeeID = ?, branchID = ?, invoiceDate = ?, itemQuantity = ?, totalPrice =? WHERE invoiceID = ?`;
    let selectInfo = "SELECT invoiceID, Customers.businessName AS customer, Employees.name AS employee, Branches.name AS branch, DATE_FORMAT(invoiceDate, '%m-%d-%Y') AS invoiceDate, itemQuantity, totalPrice  \
    FROM Invoices \
    INNER JOIN Customers ON Customers.customerID = Invoices.customerID \
    INNER JOIN Employees ON Employees.employeeID = Invoices.employeeID \
    INNER JOIN Branches ON Branches.branchID = Invoices.branchID \
    WHERE invoiceID = ?;";

    db.pool.query(queryUpdateInvoice, [customerID, employeeID, branchID, invoiceDate, itemQuantity, totalPrice, name], function (error, rows, fields) {
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the
        // table on the front-end
        else {
            // Run the second query
            db.pool.query(selectInfo, [name], function (error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function () {            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});