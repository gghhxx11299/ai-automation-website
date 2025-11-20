// Contact page JavaScript for AutoCallAI website

document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            const errors = [];
            
            if (!nameInput.value.trim()) {
                errors.push('Name is required');
                nameInput.style.borderColor = '#e63946';
                isValid = false;
            } else {
                nameInput.style.borderColor = '#ced4da';
            }
            
            if (!emailInput.value.trim()) {
                errors.push('Email is required');
                emailInput.style.borderColor = '#e63946';
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                errors.push('Please enter a valid email address');
                emailInput.style.borderColor = '#e63946';
                isValid = false;
            } else {
                emailInput.style.borderColor = '#ced4da';
            }
            
            if (!messageInput.value.trim()) {
                errors.push('Message is required');
                messageInput.style.borderColor = '#e63946';
                isValid = false;
            } else {
                messageInput.style.borderColor = '#ced4da';
            }
            
            if (isValid) {
                // Form is valid, you would normally send the data to your server here
                // For demo purposes, we'll just show a success message
                
                // Show success feedback
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                successMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #2ecc71;
                    color: white;
                    padding: 15px 25px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    z-index: 10000;
                    font-weight: 500;
                `;
                
                document.body.appendChild(successMessage);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 5000);
                
                // Reset form
                contactForm.reset();
                
                // Simulate form submission delay for better UX
                setTimeout(() => {
                    // In a real application, you would send the data to your server here
                    console.log('Form submitted successfully:', {
                        name: nameInput.value,
                        email: emailInput.value,
                        company: document.getElementById('company').value,
                        phone: document.getElementById('phone').value,
                        interest: document.getElementById('interest').value,
                        message: messageInput.value
                    });
                }, 500);
            } else {
                // Show validation errors
                alert('Please correct the following errors:\n' + errors.join('\n'));
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    input.style.borderColor = '#e63946';
                } else {
                    input.style.borderColor = '#ced4da';
                    
                    // Special validation for email
                    if (input.type === 'email' && !isValidEmail(input.value)) {
                        input.style.borderColor = '#e63946';
                    }
                }
            });
        });
    }
    
    // Map placeholder interaction
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', () => {
            // In a real implementation, this would open a map
            alert('Map functionality would open here in a real implementation.');
        });
    }
    
    // Add animation to form elements when they come into view
    const formElements = document.querySelectorAll('.form-group, .btn');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    formElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
});

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}