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

    fetch("mail_handler.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            phone: phoneInput
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            btn.value = 'Sent!';
            setTimeout(() => {
                toggle();
                btn.value = 'Submit';
                btn.disabled = false;
                e.target.reset(); // reset the form
            }, 2000);
        } else {
            throw new Error(data.message || 'Error');
        }
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
