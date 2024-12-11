-- Team 155: Paige Knickerbocker and Danny Caspary


-- SELECTs:


-- get all branch IDs and names to populate the Branch dropdown
SELECT branchID, name FROM Branches;

-- get all customer IDs and names to populate the Customer dropdown
SELECT customerID, businessName FROM Customers;

-- get all employee IDs and names to populate the Employee dropdown
SELECT employeeID, name FROM Employees;

-- get all department IDs and names to populate Department dropdown
SELECT departmentID, name FROM Departments;

-- get all product data to populate a dropdown for M:N relationship with Invoices   
SELECT productID, name, listPrice name FROM Products;

-- get all invoice data to populate a dropdown for M:N relationship with Products
SELECT * FROM Invoices;

-- get all branch data for Branches page
SELECT *
FROM Branches;

-- get all department data for Departments page
SELECT *
FROM Departments;

-- get all product data for Products page
SELECT *
FROM Products;

-- get all invoice data for Invoices page
SELECT invoiceID, Customers.businessName AS customer, Employees.name AS employee, Branches.name AS branch, DATE_FORMAT(invoiceDate, '%m-%d-%Y') AS invoiceDate, itemQuantity, totalPrice  
FROM Invoices 
INNER JOIN Customers ON Customers.customerID = Invoices.customerID 
INNER JOIN Employees ON Employees.employeeID = Invoices.employeeID 
INNER JOIN Branches ON Branches.branchID = Invoices.branchID;

--get all invoice item data for the InvoiceItems page
SELECT invoiceItemID, Invoices.invoiceID AS invoiceID, Products.name AS productID, InvoiceItems.itemQuantity, InvoiceItems.unitPrice, InvoiceItems.lineTotal
FROM InvoiceItems 
INNER JOIN Invoices on Invoices.invoiceID = InvoiceItems.invoiceID 
INNER JOIN Products on Products.productID = InvoiceItems.productID;

--get all customer data for the Customers page, including employee and branch name
SELECT customerID, Customers.businessName, Customers.representativeName, Customers.email, Customers.phone, Customers.address, Employees.name AS employee, Branches.name AS branch 
FROM Customers 
LEFT JOIN Employees on Customers.employeeID = Employees.employeeID 
INNER JOIN Branches on Customers.branchID = Branches.branchID;

--get all employee data for the Employees page, including branch and department name
SELECT employeeID, Employees.name, Employees.email, Employees.phone, Branches.name AS branch, Departments.name AS department 
FROM Employees 
INNER JOIN Branches on Branches.branchID = Employees.branchID 
INNER JOIN Departments on Departments.departmentID = Employees.departmentID;

-- get a single customer's data for the Update Customer form
SELECT customerID, businessName, representativeName, Customer.email, Customer.phone, address, Employees.name AS employee, Branches.name AS branch
FROM Customers
INNER JOIN Branches on Branches.branchID = Customers.branchID 
INNER JOIN Employees on Employees.employeeID = Customers.employeeID
WHERE customerID = :customerIDSelectedFromBrowseCustomerPage;

-- get a single employee's data for the Update Employee form
SELECT employeeID, Employees.name, Employees.email, Employees.phone, Branches.name AS branch, Departments.name AS department 
FROM Employees
INNER JOIN Branches on Branches.branchID = Employees.branchID 
INNER JOIN Departments on Departments.departmentID = Employees.departmentID
WHERE employeeID = :employeeIDSelectedFromBrowseEmployeePage;


-- get a single product's data for the Update Product form
SELECT *
FROM Products
WHERE productID = :productIDSelectedFromInvoiceBranchPage;

-- get a single invoice item's data for the Update InvoiceItem form
SELECT invoiceItemID, Invoices.invoiceID, Products.name AS product, InvoiceItems.itemQuantity, InvoiceItems.unitPrice, InvoiceItems.lineTotal 
FROM InvoiceItems 
INNER JOIN Invoices on InvoiceItems.invoiceID = Invoices.invoiceID 
INNER JOIN Products on InvoiceItems.productID = Products.productID
WHERE invoiceItemID = :invoiceItemIDSelectedFromBrowseInvoiceItemsPage;

