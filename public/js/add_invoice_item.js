// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addInvoiceItemForm = document.getElementById('add-invoice-item-form-ajax');

// Modify the objects we need
addInvoiceItemForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoice = document.getElementById("select-invoice");
    let inputProduct = document.getElementById("select-product");
    let inputItemQuantity = document.getElementById("input-item-quantity");
    let inputUnitPrice = document.getElementById("input-unit-price");
    let inputLineTotal = document.getElementById("input-line-total");

    // Get the values from the form fields
    let invoiceValue = inputInvoice.value;
    let productValue = inputProduct.value;
    let itemQuantityValue = inputItemQuantity.value;
    let unitPriceValue = inputUnitPrice.value;
    let lineTotalValue = inputLineTotal.value;

    // Put our data we want to send in a javascript object
    let data = {
        invoiceID: invoiceValue,
        productID: productValue,
        itemQuantity: itemQuantityValue,
        unitPrice: unitPriceValue,
        lineTotal: lineTotalValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-invoice-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputInvoice.value = '';
            inputProduct.value = '';
            inputItemQuantity.value = '';
            inputUnitPrice.value = '';
            inputLineTotal.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
})


// Creates a single row from an Object representing a single record from 
// InvoiceItems
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("invoice-items-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let invoiceCell = document.createElement("TD");
    let productCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let totalCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.invoiceItemID;
    invoiceCell.innerText = newRow.invoiceID;
    productCell.innerText = newRow.productID;
    quantityCell.innerText = newRow.itemQuantity;
    priceCell.innerText = newRow.unitPrice;
    totalCell.innerText = newRow.lineTotal;

    deleteCell = document.createElement("button");
    deleteCell.classList.add("btn,btn-outline-secondary,btn-sm")
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteInvoiceItem(newRow.invoiceItemID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(invoiceCell);
    row.appendChild(productCell);
    row.appendChild(quantityCell);
    row.appendChild(priceCell);
    row.appendChild(totalCell);
    row.appendChild(deleteCell)

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.invoiceItemID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("select-invoice-item");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.invoiceItemID;
    selectMenu.add(option);
}