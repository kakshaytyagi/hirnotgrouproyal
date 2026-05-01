function toggle() {
    var newsletter = document.querySelector('.newsletter');
    newsletter.classList.toggle('popUp');
}

function actionToggle() {
    var action = document.querySelector('.action');
    action.classList.toggle('active');
}

function submitForm(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const phoneInput = document.getElementById('phoneInput').value;

    btn.value = 'Sending...';
    btn.disabled = true;

    // REPLACE THE URL BELOW with your Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE";

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: phoneInput
        })
    })
    .then(() => {
        // Since we use 'no-cors', we won't get a readable response, 
        // but if the fetch finishes without an error, it usually succeeded.
        btn.value = 'Sent!';
        setTimeout(() => {
            toggle();
            btn.value = 'Submit';
            btn.disabled = false;
            e.target.reset(); // reset the form
        }, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
        btn.value = 'Error!';
        setTimeout(() => {
            btn.value = 'Submit';
            btn.disabled = false;
        }, 2000);
    });
}
