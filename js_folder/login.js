const APIKEY = "65ab8ff7384ac111a81414ff";


function loginCheck(){
    event.preventDefault()
    let settings = {
        method: "GET", 
        headers: {
            "Content-Type": "application/json",
            "x-apikey": APIKEY,
            "Cache-Control": "no-cache"
        }
    };
    
    var password = document.getElementById('exampleInputPassword1').value;
    var email = document.getElementById('email').value;
    
    fetch("https://electronics-a398.restdb.io/rest/account", settings)
        .then(response => response.json())
        .then(data => {
            let check = false;
            //console.log(data);
            for (var i = 0; i < data.length; i++){
                if (data[i].email === email){
                    check = true;
                    if (data[i].password === password){
                        window.alert("You have successfully logged in.");
                        window.location.href = 'index.html';
                        console.log(data[i]);
                        sessionStorage.setItem("customer-data", JSON.stringify(data[i]));
                        break;
                    }
                    else{
                        window.alert("Invalid Password.");
                        document.getElementById("login-form").reset();
                        break;
                    }
                }
            }
            if (!check) {
                window.alert("There is no account with that email.");
                document.getElementById("login-form").reset();
            }
            
        }
            )
}