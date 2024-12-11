// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateInvoiceItemForm = document.getElementById('update-invoice-item-form-ajax');

// Modify the objects we need
updateInvoiceItemForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInvoiceItem = document.getElementById("select-invoice-item");
    let inputInvoice = document.getElementById("select-invoice-update");
    let inputProduct = document.getElementById("select-product-update");
    let inputItemQuantity = document.getElementById("input-item-quantity-update");
    let inputUnitPrice = document.getElementById("input-unit-price-update");
    let inputLineTotal = document.getElementById("input-line-total-update");

    // Get the values from the form fields
    let itemValue = inputInvoiceItem.value;
    let invoiceValue = inputInvoice.value;
    let productValue = inputProduct.value;
    let itemQuantityValue = inputItemQuantity.value;
    let unitPriceValue = inputUnitPrice.value;
    let lineTotalValue = inputLineTotal.value;


    // Put our data we want to send in a javascript object
    let data = {
        invoiceItemID: itemValue,
        invoiceID: invoiceValue,
        productID: productValue,
        itemQuantity: itemQuantityValue,
        unitPrice: unitPriceValue,
        lineTotal: lineTotalValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoice-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, itemValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
})


function updateRow(data, invoiceItemID) {
    let parsedData = JSON.parse(data);
    let updatedInvoiceItem = parsedData[0];
    let invoiceItem = parsedData[0].invoiceItemID;

    let table = document.getElementById("invoice-items-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == invoiceItem) {

            // Get the location of the row where we found the matching invoice item ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of invoice item values
            let tdInvoice = updateRowIndex.getElementsByTagName("td")[2];
            let tdProduct = updateRowIndex.getElementsByTagName("td")[3];
            let tdQuantity = updateRowIndex.getElementsByTagName("td")[4];
            let tdPrice = updateRowIndex.getElementsByTagName("td")[5];
            let tdTotal = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign invoice item to updated values
            tdInvoice.innerHTML = updatedInvoiceItem.invoiceID;
            tdProduct.innerHTML = updatedInvoiceItem.productID;
            tdQuantity.innerHTML = updatedInvoiceItem.itemQuantity;
            tdPrice.innerHTML = updatedInvoiceItem.unitPrice;
            tdTotal.innerHTML = updatedInvoiceItem.lineTotal;
        }
    }
}
