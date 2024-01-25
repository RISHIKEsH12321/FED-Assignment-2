const APIKEY = "65ab8ff7384ac111a81414ff";
function PostInfoToDB(e){
    e.preventDefault();
    

    var name = document.getElementById('name').value;
    var passwords = document.getElementById('exampleInputPassword1').value;
    var phoneNum = document.getElementById('contact').value;
    var email = document.getElementById('exampleInputEmail1').value;
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
    console.log(data)
    fetch("https://electronics-a398.restdb.io/rest/account", settings)
        .then(response => response.json())
        .then(jsoneResponse =>{
            console.log(jsoneResponse);
            }
        )

    document.getElementById("account-info-form").reset();



}