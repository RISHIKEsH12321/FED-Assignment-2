document.addEventListener("DOMContentLoaded", function () {    
    // Check the session storage for the stored filter value
    var storedFilter = sessionStorage.getItem('selectedFilter');
    if (storedFilter) {
        // If a filter is stored, check the corresponding radio button
        document.querySelector(`[data-value="${storedFilter}"]`).checked = true;
    }

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
    var lottieContainer = document.getElementById('lottie-container');
    //lol

    // Show Lottie animation container before making the API request
    lottieContainer.style.display = 'block';

    fetch("https://electronics-a398.restdb.io/rest/item", settings)
        .then(response => response.json())        
        .then(response => {
            console.log(response)
            for (var i = 0; i < response.length; i++) {
                var url = new URLSearchParams(window.location.search);
                var filterID = url.get('FilterType');
                if (response[i].type == filterID || !(filterID) ){
                    var item = CreateItem(response[i]);                
                    itemContainer.appendChild(item); 
                    console.log("Created one item");
                }
            }
            // Hide Lottie animation container after API request is complete
            lottieContainer.style.display = 'none';
        })
        


});

function CreateItem(data){
    //Creating item block
    var div = document.createElement('div');
    div.className = 'item-block';

    //Creating the img and adding it to the block
    var img = document.createElement('img');
    img.src = 'pictures/item-pics/' + data.picture_file_name + '.jpg';
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
function filterCreator(event) {
    event.preventDefault();
    var filter = event.target.dataset.value;

    // Serialize the object as JSON string
    var id = JSON.stringify(filter);

    // Store the selected filter value in the session storage
    sessionStorage.setItem('selectedFilter', filter);

    // Get the current URL
    var currentUrl = window.location.href;

    // Remove any existing query string
    var noQueryStringUrl = currentUrl.split('?')[0];
    var newURL;

    id  = id.replace(/["']/g, '');
    if (id == "all"){
        newURL = noQueryStringUrl;
    }
    else{
        // Append the serialized object data as a query parameter to the URL
        newURL = noQueryStringUrl + '?FilterType=' + encodeURIComponent(id);
    }
    

    // Navigate to the new URL
    window.location.href = newURL;
};
