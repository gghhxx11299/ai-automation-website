// Pricing toggle JavaScript for AutoCallAI website

document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billing-toggle');
    const priceElements = document.querySelectorAll('.amount');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isAnnual = this.checked;
            
            priceElements.forEach(priceEl => {
                const monthlyPrice = parseInt(priceEl.getAttribute('data-monthly'));
                const annualPrice = parseInt(priceEl.getAttribute('data-annual'));
                
                if (isAnnual) {
                    priceEl.textContent = annualPrice;
                    // Update the period text to show annual savings
                    const periodSpan = priceEl.nextElementSibling;
                    if (periodSpan) {
                        periodSpan.textContent = '/month (billed annually)';
                    }
                } else {
                    priceEl.textContent = monthlyPrice;
                    const periodSpan = priceEl.nextElementSibling;
                    if (periodSpan) {
                        periodSpan.textContent = '/month';
                    }
                }
            });
        });
    }
    
    // Add hover effect to pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                // Keep popular card slightly scaled
                this.style.transform = 'scale(1.05) translateY(-10px)';
            }
        });
    });
    
    // Add animation to pricing cards when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    pricingCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});