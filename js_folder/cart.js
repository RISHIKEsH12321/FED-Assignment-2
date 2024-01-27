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
                console.log(data[i].customer_id === customerId);
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

    var priceBlock = document.createElement("td");
    priceBlock.innerText = price;
    block.appendChild(priceBlock);

    var colroBlock = document.createElement("td");
    colroBlock.innerText = color;
    block.appendChild(colroBlock);

    var quantityBlock = document.createElement("td");
    quantityBlock.innerText = quantity;
    quantity.value = price;
    block.appendChild(quantityBlock);

    return block;
}