document.addEventListener('DOMContentLoaded', () => {
    const addItemButtons = document.querySelectorAll('.AddItembtn');
    const cartTableBody = document.querySelector('#itemsTable tbody');
    const totalDueElement = document.getElementById('totalDue');

    let totalDue = 0;

    addItemButtons.forEach(button => {
        button.addEventListener('click', () => {

            const itemDiv = button.closest('.itemdiv');
            const itemName = itemDiv.querySelector('.lablediv label').innerText;//gets the inner text of the label in labeldiv class
            const unitPrice = parseFloat(itemDiv.querySelector('.priceiv label').dataset.price);

            const quantity = parseFloat(itemDiv.querySelector('.input').value);
            const totalPrice = unitPrice * quantity;

            const row = document.createElement('tr');//new table row is created here

            row.innerHTML = `
                <td>${itemName}</td>
                <td>${unitPrice.toFixed(2)}</td>
                <td>${quantity.toFixed(2)}</td>
                <td>${totalPrice.toFixed(2)}</td>
            `;

            cartTableBody.appendChild(row);
            totalDue += totalPrice;
            totalDueElement.innerText = totalDue.toFixed(2);
        });
    });

    // Displaying order
    function displayOrder() {
        const orderSummary = localStorage.getItem("savedorder");
        const displayOrderElement = document.getElementById("displayorder");
        
        if (orderSummary) {
            displayOrderElement.innerHTML = orderSummary;
        } else {
            displayOrderElement.innerHTML = "No order saved.";
        }
    }

    // When DOM content loaded function will be called
    displayOrder();
});

// Saving order in local storage
let confirmbtn = document.getElementById("cnfrmbtn");
confirmbtn.onclick = SaveOrder;

function SaveOrder() {
    const tabledata = document.getElementById("itemsTable").outerHTML;
    localStorage.setItem("savedorder", tabledata);
}







//SavdeOrder function is called when save as favourites button clicked

document.getElementById("savebtn").onclick = SaveOrder;

// function to display saved items when apply favaourites button is clicked

let aplybtn = document.getElementById("aplybtn");
aplybtn.onclick= applySavedOrder;

function applySavedOrder() {

    const tablebody = document.getElementById("itemsTable");
    tablebody.innerHTML = localStorage.getItem("savedorder");

}





// Function to redirect to checkout page
let btn = document.getElementById("paybtn");
btn.onclick = reDirect;

function reDirect() {
    window.location.href = "chechout.html";
}
//function for popup message
 document.getElementById("proceed").addEventListener("click",PopUp);
 
 function PopUp() {
    let popUpbox = document.getElementById("popup");

    let PopUp = document.createElement("div");
    let Button = document.createElement("span");

    PopUp.className = "message";
    PopUp.innerHTML = `<div class="message-body">
                            <h3>Your Order has been Placed Successfully!</h3>
                            <ul>
                                <li>Your order will be delivered within 2-3 business days from today</li>
                                <li>If you encounter any problem, please contact us via hotline.</li>
                            </ul>
                            <h4>See you next time!</h4>
                        </div>`;
    
    Button.className = "okbtn";
    Button.innerHTML = "OK";

    PopUp.appendChild(Button);
    popUpbox.appendChild(PopUp);

    Button.addEventListener("click", function() {
        popUpbox.removeChild(PopUp);
    });
}

