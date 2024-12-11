
// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputBusinessName = document.getElementById("select-name");
    let inputRepName = document.getElementById("input-rep-update");
    let inputEmail = document.getElementById("input-email-update");
    let inputPhone = document.getElementById("input-phone-update");
    let inputAddress = document.getElementById("input-address-update");
    let inputEmployee = document.getElementById("select-employee");
    let inputBranch = document.getElementById("select-branch");

    // Get the values from the form fields
    let businessNameValue = inputBusinessName.value;
    let repNameValue = inputRepName.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;
    let addressValue = inputAddress.value;
    let employeeValue = inputEmployee.value == "no_selection" ? undefined : inputEmployee.value;
    let branchValue = inputBranch.value;
    
    // currently the database table for Customers does not allow updating branch to NULL
    // so we must abort if being passed NULL for branch

    if (isNaN(branchValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        businessName: businessNameValue,
        repName: repNameValue,
        email: emailValue,
        phone: phoneValue,
        address: addressValue,
        employee: employeeValue,
        branch: branchValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, businessNameValue);       // more here??

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    // location.reload();
})


function updateRow(data, customerID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of repName value
            let updateRep = updateRowIndex.getElementsByTagName("td")[2];
            // Reassign repName to our value we updated to
            updateRep.innerHTML = parsedData[0].repName;
            
            let updateEmail = updateRowIndex.getElementsByTagName("td")[3];
            updateEmail.innerHTML = parsedData[0].email;
            
            let updatePhone = updateRowIndex.getElementsByTagName("td")[4];
            updatePhone.innerHTML = parsedData[0].phone;

            let updateAddress = updateRowIndex.getElementsByTagName("td")[5];
            updateAddress.innerHTML = parsedData[0].address;

            let updateEmployee = updateRowIndex.getElementsByTagName("td")[6];
            updateEmployee.innerHTML = parsedData[0].employee;

            let updateBranch = updateRowIndex.getElementsByTagName("td")[7];
            updateBranch.innerHTML = parsedData[0].branch;
       }
    }
}
