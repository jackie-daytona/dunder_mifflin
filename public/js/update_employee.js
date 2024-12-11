// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateEmployeeForm = document.getElementById('update-employee-form-ajax');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("mySelect");
    let inputEmail = document.getElementById("input-email-update");
    console.log(inputEmail)
    let inputPhone = document.getElementById("input-phone-update");
    console.log(inputPhone)
    let inputBranch = document.getElementById("input-branch-update");
    let inputDepartment = document.getElementById("input-department-update");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let branchValue = inputBranch.value;
    let departmentValue = inputDepartment.value;

    if (isNaN(branchValue)) {
        return;
    }

    if (isNaN(departmentValue)) {
        return;
    }

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        branchID: branchValue,
        departmentID: departmentValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee-ajax", true);
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

})


function updateRow(data, employeeID) {
    let parsedData = JSON.parse(data);
    let updatedEmployee = parsedData[0];
    let name = parsedData[0].name;

    let table = document.getElementById("employees-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        //iterate through rows
        if (table.rows[i].getAttribute("data-value") == employeeID) {

            // Get the location of the row where we found the matching ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of value
            let tdEmail = updateRowIndex.getElementsByTagName("td")[2];
            let tdPhone = updateRowIndex.getElementsByTagName("td")[3];
            let tdBranch = updateRowIndex.getElementsByTagName("td")[4];
            let tdDepartment = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign value
            tdEmail.innerHTML = updatedEmployee.email;
            tdPhone.innerHTML = updatedEmployee.phone;
            tdBranch.innerHTML = updatedEmployee.branch;
            tdDepartment.innerHTML = updatedEmployee.department;
        }
    }
}