-- get a single invoice's data for the Update Invoice form
SELECT invoiceID, Customers.businessName AS customer, Employees.name AS employee, Branches.name AS branch, DATE_FORMAT(invoiceDate, '%m-%d-%Y') AS invoiceDate, itemQuantity, totalPrice  
FROM Invoices 
INNER JOIN Customers ON Customers.customerID = Invoices.customerID 
INNER JOIN Employees ON Employees.employeeID = Invoices.employeeID 
INNER JOIN Branches ON Branches.branchID = Invoices.branchID 
WHERE invoiceID = :invoiceIDSelectedFromBrowseInvoicePage;;



-- INSERTs:


-- add new Branch
INSERT INTO Branches (name, address, phone) VALUES (:nameInput, :addressInput, :phoneInput);

-- add new Department
INSERT INTO Departments (name) VALUES (:nameInput);

-- add new Employee, dropdown used here
INSERT INTO Employees (name, email, phone, branchID, departmentID) VALUES (:nameInput, :emailInput, :phoneInput, :branchIDFromDropdownInput, :departmentIDFromDropdownInput);

-- add new Customer
INSERT INTO Customers (businessName, representativeName, email, phone, address, employeeID, branchID) VALUES (:businessNameInput, :representativeNameInput, :emailInput, :phoneInput, :addressInput, :employeeIDFromDropdownInput, :branchIDFromDropdownInput);

-- add new Product
INSERT INTO Products (name, listPrice) VALUES (:nameInput, :listPriceInput);

-- add new Invoice
INSERT INTO Invoices (customerID, branchID, employeeID, invoiceDate, itemQuantity, totalPrice ) VALUES (:customerIDfromDropdownInput, :branchIDFromDropdownInput, :employeeIDFromDropdownInput, :invoiceDate, :itemQuantity, :totalPrice);

-- associate a product with an invoice, M:N addition
INSERT INTO InvoiceItems (invoiceID, productID, itemQuantity, unitPrice, lineTotal) VALUES (:invoiceIDFromDropdownInput, :productIDFromDropdownInput, :itemQuantity, :unitPrice, lineTotal);


-- UPDATEs:

-- update a customer's data based on submission of the Update Customer form 
UPDATE Customers SET businessName = :businessNameInput, representativeName= :representativeNameInput, email = :emailInput, phone = :phoneInput, address = :addressInput, employeeID = :employeeIDFromDropdownInput, branchID = :branchIDFromDropdownInput 
WHERE id= :customerIDFromUpdateForm;

-- update an employee's data based on submission of the Update Employee form 
UPDATE Employees SET name = :nameInput, email = :emailInput, phone = :phoneInput, branchID = :branchIDFromDropdownInput, departmentID = :departmentIDFromDropdownInput 
WHERE id= :employeeIDFromUpdateForm;

-- update a products's data based on submission of the Update Product form 
UPDATE Products SET listPrice = :listPriceInput
WHERE id= :productIDFromUpdateForm;

-- update an invoice item's data based on submission of the Update InvoiceItem form 
UPDATE InvoiceItems SET invoiceID = :invoiceIDFromDropdownInput, productID = :productIDFromDropdownInput, itemQuantity = :itemQuantityInput, unitPrice = :unitPriceInput, lineTotal = :lineTotalInput
WHERE invoiceID = :invoiceIDFromDropdownInput AND productID = :productIDFromDropdownInput;

-- update an invoice's data based on submission of the Update Invoice form 
UPDATE Invoices SET customerID = :customerIDfromDropdownInput, branchID = :branchIDFromDropdownInput, employeeID = :employeeIDFromDropdownInput, invoiceDate = :invoiceDate, itemQuantity = :itemQuantity, totalPrice = :totalPrice
WHERE invoiceID = :invoiceIDFromUpadateForm 


--DELETEs:


-- delete a customer
DELETE FROM Customers WHERE id = :customerIDFromUpdateForm;

-- delete an employee
DELETE FROM Employees WHERE id = :employeeIDFromUpdateForm;

-- delete a Product
DELETE FROM Products WHERE id = :productIDFromUpdateForm;

-- delete a branch
DELETE FROM Branches WHERE id = :branchIDFromUpdateForm;

-- delete an invoice
DELETE FROM Invoices WHERE id = :invoiceIDFromUpdateForm;

-- dis-associate a product from an invoice (M-to-M relationship deletion)
DELETE FROM InvoiceItems WHERE invoiceID = :invoiceIDSelectedFromInvoiceAndProductList AND productID = :invoiceIDSelectedFromInvoiceAndProductList;
