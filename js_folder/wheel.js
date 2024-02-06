var customerData;
document.addEventListener("DOMContentLoaded",function(){
    customerData = JSON.parse(sessionStorage.getItem("customer-data"));
    var customerId = customerData ? customerData._id : null;

    if (customerId === null) {
        alert("Customer data or customer id is null. Cannot proceed with spin the wheel.");
        window.location.href = 'signUp.html';
        return; // Stop the rest of the function
    }

    console.log(customerData.points)
})

function rotateFunction(){
    if (customerData["points"] < 100){
        alert("You dont not have enough points to spin the wheel")
        document.querySelector("button").style.display = "none";
        document.querySelector("button").disabled = true;
        console.log(customerData["points"])
        return;
    }
    else{
        document.querySelector("button").disabled = false;
        console.log(customerData.points)
        customerData["points"] -= 100;
    }
    
    console.log(customerData.points)
    var min = 1024;
    var max = 9999;
    var deg = Math.floor(Math.random() * (max - min)) + min;
    document.getElementById('box').style.transform = "rotate("+deg+"deg)";

    while (deg >= 360) {
        deg = deg - 360;
    }
    
    console.log(deg)
    if (deg >= 337 || deg < 22)
    {
        document.getElementById("prize").innerHTML = "You Got Nothing. Better Luck Next Time!"; 
    }
    else if (deg >= 22 && deg < 67)
    {
        document.getElementById("prize").innerHTML = "Congratulations you have won $1000"; 
    }
    else if (deg >= 67 && deg < 112)
    {
        document.getElementById("prize").innerHTML = "You Got Nothing. Better Luck Next Time!"; 
    }
    else if (deg >= 112 && deg < 157)
    {
        document.getElementById("prize").innerHTML = "Congratulations you have won $0.10"; 
    }
    else if (deg >= 157 && deg < 202)
    {
        document.getElementById("prize").innerHTML = "You Got Nothing. Better Luck Next Time!"; 
    }
    else if (deg >= 202 && deg < 247)
    {
        document.getElementById("prize").innerHTML = "Congratulations you have won $10"; 
    }  
    else if (deg >= 247 && deg < 292)
    {
        document.getElementById("prize").innerHTML = "You Got Nothing. Better Luck Next Time!"; 
    }
    else if (deg >= 292 && deg < 337)
    {
        document.getElementById("prize").innerHTML = "Congratulations you have won $20"; 
    }
    
    UpdatePoints();
}

function UpdatePoints(){
    console.log(customerData.points)
    var url = "https://electronics-a398.restdb.io/rest/account/" + customerData._id;
    const APIKEY = "65ab8ff7384ac111a81414ff";

    let settings = {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(customerData)
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

document.addEventListener("beforeunload",function(){
    sessionStorage.setItem("customer-data", JSON.stringify(CustomerData));
})