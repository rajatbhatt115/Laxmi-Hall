// =============== COMMON FUNCTIONS ===============

// Smooth scroll for all pages
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// =============== HOME PAGE SPECIFIC FUNCTIONS ===============

// Rating tabs functionality (only for home page)
if (document.querySelector('.rating-tab')) {
    document.querySelectorAll('.rating-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            document.querySelectorAll('.rating-tab').forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Hide all product categories
            document.querySelectorAll('.product-category').forEach(category => {
                category.classList.remove('active');
            });

            // Show the selected category
            const categoryId = this.getAttribute('data-category') + '-category';
            document.getElementById(categoryId).classList.add('active');
        });
    });
}

// Testimonial slider functionality (only for home page)
if (document.querySelector('.testimonial-track')) {
    document.addEventListener('DOMContentLoaded', function () {
        const track = document.querySelector('.testimonial-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        const prevBtn = document.querySelector('.testimonial-arrow.prev');
        const nextBtn = document.querySelector('.testimonial-arrow.next');

        let currentSlide = 0;
        const totalSlides = slides.length;

        // Initialize slider
        updateSlider();

        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        }

        // Update slider position and active dot
        function updateSlider() {
            track.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update active dot
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });

        // Auto slide (optional)
        setInterval(nextSlide, 5000);
    });
}

// =============== ABOUT PAGE SPECIFIC FUNCTIONS ===============

// Timeline Slider Functionality (only for about page)
if (document.getElementById('timelineSlider')) {
    document.addEventListener('DOMContentLoaded', function() {
        const slider = document.getElementById('timelineSlider');
        const slides = document.querySelectorAll('.timeline-slide');
        const dotsContainer = document.getElementById('timelineDots');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        let currentSlide = 0;
        const slidesPerView = window.innerWidth >= 768 ? 3 : 1;
        const totalSlides = slides.length;
        
        // ALWAYS CREATE ONLY 3 DOTS (not 4)
        const totalDotsToShow = 3;
        
        // Create exactly 3 dots
        for (let i = 0; i < totalDotsToShow; i++) {
            const dot = document.createElement('div');
            dot.classList.add('timeline-dot');
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                if (window.innerWidth >= 768) {
                    // Desktop: each dot represents first slide of a group
                    currentSlide = i * slidesPerView;
                } else {
                    // Mobile: each dot represents individual slide (0, 1, 2)
                    currentSlide = i;
                }
                updateSlider();
            });
            
            dotsContainer.appendChild(dot);
        }
        
        const dots = document.querySelectorAll('.timeline-dot');
        
        // Update slider position
        function updateSlider() {
            const slideWidth = 100 / slidesPerView;
            const translateX = -currentSlide * slideWidth;
            slider.style.transform = `translateX(${translateX}%)`;
            
            // Update active dot
            dots.forEach((dot, index) => {
                let isActive = false;
                
                if (window.innerWidth >= 768) {
                    // Desktop: active dot when currentSlide is in its group
                    const groupStart = index * slidesPerView;
                    const groupEnd = groupStart + slidesPerView - 1;
                    isActive = currentSlide >= groupStart && currentSlide <= groupEnd;
                } else {
                    // Mobile: active dot matches currentSlide (0, 1, or 2)
                    isActive = currentSlide === index;
                }
                
                dot.classList.toggle('active', isActive);
            });
        }
        
        // Next slide
        function nextSlide() {
            if (currentSlide < totalSlides - slidesPerView) {
                currentSlide++;
            } else {
                currentSlide = 0;
            }
            updateSlider();
        }
        
        // Previous slide
        function prevSlide() {
            if (currentSlide > 0) {
                currentSlide--;
            } else {
                currentSlide = totalSlides - slidesPerView;
            }
            updateSlider();
        }
        
        // Event listeners
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto slide (optional)
        let autoSlide = setInterval(nextSlide, 5000);
        
        // Pause auto slide on hover
        const timelineContainer = document.querySelector('.timeline-container');
        if (timelineContainer) {
            timelineContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
            timelineContainer.addEventListener('mouseleave', () => {
                autoSlide = setInterval(nextSlide, 5000);
            });
        }
        
        // Update on window resize
        window.addEventListener('resize', function() {
            const newSlidesPerView = window.innerWidth >= 768 ? 3 : 1;
            
            // Clear existing dots
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                
                // Recreate exactly 3 dots
                for (let i = 0; i < totalDotsToShow; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('timeline-dot');
                    
                    // Determine if this dot should be active
                    let isActive = false;
                    if (window.innerWidth >= 768) {
                        const groupStart = i * newSlidesPerView;
                        const groupEnd = groupStart + newSlidesPerView - 1;
                        isActive = currentSlide >= groupStart && currentSlide <= groupEnd;
                    } else {
                        isActive = currentSlide === i;
                    }
                    
                    if (isActive) dot.classList.add('active');
                    
                    dot.addEventListener('click', () => {
                        if (window.innerWidth >= 768) {
                            currentSlide = i * newSlidesPerView;
                        } else {
                            currentSlide = i;
                        }
                        updateSlider();
                    });
                    
                    dotsContainer.appendChild(dot);
                }
                
                updateSlider();
            }
        });
        
        // Initialize slider
        updateSlider();
    });
}

// =============== ANIMATIONS FOR BOTH PAGES ===============

// Add smooth scroll animation on load for both pages
window.addEventListener('load', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // For home page
    if (document.querySelector('.timeline-slide')) {
        document.querySelectorAll('.timeline-slide, .team-card, .info-card, .experience-image, .experience-content').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    // For home page product cards
    if (document.querySelector('.rating-card')) {
        document.querySelectorAll('.rating-card, .product-card, .category-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }
});

// Blog Pagination Functionality
        function initializeBlogPagination() {
            const pageNumbers = document.querySelectorAll('.page-number');
            const blogPages = document.querySelectorAll('.blog-page');
            
            pageNumbers.forEach(page => {
                page.addEventListener('click', function() {
                    // Remove active class from all pages
                    pageNumbers.forEach(p => p.classList.remove('active'));
                    
                    // Add active class to clicked page
                    this.classList.add('active');
                    
                    // Get page number
                    const pageNum = this.getAttribute('data-page');
                    
                    // Hide all blog pages
                    blogPages.forEach(page => {
                        page.style.display = 'none';
                    });
                    
                    // Show selected blog page
                    const selectedPage = document.getElementById(`page-${pageNum}`);
                    if (selectedPage) {
                        selectedPage.style.display = 'block';
                    }
                    
                    // Scroll to top of blog section
                    document.querySelector('.blog-content-section').scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        }

        // DOM ready पर function call करें
        document.addEventListener('DOMContentLoaded', function() {
            initializeBlogPagination();
        });