const toastLiveExample = document.getElementById('liveToast');

function check(event){
    event.preventDefault();

    var customerData = sessionStorage.getItem('customer-data');

    if (!customerData) {
        event.preventDefault();
        const toast = new bootstrap.Toast(toastLiveExample);

        toast.show();
    }
    else {
        // Navigate to the link's href after checking
        window.location.href = event.currentTarget.getAttribute('href');
    }

}