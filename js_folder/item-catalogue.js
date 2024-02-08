document.addEventListener("DOMContentLoaded", function () {    
   const APIKEY = "65ab8ff7384ac111a81414ff";

    let settings = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    var itemContainer = document.querySelector('.items-container');
    var lottie = document.getElementById('ani');

    // Show Lottie animation container before making the API request
    lottie.style.display = 'block';

    var radioInputs = document.querySelectorAll('input[name="category"]');

    radioInputs.forEach(function (radioInput) {
        radioInput.addEventListener('change', filterCreator);
    });

    fetch("https://electronics-a398.restdb.io/rest/item", settings)
        .then(response => response.json())        
        .then(response => {
            console.log(response)
            for (var i = 0; i < response.length; i++) {
                var item = CreateItem(response[i]);                
                itemContainer.appendChild(item); 
                console.log("Created one item");
            }
            // Hide Lottie animation container after API request is complete
            lottie.style.display = 'none';
        })
        
    var searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', performSearch);

});

function CreateItem(data){
    //Creating item block
    var div = document.createElement('div');
    div.className = 'item-block';
    div.dataset.itemCat = data.type;

    //Creating the img and adding it to the block
    var img = document.createElement('img');
    img.src = 'pictures/item-pics/' + data.picture_file_name + '.jpg';
    img.className = "item-pics";
    div.appendChild(img);

    //Creating the div containing the price and the name for styling purposes
    var details = document.createElement('div');
    details.className = "details-block";
    //Creating the name, adding the additional info to url link and adding it to the block
    var name = document.createElement('a');
    name.className = "item-name";
    name.href = 'individual-item.html?ItemId=' + encodeURIComponent(data._id);
    name.dataset.customValue = data._id;
    // name.onclick = passObjectData;
    name.textContent = data.name;
    details.appendChild(name);

    var price = document.createElement('p');
    price.className = "item-price";
    price.textContent = "$" + parseFloat(data.price).toFixed(2);
    details.appendChild(price)

    div.appendChild(details)

    return div;
}

function filterCreator(e) {
    e.preventDefault();

    var filter = e.target.dataset.value;
    // Get all item blocks
    var itemBlocks = document.querySelectorAll('.item-block');

    // Iterate through each item block and check if it belongs to the selected category
    itemBlocks.forEach(function (itemBlock) {
        var category = itemBlock.getAttribute('data-item-cat');

        // If the item category matches the selected filter or the filter is 'all', display the item; otherwise, hide it
        if (filter === 'all' || category === filter) {
            itemBlock.style.display = 'block flex';
        } else {
            itemBlock.style.display = 'none';            
        }
    });
}



function performSearch() {
    var searchInput = document.getElementById('searchInput');
    var searchTerm = searchInput.value.toLowerCase();

    // Get all item blocks
    var itemBlocks = document.querySelectorAll('.item-block');

    // Iterate through each item block and check if it contains the search term
    itemBlocks.forEach(function (itemBlock) {
        var itemName = itemBlock.querySelector('.item-name').textContent.toLowerCase();

        // If the item name contains the search term, display the item; otherwise, hide it
        if (itemName.includes(searchTerm)) {
            itemBlock.style.display = 'block flex';
        } else {
            itemBlock.style.display = 'none';
        }
    });
}
