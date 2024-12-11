// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputBusinessName = document.getElementById("input-name");
    let inputRepresentativeName = document.getElementById("input-rep");
    let inputEmail = document.getElementById("input-email");
    let inputPhone = document.getElementById("input-phone");
    let inputAddress = document.getElementById("input-address");
    let inputEmployee = document.getElementById("input-employee");
    let inputBranch = document.getElementById("input-branch");

    // Get the values from the form fields
    let businessNameValue = inputBusinessName.value;
    let representativeNameValue = inputRepresentativeName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let addressValue = inputAddress.value;
    let employeeValue = inputEmployee.value;
    let branchValue = inputBranch.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        businessName: businessNameValue,
        representativeName: representativeNameValue,
        email: emailValue,
        phone: phoneValue,
        address: addressValue,
        employee: employeeValue,
        branch: branchValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputBusinessName.value = '';
            inputRepresentativeName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputAddress.value = '';
            inputEmployee.value = '';
            inputBranch.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    // location.reload();
})


// Creates a single row from an Object representing a single record from 
// Customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customers-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let businessNameCell = document.createElement("TD");
    let representativeNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let employeeCell = document.createElement("TD");
    let branchCell = document.createElement("TD");


    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customerID;
    businessNameCell.innerText = newRow.businessName;
    representativeNameCell.innerText = newRow.representativeName;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phone;
    addressCell.innerText = newRow.address;
    employeeCell.innerText = newRow.employee;
    branchCell.innerText = newRow.branch;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.classList.add("btn,btn-outline-secondary,btn-sm")
    deleteCell.onclick = function () {
        deleteCustomer(newRow.customerID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(businessNameCell);
    row.appendChild(representativeNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(addressCell);
    row.appendChild(employeeCell);
    row.appendChild(branchCell);
    row.appendChild(deleteCell)

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customerID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("input-employee");
    let option = document.createElement("option");
    option.text = newRow.employee;
    option.value = newRow.customerID;
    selectMenu.add(option);
}