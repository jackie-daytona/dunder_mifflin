-- TEAM 155: Paige Knickerbocker and Danny Caspary

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Branches entity

DROP TABLE IF EXISTS Branches;
CREATE TABLE Branches (
  branchID int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  address varchar(255) NOT NULL,
  phone varchar(25) NOT NULL,
  PRIMARY KEY (branchID)
);

-- Insert sample Branches data

INSERT INTO Branches (name, address, phone)
    VALUES ('Corporate', '193 8th St., Unit 1372, New York, New York 10001', '212-012-2935'),
    ('Scranton', '216 E 19th Ave, Unit 305, Scranton, PA 18503', '570-392-2934 '),
    ('Nashua', '8321 S Wilson Ave, Unit 206, Nashua, NH  03060', '603-776-3891');


-- Create Departments entity

DROP TABLE IF EXISTS Departments;
CREATE TABLE Departments (
  departmentID int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  PRIMARY KEY (departmentID)
);

-- Insert sample Departments data

INSERT INTO Departments (name) VALUES ('Sales'), ('Accounting'), ('HR');


-- Create Employees entity

DROP TABLE IF EXISTS Employees;
CREATE TABLE Employees (
  employeeID int(11) NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  email varchar(50) DEFAULT NULL,
  phone varchar(25) DEFAULT NULL,
  branchID int(11) NOT NULL,
  departmentID int(11) NOT NULL,
  PRIMARY KEY (employeeID),
  KEY fk_Employees_Branches1_idx (branchID),
  KEY fk_Employees_Departments1_idx (departmentID),
  CONSTRAINT fk_Employees_Branches1 FOREIGN KEY (branchID) REFERENCES Branches (branchID) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Employees_Departments1 FOREIGN KEY (departmentID) REFERENCES Departments (departmentID) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Insert sample Employees data

INSERT INTO Employees (name, email, phone, branchID, departmentID)
    VALUES ('Jim Halpert', 'jimhalpert@dundermifflin.com', '570-392-2934 ext. 308', 2, 1),
    ('Kevin Malone', 'kevinmalone@dundermifflin.com', '570-392-2934 ext. 201', 2, 2),
    ('Holly Flax', 'hollyflax@dundermifflin.com', '603-776-3891 ext. 348', 3, 3),
    ('Phyllis Lapin-Vance', 'phyllislapin@dundermifflin.com', '570-392-2934 ext. 307', 2, 1);


-- Create Products entity

DROP TABLE IF EXISTS Products;
CREATE TABLE Products (
  productID int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  listPrice decimal(19,2) NOT NULL,
  PRIMARY KEY (productID)
);

-- Insert sample Products data

INSERT INTO Products (name, listPrice)
    VALUES ('Copy paper, white, 8.5" x 11" (500 sheets)', 7.99),
    ('Manila Folders, 8.5" x 11", (100 ct.)', 15.97),
    ('Permanent Markers, fine tip (12 ct.)', 10.99);


-- Create Customers entity

DROP TABLE IF EXISTS Customers;
CREATE TABLE Customers (
  customerID int(11) NOT NULL AUTO_INCREMENT,
  businessName varchar(100) NOT NULL,
  representativeName varchar(100) DEFAULT NULL,
  email varchar(50) NOT NULL,
  phone varchar(25) DEFAULT NULL,
  address varchar(255) NOT NULL,
  employeeID int(11),                 -- NULLable relationship
  branchID int(11) NOT NULL,
  PRIMARY KEY (customerID),
  KEY fk_Customers_Employees1_idx (employeeID),
  KEY fk_Customers_Branches1_idx (branchID),
  CONSTRAINT fk_Customers_Branches1 FOREIGN KEY (branchID) REFERENCES Branches (branchID) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Customers_Employees1 FOREIGN KEY (employeeID) REFERENCES Employees (employeeID) ON DELETE SET NULL ON UPDATE SET NULL
);

-- Insert sample Customers data 

INSERT INTO Customers (businessName, representativeName, email, phone, address, branchID, employeeID)
    VALUES ('Blue Cross Scranton', 'Katie Rhys', 'krhys@bluecrossscranton.com', '570-491-0341 ext. 747', '923 W Spruce St., Scranton, PA 18503', 2, 1),
    ("Cooper's Seafood House", 'Darren Patton', 'darren@coopers.com', '570-275-2088', '701 N Washington Ave, Scranton, PA 18509', 2, 1),
    ('Vance Refrigeration', 'Ned Wesley', 'nedw@smithpeterson.com', '570-642-0119 ext. 102', '216 E 19th Ave, Unit 204, Scranton, PA 18503', 2, 4);


-- Create Invoices entity

DROP TABLE IF EXISTS Invoices;
CREATE TABLE Invoices (
  invoiceID int(11) NOT NULL AUTO_INCREMENT,
  customerID int(11) NOT NULL,
  employeeID int(11) NOT NULL,
  branchID int(11) NOT NULL,
  invoiceDate date NOT NULL,
  itemQuantity int(11) NOT NULL,
  totalPrice decimal(19,2) NOT NULL,

  PRIMARY KEY (invoiceID),
  KEY fk_Invoices_Customers1_idx (customerID),
  KEY fk_Invoices_Employees1_idx (employeeID),
  KEY fk_Invoices_Branches1_idx (branchID),
  CONSTRAINT fk_Invoices_Branches1 FOREIGN KEY (branchID) REFERENCES Branches (branchID) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Invoices_Customers1 FOREIGN KEY (customerID) REFERENCES Customers (customerID) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Invoices_Employee1 FOREIGN KEY (employeeID) REFERENCES Employees (EmployeeID) ON DELETE CASCADE ON UPDATE NO ACTION

);

-- Insert sample Invoices data

INSERT INTO Invoices (customerID, employeeID, branchID, invoiceDate, itemQuantity, totalPrice)
    VALUES ( 1, 1, 2,'2024-08-17', 30, 457.81),
    ( 1, 1, 2, '2024-09-09', 21, 289.43),
    ( 3, 4, 2, '2024-09-19', 11, 156.74);


-- Create InvoiceItems insersection table

DROP TABLE IF EXISTS InvoiceItems;
CREATE TABLE InvoiceItems (
  invoiceItemID int(11) NOT NULL AUTO_INCREMENT,
  invoiceID int(11) NOT NULL,
  productID int(11) NOT NULL,
  itemQuantity int(11) NOT NULL,
  unitPrice decimal(19,2) NOT NULL,
  lineTotal decimal(19,2) NOT NULL,
  PRIMARY KEY (invoiceItemID),
  KEY fk_Invoices_has_Products_Products1_idx (productID),
  KEY fk_Invoices_has_Products_Invoices_idx (invoiceID),
  CONSTRAINT fk_Invoices_has_Products_Invoices FOREIGN KEY (invoiceID) REFERENCES Invoices (invoiceID) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT fk_Invoices_has_Products_Products1 FOREIGN KEY (productID) REFERENCES Products (productID) ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Insert sample InvoiceItems data

INSERT INTO InvoiceItems (invoiceID, productID, itemQuantity, unitPrice, lineTotal)
    VALUES (1, 1, 5, 7.99, 39.95),
    (2, 2, 2, 15.97, 31.94),
    (2, 3, 1, 10.99, 10.99);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;