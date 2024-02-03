 function rotateFunction(){
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
}

