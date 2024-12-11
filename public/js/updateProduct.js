// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

// Get the objects we need to modify
let updateProductForm = document.getElementById('update-product-form-ajax');

// Modify the objects we need
updateProductForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("nameUpdate");
    let inputListPrice = document.getElementById("listPriceUpdate");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let listPriceValue = inputListPrice.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        listPrice: listPriceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, personID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("product-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows

       if (table.rows[i].getAttribute("data-value") == personID) {

            // Get the location of the row where we found the matching ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of list price value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign value 
            td.innerHTML = parsedData[0].name; 
       }
    }
}
