// Join form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const joinForm = document.getElementById('joinForm');
    const formMessage = document.getElementById('formMessage');
    
    if (joinForm) {
        joinForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            const submitButton = joinForm.querySelector('.join-submit');
            
            if (!email) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Disable submit button
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            try {
                // Send to Vercel serverless function
                const response = await fetch('/api/submit-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Failed to submit email');
                }

                // Show success message
                showMessage('Thank you! We\'ll keep you updated.', 'success');
                emailInput.value = '';
                
            } catch (error) {
                console.error('Error submitting form:', error);
                showMessage('Something went wrong. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Stay Updated';
            }
        });
    }
    
    function showMessage(text, type) {
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});
