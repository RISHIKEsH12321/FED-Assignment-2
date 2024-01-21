document.addEventListener("DOMContentLoaded", function () {
    // What kind of interface we want at the start 
    const APIKEY = "65ab8ff7384ac111a81414ff";

    let settings = {
        method: "GET", //[cher] we will use GET to retrieve info
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    var itemContainer = document.querySelector('.items-container');

    fetch("https://electronics-a398.restdb.io/rest/item", settings)
        .then(response => response.json())        
        .then(response => {
            console.log(response)
            for (var i = 0; i < response.length; i++) {
                var item = CreateItem(response[i]);                
                itemContainer.appendChild(item); 
                console.log("Created one item");
            }
        })
        


});

function CreateItem(data){
    //Creating item block
    var div = document.createElement('div');
    div.className = 'item-block';

    //Creating the img and adding it to the block
    var img = document.createElement('img');
    img.src = '../pictures/item-pics/' + data.picture_file_name + '.jpg';
    img.className = "item-pics";
    div.appendChild(img);

    //Creating the name, adding the additional info to url link and adding it to the block
    var name = document.createElement('a');
    name.className = "item-name";
    name.href = 'individual-item.html';
    name.dataset.customValue = data._id;
    name.onclick = passObjectData;
    name.textContent = data.name;
    div.appendChild(name);

    var price = document.createElement('p');
    price.className = "item-price";
    price.textContent = "$" + data.price;
    div.appendChild(price)

    return div;
}

function passObjectData(event) {
    event.preventDefault();
  

    var customValue = event.target.dataset.customValue;


    // Serialize the object as JSON string
    var id = JSON.stringify(customValue);

    // Append the serialized object data as a query parameter to the URL
    var link = event.target;
    link.href = link.href + '?ItemId=' + encodeURIComponent(id);
  
    // Navigate to the TestJS.html page
    window.location.href = link.href;
}