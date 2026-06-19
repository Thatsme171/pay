document.addEventListener('DOMContentLoaded', () => {
    // Main navigation logic
    const navItems = document.querySelectorAll('.nav-item');
    const appSections = document.querySelectorAll('.app-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            navItems.forEach(nav => nav.classList.remove('active'));
            appSections.forEach(section => section.classList.remove('active'));
            
            item.classList.add('active');
            
            const targetId = item.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Scroll to top to simulate page redirect
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Sign In Modal Logic
    const loginBtn = document.querySelector('.login-btn');
    const modalOverlay = document.getElementById('signin-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const signinForm = document.getElementById('signin-form');

    if (loginBtn && modalOverlay) {
        // Toggle Sign In Modal / Sign Out
        loginBtn.addEventListener('click', () => {
            if (loginBtn.innerText === 'Sign In') {
                modalOverlay.classList.add('active'); // Open Modal
            } else {
                // Handle Sign Out directly
                loginBtn.innerText = 'Sign In';
                loginBtn.classList.remove('signed-in');
            }
        });

        // Close modal button
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        // Close on clicking outside the modal content
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });

        // Handle form submission
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            const loginId = document.getElementById('login-id').value;
            const loginPass = document.getElementById('login-pass').value;

            if (loginId && loginPass) {
                // Proceed with login success
                modalOverlay.classList.remove('active');
                loginBtn.innerText = 'Sign Out';
                loginBtn.classList.add('signed-in');
                signinForm.reset();
            }
        });
    }

    // Section specific tabs logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Scope tab switching to the current section's glass-panel
            const container = button.closest('.glass-panel');
            const buttonsInContainer = container.querySelectorAll('.tab-btn');
            const contentsInContainer = container.querySelectorAll('.tab-content');

            // Remove active class from buttons and contents in this section
            buttonsInContainer.forEach(btn => btn.classList.remove('active'));
            contentsInContainer.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding content
            const targetId = button.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Legal Accordion logic
    const legalButtons = document.querySelectorAll('.legal-btn');
    legalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const isActive = btn.classList.contains('active');

            // Close all open accordions for a cleaner experience
            document.querySelectorAll('.legal-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.legal-content').forEach(c => c.classList.remove('show'));

            // Open if it wasn't already active
            if (!isActive) {
                btn.classList.add('active');
                content.classList.add('show');
            }
        });
    });

    // Add some interactivity to search buttons
    const searchButtons = document.querySelectorAll('.search-btn');
    searchButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const originalText = this.innerText;
            this.innerText = 'Searching...';
            this.style.opacity = '0.8';
            
            setTimeout(() => {
                this.innerText = originalText;
                this.style.opacity = '1';
                // You could add a subtle shake animation here or show a mock result
            }, 1500);
        });
    });
});
