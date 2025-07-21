document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const confirmPasswordHint = document.getElementById('confirmPasswordHint');
    const messageDisplay = document.getElementById('message');

    // Function to display messages
    function showMessage(msg, type) {
        messageDisplay.textContent = msg;
        messageDisplay.className = `message ${type}`;
        messageDisplay.style.display = 'block';
    }

    // Function to clear messages
    function clearMessage() {
        messageDisplay.textContent = '';
        messageDisplay.className = 'message';
        messageDisplay.style.display = 'none';
    }

    // Real-time password confirmation check
    confirmPasswordInput.addEventListener('keyup', () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (confirmPassword === '') {
            confirmPasswordHint.textContent = '';
            confirmPasswordHint.style.color = '#666'; // Reset hint color
        } else if (password === confirmPassword) {
            confirmPasswordHint.textContent = 'Passwords match';
            confirmPasswordHint.style.color = 'green';
        } else {
            confirmPasswordHint.textContent = 'Passwords do not match';
            confirmPasswordHint.style.color = 'red';
        }
    });

    // Handle form submission
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        clearMessage(); // Clear previous messages

        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Basic validation
        if (username === '') {
            showMessage('Username cannot be empty', 'error');
            return;
        }

        if (password.length < 8) {
            showMessage('Password must be at least 8 characters long', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage('Passwords do not match. Please confirm your password.', 'error');
            // Reset confirm password field to encourage re-entry
            confirmPasswordInput.value = '';
            confirmPasswordHint.textContent = 'Passwords do not match';
            confirmPasswordHint.style.color = 'red';
            return;
        }

        // If all validations pass
        showMessage('Registration successful!', 'success');
        // Here you would typically send data to a server
        // e.g., using fetch API:
        /*
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('Registration successful!', 'success');
                registrationForm.reset(); // Clear form
                confirmPasswordHint.textContent = ''; // Clear hint
            } else {
                showMessage(`Registration failed: ${data.message}`, 'error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showMessage('An error occurred during registration. Please try again later.', 'error');
        });
        */
    });
});