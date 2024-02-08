includeHTMLHeader();
function includeHTMLHeader() {
  var z, i, a, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    if (z[i].getAttribute("w3-include-html")) {
      a = z[i].cloneNode(false);
      file = z[i].getAttribute("w3-include-html");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          a.removeAttribute("w3-include-html");
          a.innerHTML = xhttp.responseText;
          z[i].parentNode.replaceChild(a, z[i]);
          includeHTMLHeader();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}

includeHTMLFooter();
function includeHTMLFooter() {
  var z, i, a, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    if (z[i].getAttribute("w3-include-html")) {
      a = z[i].cloneNode(false);
      file = z[i].getAttribute("w3-include-html");
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          a.removeAttribute("w3-include-html");
          a.innerHTML = xhttp.responseText;
          z[i].parentNode.replaceChild(a, z[i]);
          includeHTMLFooter();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}

function check(e){
  e.preventDefault();
  var customerData = JSON.parse(sessionStorage.getItem("customer-data"));

    if (customerData == null) {
        window.alert("You must login to access cart.")
        return;
    }
  else {
        // Navigate to the link's href after checking
        window.location.href = 'cart.html';
    }
}
