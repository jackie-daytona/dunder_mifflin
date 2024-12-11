// Citation for the following page:
// Date: 12/02/2024
// Based on: CS 340 nodejs starter app
// Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app

function deleteInvoiceItem(invoiceItemID) {
    // Put our data we want to send in a javascript object
    let data = {
        invoiceItemID: invoiceItemID
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-invoice-item-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
  
            // Add the new data to the table
            deleteRow(invoiceItemID);
  
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    location.reload();
  }
  
  
  function deleteRow(invoiceItemID){
  
    let table = document.getElementById("invoice-item-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == invoiceItemID) {
            table.deleteRow(i);
            deleteDropDownMenu(invoiceItemID);
            break;
       }
    }
  }

  function deleteDropDownMenu(invoiceItemID){
    let selectMenu = document.getElementById("select-invoice-item");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(invoiceItemID)){
        selectMenu[i].remove();
        break;
      } 
  
    }
  }