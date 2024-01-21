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

    var itemURL = "https://electronics-a398.restdb.io/rest/item/" + objectDataParam;

    fetch(itemURL, settings)
        .then(response => response.json())        
        .then(data => {
            console.log(data);
            var mainItemPic = document.querySelector("#main-img");
            mainItemPic.src = '../pictures/item-pics/' + data.picture_file_name + '.jpg';
        })
        




});