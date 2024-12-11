// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateInvoiceForm = document.getElementById('update-invoice-form-ajax');

// Modify the objects we need
updateInvoiceForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("mySelect");
    let inputCustomer = document.getElementById("input-customer-update");
    let inputEmployee = document.getElementById("input-employee-update");
    let inputBranch = document.getElementById("input-branch-update");
    let inputInvoiceDate = document.getElementById("input-invoice-date-update");
    let inputItemQuantity = document.getElementById("input-item-quantity-update");
    let inputTotalPrice = document.getElementById("input-total-price-update");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let customerValue = inputCustomer.value;
    let employeeValue = inputEmployee.value;
    let branchValue = inputBranch.value;
    let invoiceDateValue = inputInvoiceDate.value;
    let itemQuantityValue = inputItemQuantity.value;
    let totalPriceValue = inputTotalPrice.value;

    // if (isNaN(branchValue)) {
    //     return;
    // }

    // if (isNaN(departmentValue)) {
    //     return;
    // }

    // Put our data we want to send in a javascript object

    let data = {
        name: nameValue,
        customer: customerValue,
        employee: employeeValue,
        branch: branchValue,
        invoiceDate: invoiceDateValue,
        itemQuantity: itemQuantityValue,
        totalPrice: totalPriceValue
    }


    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-invoice-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, nameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload()

})


function updateRow(data, invoiceID) {
    let parsedData = JSON.parse(data);
    let updatedInvoice = parsedData[0];
    let name = parsedData[0].name;

    let table = document.getElementById("invoices-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        if (table.rows[i].getAttribute("data-value") == name) {

            // Get the location of the row where we found the matching ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of value
            let tdCustomer = updateRowIndex.getElementsByTagName("td")[1];
            let tdEmployee = updateRowIndex.getElementsByTagName("td")[2];
            let tdBranch = updateRowIndex.getElementsByTagName("td")[3];
            let tdInvoiceDate = updateRowIndex.getElementsByTagName("td")[4];
            let tdItemQuantity = updateRowIndex.getElementsByTagName("td")[5];
            let tdTotalPrice = updateRowIndex.getElementsByTagName("td")[6];

            // Reassign homeworld value 
            tdCustomer.innerHTML = updatedInvoice.customer;
            tdEmployee.innerHTML = updatedInvoice.employee;
            tdBranch.innerHTML = updatedInvoice.branch;
            tdInvoiceDate.innerHTML = updatedInvoice.invoiceDate;
            tdItemQuantity.innerHTML = updatedInvoice.itemQuantity;
            tdTotalPrice.innerHTML = updatedInvoice.totalPrice;
        }
    }
}
