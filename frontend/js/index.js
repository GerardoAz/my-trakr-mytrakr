
import {addTransaction, getTransaction} from './helpers/Transaction.js';
import {addCategory, getCategory, getAccount, SwitchRadiobuttons, toggleAddNewAccount} from './helpers/Category.js';

SwitchRadiobuttons();
getAccount();
getTransaction();
getCategory();

$(".addTransaction").on("click", (e)=>{
    e.preventDefault();
    addTransaction();
})

$(".category button").on("click", (e)=>{
    e.preventDefault();
    addCategory();
})

$(".category select").on("change",()=>{
    toggleAddNewAccount();
})

$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/accounts",
        type: "GET",
        success: function(data) {
            // Build the HTML table
            var table = $("<table>").addClass("table");

            // Iterate through the data and add each transaction to the table
            for (var i = 0; i < data.length; i++) {
                var account = data[i];
                var id = account.id;
                var username = account.username;
                
                // Iterate through each transaction in the account
                for (var j = 0; j < account.transactions.length; j++) {
                    var transaction = account.transactions[j];
                    var type = transaction.type;
                    var category = transaction.categoryId;
                    var description = transaction.description;
                    var amount = transaction.amount;
                    var accountIdFrom = transaction.accountIdFrom;
                    var accountIdTo = transaction.accountIdTo || "";

                    // Create a new row in the table for this transaction
                    var row = $("<tr>").addClass("borderLine");
                    row.append($("<td>").text(id));
                    row.append($("<td>").text(username));
                    row.append($("<td>").text(type));
                    row.append($("<td>").text(category));
                    row.append($("<td>").text(description));
                    row.append($("<td>").text(amount));
                    row.append($("<td>").text(accountIdFrom));
                    row.append($("<td>").text(accountIdTo));
                    table.append(row);
                }
            }

            // Add the table to the HTML page
            $("#table").append(table);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log("Error fetching transaction data: " + textStatus);
        }
    });
    $.ajax({
        url: "http://localhost:3000/transactions",
        type: "GET",
        success: function(data) {
            // Loop through the transactions and extract the type and amount
            for (var i = 0; i < data.length; i++) {
                var transaction = data[i];
                var type = transaction.type;
                var amount = transaction.amount;
                
                // Append the type and amount to the HTML page
                $("#transactions").append("<p>Type: " + type + ", Amount: " + amount + "</p>");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log("Error fetching transaction data: " + textStatus);
        }
    });
});

