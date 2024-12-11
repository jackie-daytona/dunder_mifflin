// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addInvoiceForm = document.getElementById('add-invoice-form-ajax');

// Modify the objects we need
addInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomer = document.getElementById("input-customer");
    let inputEmployee = document.getElementById("input-employee");
    let inputBranch = document.getElementById("input-branch");
    let inputInvoiceDate = document.getElementById("input-invoice-date");
    let inputItemQuantity = document.getElementById("input-item-quantity");
    let inputTotalPrice = document.getElementById("input-total-price");

    // Get the values from the form fields
    let customerValue = inputCustomer.value;
    let employeeValue = inputEmployee.value;
    let branchValue = inputBranch.value;
    let invoiceDateValue = inputInvoiceDate.value;
    let itemQuantityValue = inputItemQuantity.value;
    let totalPriceValue = inputTotalPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer: customerValue,
        employee: employeeValue,
        branch: branchValue,
        invoiceDate: invoiceDateValue,
        itemQuantity: itemQuantityValue,
        totalPrice: totalPriceValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomer.value = '';
            inputEmployee.value = '';
            inputBranch.value = '';
            inputInvoiceDate.value = '';
            inputItemQuantity.value = '';
            inputTotalPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload()

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("invoices-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let customerCell = document.createElement("TD");
    let employeeCell = document.createElement("TD");
    let branchCell = document.createElement("TD");
    let invoiceDateCell = document.createElement("TD");
    let itemQuantityCell = document.createElement("TD");
    let totalPriceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceID;
    customerCell.innerText = newRow.customer;
    employeeCell.innerText = newRow.employee;
    branchCell.innerText = newRow.branch;
    invoiceDateCell.innerText = newRow.invoiceDate;
    itemQuantityCell.innerText = newRow.itemQuantity;
    totalPriceCell.innerText = newRow.totalPrice;

    deleteCell = document.createElement("button");
    deleteCell.classList.add("btn,btn-outline-secondary,btn-sm")
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteInvoice(newRow.invoiceID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(customerCell);
    row.appendChild(employeeCell);
    row.appendChild(branchCell);
    row.appendChild(invoiceDateCell);
    row.appendChild(itemQuantityCell);
    row.appendChild(totalPriceCell);
    row.appendChild(deleteCell)

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoiceID);

    // Add the row to the table
    currentTable.appendChild(row);

    // let selectMenu = document.getElementById("mySelect");
    // let option = document.createElement("option");
    // option.text = newRow.name;
    // option.value = newRow.employeeID;
    // selectMenu.add(option);
}