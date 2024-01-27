document.addEventListener("DOMContentLoaded", function (){

    const APIKEY = "65ab8ff7384ac111a81414ff";

    // Get the objectData parameter from the URL
    var urlParams = new URLSearchParams(window.location.search);
    var objectDataParam = urlParams.get('ItemId');

    let settings = {
        method: "GET", //[cher] we will use GET to retrieve info
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
    }

    objectDataParam = objectDataParam.replace(/["']/g, '');
    var lottieContainer = document.getElementById('lottie-container');

    // Show Lottie animation container before making the API request
    lottieContainer.style.display = 'block';

    var itemURL = "https://electronics-a398.restdb.io/rest/item/" + objectDataParam;


    fetch(itemURL, settings)
        .then(response => response.json())        
        .then(data => {
            console.log(data);
            var mainItemPic = document.querySelector("#main-img");
            mainItemPic.src = 'pictures/item-pics/' + data.picture_file_name + '.jpg';
            var name = document.getElementById("item-name");
            name.innerText = data.name;
            var price = document.getElementById("item-price");
            price.innerText = "$" + parseFloat(data.price).toFixed(2);
            var details = document.getElementById("item-details");
            details.innerText = data.description;
            var color_container = document.getElementById("item-colors");
            var color_list = [];
            if (data.colors.includes(',')){
                var x = data.colors.split(",")
                for (i = 0; i < x.length;i++){
                    color_list.push(x[i]);
                }
            }
            else{
                color_list.push(data.colors);
                console.log(2);
            }

            for (i = 0; i < color_list.length;i++){
                var color_choice_block = document.createElement("div");
                var color_button = document.createElement("input");
                color_button.type = "radio";
                color_button.name = "color_choice";
                color_button.value = color_list[i];
                color_button.class = "color_choice_radio_button";
                if (i === 0){
                    color_button.checked = true;
                }
                var label = document.createElement("label");
                label.textContent = color_list[i];
                color_choice_block.appendChild(color_button);
                color_choice_block.appendChild(label);                

                color_container.appendChild(color_choice_block);
            }
            document.getElementById("add-to-cart").hidden = false; 
            lottieContainer.style.display = 'none';
        })
});

function AddToCart(event){
    var radioButtons = document.getElementsByName("color_choice");

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
        console.log("Selected Color: " + radioButtons[i].value);
        var customerData = JSON.parse(sessionStorage.getItem("customer-data"));
        var custoemrid = customerData._id;
        const APIKEY = "65ab8ff7384ac111a81414ff";
        
        var name = document.getElementById("item-name").innerHTML;
        var price = parseFloat(document.getElementById("item-price").innerHTML.replace(/[^0-9.]/g, ''));
        var color = radioButtons[i].value;
        var imagePath = new URL(document.querySelector("#main-img").src).pathname;
        
        


        let data = {
            "quantity": 1,
            "item_name": name,
            "price": price,
            "color": color,
            "picture_file_name": imagePath,
            "customer_id": custoemrid
        };
        console.log(data);
    
        let settings = {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "x-apikey": APIKEY,
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify(data)
        };

        fetch("https://electronics-a398.restdb.io/rest/cart", settings)
        .then(response => response.json())
        .then(jsoneResponse =>{
            console.log(jsoneResponse);

            }
        )

        break; 
        }
    }
};