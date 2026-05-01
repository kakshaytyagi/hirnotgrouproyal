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

    fetch("https://formsubmit.co/ajax/info.us@99bigha.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            phone: phoneInput,
            _cc: "akshaytyagi3102003@gmail.com, tyagirinkesh@gmail.com",
            _subject: "New Lead Registration - Hirnot Group Royal",
            _captcha: "false"
        })
    })
        .then(response => response.json())
        .then(data => {
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
