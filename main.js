// Rating tabs functionality
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

        // Smooth scroll
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

        // Testimonial slider functionality
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