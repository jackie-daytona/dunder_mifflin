// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let addEmployeeForm = document.getElementById('add-employee-form-ajax');

// Modify the objects we need
addEmployeeForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputEmail = document.getElementById("input-email");
    let inputPhone = document.getElementById("input-phone");
    let inputBranch = document.getElementById("input-branch");
    let inputDepartment = document.getElementById("input-department");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let branchValue = inputBranch.value;
    let departmentValue = inputDepartment.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        branch: branchValue,
        department: departmentValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-employee-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
            inputBranch.value = '';
            inputDepartment.value = '';
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
    let currentTable = document.getElementById("employees-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let branchCell = document.createElement("TD");
    let departmentCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.employeeID;
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phone;
    branchCell.innerText = newRow.branch;
    departmentCell.innerText = newRow.department;

    deleteCell = document.createElement("button");
    deleteCell.classList.add("btn,btn-outline-secondary,btn-sm")
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function () {
        deleteEmployee(newRow.employeeID);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(branchCell);
    row.appendChild(departmentCell);
    row.appendChild(deleteCell)

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.employeeID);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.employeeID;
    selectMenu.add(option);
}