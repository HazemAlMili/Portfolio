// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Functionality
    const themeSwitch = document.getElementById('theme-switch');
    
    if (themeSwitch) {
        // Check for saved theme preference or use device preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const savedTheme = localStorage.getItem('theme');
        
        // If the user has explicitly chosen a theme, use it
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                themeSwitch.checked = true;
            }
        } else if (prefersDarkScheme.matches) {
            // If no saved preference, but device prefers dark mode
            document.documentElement.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
            localStorage.setItem('theme', 'dark');
        }
        
        // Listen for toggle changes
        themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Background Animation Setup
    function setupBackgroundAnimation() {
        const bgAnimation = document.querySelector('.bg-animation');
        if (!bgAnimation) return;
        
        // Make sure we have the right number of spans
        const requiredSpans = 7;
        const existingSpans = bgAnimation.querySelectorAll('span').length;
        
        if (existingSpans < requiredSpans) {
            for (let i = existingSpans; i < requiredSpans; i++) {
                const span = document.createElement('span');
                bgAnimation.appendChild(span);
            }
        }
    }
    
    setupBackgroundAnimation();
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Projects Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Validation and Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (name === '' || email === '' || subject === '' || message === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, you would typically send the form data to a server
            // For now, let's just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.project-card, .skill-card, .timeline-item, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    // Add animation class to elements when they come into view
    window.addEventListener('scroll', animateOnScroll);
    // Initial check on page load
    animateOnScroll();

    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .project-card, .skill-card, .timeline-item, .testimonial {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animate, .skill-card.animate, .timeline-item.animate, .testimonial.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Create placeholder images if they don't exist
    function createPlaceholderImage(src, alt, width, height, bgColor) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.width = width;
        img.height = height;
        img.style.backgroundColor = bgColor;
        return img;
    }

    // Check if project images exist, if not, create placeholders
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.onerror = function() {
            const placeholderSrc = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22288%22%20height%3D%22225%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20fill%3D%22%23f8f9fa%22%20d%3D%22M0%200h288v225H0z%22%2F%3E%3Ctext%20fill%3D%22%23dee2e6%22%20font-family%3D%22sans-serif%22%20font-size%3D%2240%22%20dy%3D%22.3em%22%20font-weight%3D%22bold%22%20x%3D%22144%22%20y%3D%22112%22%20text-anchor%3D%22middle%22%3EProject%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
            this.src = placeholderSrc;
        };
    });

    // Check for profile image
    const profileImage = document.querySelector('.about-image img');
    if (profileImage) {
        profileImage.onerror = function() {
            const placeholderSrc = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22200%22%20height%3D%22200%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20fill%3D%22%23f8f9fa%22%20d%3D%22M0%200h200v200H0z%22%2F%3E%3Ctext%20fill%3D%22%23dee2e6%22%20font-family%3D%22sans-serif%22%20font-size%3D%2230%22%20dy%3D%22.3em%22%20font-weight%3D%22bold%22%20x%3D%22100%22%20y%3D%22100%22%20text-anchor%3D%22middle%22%3EProfile%20Photo%3C%2Ftext%3E%3C%2Fsvg%3E';
            this.src = placeholderSrc;
        };
    }

    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 1) {
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Create navigation dots
        const sliderContainer = document.querySelector('.testimonials-slider');
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = index === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => showTestimonial(index));
            dotsContainer.appendChild(dot);
        });
        
        sliderContainer.appendChild(dotsContainer);
        
        // Add CSS for dots
        const dotStyle = document.createElement('style');
        dotStyle.textContent = `
            .slider-dots {
                display: flex;
                justify-content: center;
                margin-top: 20px;
            }
            
            .dot {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #ddd;
                margin: 0 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            
            .dot.active {
                background-color: var(--primary-color);
            }
        `;
        document.head.appendChild(dotStyle);
        
        // Function to show a specific testimonial
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
            
            document.querySelectorAll('.dot').forEach((dot, i) => {
                dot.className = i === index ? 'dot active' : 'dot';
            });
            
            currentTestimonial = index;
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
});
