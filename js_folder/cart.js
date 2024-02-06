const itemIDs = [];
document.addEventListener("DOMContentLoaded", function () {
    var customerData = JSON.parse(sessionStorage.getItem("customer-data"));
    var customerId = customerData ? customerData._id : null;
    document.getElementById("checkout").style.display = "none";


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
    block.id = id + "block";
    var picBlock = document.createElement("td");
    var imgElement = document.createElement("img");
    imgElement.src = "pictures/item-pics/" + picFilePath + ".jpg";
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
    console.log("Deleting: " + url);

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
        UpdateTotal();     
    })      
    .catch(error => {
        console.error('Error:', error);
    });

    
    
}

document.getElementById("checkoutbtn").addEventListener("click",function(e){
    e.preventDefault();
    document.getElementById("checkout").style.display = "block";
    
    var CustomerData = JSON.parse(sessionStorage.getItem("customer-data"));

    console.log(CustomerData["address"])
    document.getElementById("address").value = CustomerData["address"];
    
    var id = CustomerData["_id"];
    console.log(id)

    const APIKEY = "65ab8ff7384ac111a81414ff";

    let settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    };

    let total = 0

    // fetch("https://electronics-a398.restdb.io/rest/cart", settings)
    // .then(response => response.json())        
    // .then(data => {
    //     for (var i = 0; i < data.length; i++){                
    //         if (data[i].customer_id === id ){
    //             console.log(data[i]);
    //             total += data[i]["price"] * data[i]["quantity"];
    //             console.log(total);
    //             //data[i].points += Math.ceil(total/25);
    //         }
    //     }  
    //     var t = document.getElementById("total");
    //     t.innerHTML = "Total: $" + total;
    //     console.log("total: " + t.innerText);
    //     //data.points += Math.ceil(total/25);
    //     //console.log(data);
    //     //sessionStorage.setItem("customer-data", data);
    // })

    UpdateTotal();
 
});

function AddPoints(e){
    e.preventDefault();
    document.getElementById("checkout").style.display = "block";
    
    var CustomerData = JSON.parse(sessionStorage.getItem("customer-data"));
    var points = CustomerData.points;

    var itemIDs = [];
    var total = 0;

    
    var cartItems = document.querySelectorAll("#item-cart-display tr");

    
    cartItems.forEach(function(item) {
        var itemId = item.id; 
        var quantity = item.querySelector("td:nth-child(5)").innerText; 
        var price = item.querySelector("td:nth-child(4)").innerText.replace("$", ""); 
        
        total += parseFloat(price) * parseInt(quantity);
        console.log("Total of all items is: " + total);
        itemIDs.push(itemId);
    });
    console.log(itemIDs);

    console.log("Current Points: " + CustomerData.points);

    //var t = parseFloat(document.getElementById("total").innerText);

    CustomerData.points = points + Math.floor(total/25);

    console.log("Updated Points: " + CustomerData.points);

    console.log("Total of all items is: " + total);
    
    sessionStorage.setItem("customer-data", JSON.stringify(CustomerData));
    UpdatePoints();
    ClearCart(itemIDs);

    // document.getElementById("waiting-animation").style.display = "block";

    // setTimeout(function () {
    //     window.location = 'index.html';
    // },10000)
}

function UpdatePoints(){
    var CustomerData = JSON.parse(sessionStorage.getItem("customer-data"));
    var url = "https://electronics-a398.restdb.io/rest/account/" + CustomerData._id;
    const APIKEY = "65ab8ff7384ac111a81414ff";

    let settings = {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(CustomerData)
    };
    fetch(url, settings)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update resource");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function DeleteCartItemInDatabase(itemId) {
    const APIKEY = "65ab8ff7384ac111a81414ff";
    var url = "https://electronics-a398.restdb.io/rest/cart/" + itemId;
    console.log("Deleting: " + url);

    let settings = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache",
        },
    };

    fetch(url, settings)
    .then(response => {
        response.json();
        console.log(response);
    })
}
function ClearCart(data){
    var itemContainer = document.getElementById("item-cart-display");
    itemContainer.innerHTML = null;


    for (let i = 0; i<data.length;i++){
        deleteIdID = data[i].substring(0, 24);
        DeleteCartItemInDatabase(deleteIdID);
        console.log("Called Delete: " + deleteIdID);
    }
}

function UpdateTotal(){
    var cartItems = document.querySelectorAll("#item-cart-display tr");

    var total = 0;
    cartItems.forEach(function(item) {
        var quantity = item.querySelector("td:nth-child(5)").innerText; 
        var price = item.querySelector("td:nth-child(4)").innerText.replace("$", ""); 

        total += parseFloat(price) * parseInt(quantity);
        console.log("Total of all items is: " + total);
        
    });
    
    document.getElementById("total").innerText = "$" + parseFloat(total).toFixed(2);;
}