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

    // Your Google Apps Script URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5kWWbOF8NUE52fqNrK3IheGfA-q7Zv0lKjTSqxU55Nn-U2aH6oufhVrFbBT9aQy_e6A/exec";

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
        // Since we use 'no-cors', the response isn't readable, 
        // but success is implied if we reach here.
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
