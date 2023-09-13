document.addEventListener('DOMContentLoaded', function () {
    const navigationLinks = document.querySelectorAll('.navigation a');
    const sections = document.querySelectorAll('section');

    // Function to hide all sections except the target section
    function showSection(targetId) {
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }

    navigationLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
        });
    });

    // Code for handling the login form on home.html
    const loginForm = document.querySelector('#login form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(loginForm);
            const username = formData.get('username');
            const password = formData.get('password');

            // Send a POST request to server to handle login and authentication
            try {
                const response = await fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `username=${username}&password=${password}`,
                });

                const data = await response.json();
                if (data.message === 'Login successful') {
                    // Redirect to the dashboard page on successful login
                    window.location.href = '/dashboard';
                } else {
                    // Display an error message on login failure
                    alert('Login failed. Wrong username or password!');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Code for the dashboard page (dashboard.html)
    const startMineButton = document.querySelector('#startMining');
    if (startMineButton) {
        startMineButton.addEventListener('click', function () {
            alert('Mining started!');
        });
    }
});
