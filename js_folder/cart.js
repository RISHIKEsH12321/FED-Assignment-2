document.addEventListener("DOMContentLoaded", function () {
    var customerData = JSON.parse(sessionStorage.getItem("customer-data"));
    var customerId = customerData ? customerData._id : null;

    if (customerId === null) {
        alert("Customer data or customer id is null. Cannot proceed with adding to cart.");
        window.location.href = 'index.html';
        return; // Stop the rest of the function
    }

    else{
        const APIKEY = "65ab8ff7384ac111a81414ff";

        let settings = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
        };
        var itemContainer = document.getElementById("item-cart-display");

        fetch("https://electronics-a398.restdb.io/rest/cart", settings)
        .then(response => response.json())        
        .then(data => {
            for (var i = 0; i < data.length; i++){                
                if (data[i].customer_id === customerId ){
                    console.log(data[i]);
                    var item = CreateCartItem(data[i]);
                    itemContainer.appendChild(item);
                }
            }        
        })
        }
});

function CreateCartItem(data){
    var name = data.item_name;
    var price = data.price;
    var color = data.color;
    var quantity = data.quantity;
    var picFilePath = data.picture_file_name;
    var id = data._id;

    var block = document.createElement("tr");
    
    var picBlock = document.createElement("td");
    var imgElement = document.createElement("img");
    imgElement.src = picFilePath;
    imgElement.className = "cart-item-pic";
    picBlock.appendChild(imgElement);
    block.appendChild(picBlock);

    var nameBlock = document.createElement("td");
    nameBlock.innerText = name;
    block.appendChild(nameBlock);

    var colroBlock = document.createElement("td");
    colroBlock.innerText = color;
    block.appendChild(colroBlock);

    var priceBlock = document.createElement("td");
    // priceBlock.innerText = price;
    priceBlock.innerText = "$" + parseFloat(data.price).toFixed(2);
    block.appendChild(priceBlock);    

    var quantityBlock = document.createElement("td");
    quantityBlock.innerText = quantity;
    quantity.value = price;
    block.appendChild(quantityBlock);

    var buttonContainer = document.createElement("td");
    var deleteItem = document.createElement("button");
    deleteItem.type ="button"
    deleteItem.innerText = "X";
    deleteItem.value = id;
    deleteItem.id = id;
    deleteItem.className = "btn btn-light";
    deleteItem.onclick = function(event) { DeleteCartItem(event, id); };
    buttonContainer.appendChild(deleteItem);
    block.appendChild(buttonContainer);

    return block;
}

function DeleteCartItem(event, itemId){
    const APIKEY = "65ab8ff7384ac111a81414ff";
    var url = "https://electronics-a398.restdb.io/rest/cart/" + itemId;
    console.log(url);

    let settings = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    };
    var itemBlock = event.target.closest('tr');

    fetch(url, settings)
    .then(response => {
        itemBlock.remove();        
    })      
    .catch(error => {
        console.error('Error:', error);
    });
    
}
