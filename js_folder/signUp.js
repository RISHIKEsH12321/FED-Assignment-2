const APIKEY = "65ab8ff7384ac111a81414ff";
function PostInfoToDB(e){
    e.preventDefault();
    

    var name = document.getElementById('name').value;
    var passwords = document.getElementById('password').value;
    var phoneNum = document.getElementById('contact').value;
    var email = document.getElementById('email').value;
    var address = document.getElementById('address').value;

    
    let data = {
        "name": name,
        "password": passwords,
        "contact_no": phoneNum,
        "email": email,
        "address": address
    };

    let settings = {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(data)
    };
    //console.log(data)
    fetch("https://electronics-a398.restdb.io/rest/account", settings)
        .then(response => response.json())
        .then(jsoneResponse =>{
            console.log(jsoneResponse);

            }
        )

    document.getElementById("account-info-form").reset();
}

addEventListener("DOMContentLoaded", function(){
    var customerData = sessionStorage.getItem("customer-data");
    customerData = JSON.parse(customerData);
    console.log(customerData);

    if (customerData === null){
        document.getElementById("account-info-form").style.display = 'block'; // Use 'block' to make it visible
    }
    else{
        document.getElementById("account-info-form").style.display = 'none';
        document.getElementById("show-name").innerHTML = "Name: "+ customerData.name;
        document.getElementById("show-email").innerHTML = "Email: " + customerData.email;
        document.getElementById("show-number").innerHTML = "Contact Number: " + customerData.contact_no;
        document.getElementById("show-address").innerHTML = "Address: " + customerData.address;
        document.getElementById("show-points").innerHTML = "Points: " + customerData.points;
        document.getElementById("show-password").innerHTML = "Password: " + customerData.password;
        document.getElementById("show-cutomer-details").style.display = "block";
    }
});

function LogOut(event){
    var x = null;
    sessionStorage.setItem("customer-data", x);
    location.reload();
}