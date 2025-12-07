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
    document.addEventListener('DOMContentLoaded', function () {
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
        window.addEventListener('resize', function () {
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
window.addEventListener('load', function () {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
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
        page.addEventListener('click', function () {
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
document.addEventListener('DOMContentLoaded', function () {
    initializeBlogPagination();
});

// Comment Form Functionality
document.addEventListener('DOMContentLoaded', function () {
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    // Function to get random avatar image from Unsplash
function getRandomAvatar() {
    // Unsplash random people images (square format, faces)
    const unsplashImages = [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face'
    ];
    return unsplashImages[Math.floor(Math.random() * unsplashImages.length)];
}

    // Function to format current date
    function getCurrentDate() {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return now.toLocaleDateString('en-US', options);
    }

    // Handle form submission
    if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const contact = document.getElementById('contact').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Create new comment element
            const newComment = document.createElement('div');
            newComment.className = 'comment-item new-comment';

            // Create avatar div with random image
            const avatarUrl = getRandomAvatar();
            newComment.innerHTML = `
    <div class="comment-header">
        <div class="comment-avatar" style="background-image: url('${avatarUrl}')"></div>
        <div class="comment-author">
            <h5>${firstName} ${lastName}</h5>  <!-- सिर्फ नाम -->
            <span class="comment-date">${getCurrentDate()}</span> <!-- सिर्फ date -->
        </div>
    </div>
    <p class="comment-text">${message}</p>
`;

            // Add new comment to the top of the list
            commentsList.insertBefore(newComment, commentsList.firstChild);

            // Scroll to show new comment
            newComment.scrollIntoView({ behavior: 'smooth' });

            // Reset form
            commentForm.reset();

            // Show success message
            showNotification('Your comment has been posted successfully!');
        });
    }

    // Function to show notification
    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification-alert');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification-alert';
        notification.innerHTML = `
            <div style="position: fixed; top: 100px; right: 20px; background: var(--primary-orange); color: white; padding: 15px 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 9999; animation: slideInRight 0.3s ease-out;">
                <i class="fas fa-check-circle me-2"></i> ${message}
            </div>
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Add CSS for notification animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-alert {
            animation: slideInRight 0.3s ease-out;
        }
    `;
    document.head.appendChild(style);

    // Make both columns equal height
    function setEqualHeight() {
        const columns = document.querySelectorAll('.comment-column');
        let maxHeight = 0;

        // Reset heights first
        columns.forEach(col => {
            col.style.height = 'auto';
        });

        // Find max height
        columns.forEach(col => {
            if (col.offsetHeight > maxHeight) {
                maxHeight = col.offsetHeight;
            }
        });

        // Set equal height
        if (window.innerWidth >= 992) { // Only on desktop
            columns.forEach(col => {
                col.style.height = maxHeight + 'px';
            });
        } else {
            columns.forEach(col => {
                col.style.height = 'auto';
            });
        }
    }

    // Set equal height on load and resize
    window.addEventListener('load', setEqualHeight);
    window.addEventListener('resize', setEqualHeight);

    // Initialize with sample comments (for demonstration)
    function addSampleComments() {
        const sampleComments = [
            {
                name: "Priya Sharma",
                date: "15 June 2023",
                comment: "Great blog post! Really enjoyed reading it.",
                avatar: "https://i.pravatar.cc/150?img=11"
            },
            {
                name: "Rahul Verma",
                date: "10 June 2023",
                comment: "Very informative article. Learned a lot from this.",
                avatar: "https://i.pravatar.cc/150?img=12"
            },
            {
                name: "Sneha Kapoor",
                date: "5 June 2023",
                comment: "Looking forward to more posts like this!",
                avatar: "https://i.pravatar.cc/150?img=13"
            }
        ];

        // Add sample comments to the list
        sampleComments.forEach(sample => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar" style="background-image: url('${sample.avatar}')"></div>
                    <div class="comment-author">
                        <h5>${sample.name}</h5>
                        <span class="comment-date">${sample.date}</span>
                    </div>
                </div>
                <p class="comment-text">${sample.comment}</p>
            `;
            commentsList.appendChild(commentElement);
        });
    }

    // Uncomment below line if you want to add more sample comments
    // addSampleComments();
});

// Product Data with Local Images
        const allProducts = [
            {
                id: 1,
                title: "Elegant Evening Dress",
                price: 2000,
                category: "Female",
                sizes: ["S", "M", "L"],
                rating: 4.9,
                image: "img/western.png",
                isNew: true,
                page: "product_details_dress.html"
            },
            {
                id: 2,
                title: "Floral Summer Dress",
                price: 2500,
                category: "Female",
                sizes: ["M", "L", "XL"],
                rating: 4.8,
                image: "img/img_dress.png",
                isNew: false,
                page: "product_details_summer_dress.html"
            },
            {
                id: 3,
                title: "Casual Party Wear",
                price: 2000,
                category: "Female",
                sizes: ["S", "M"],
                rating: 4.9,
                image: "img/img_western.png",
                isNew: true,
                page: "product_details_party_wear.html"
            },
            {
                id: 4,
                title: "Designer Saree",
                price: 3500,
                category: "Female",
                sizes: ["M", "L", "XL"],
                rating: 4.9,
                image: "img/saree.png",
                isNew: false,
                page: "product_details_saree.html"
            },
            {
                id: 5,
                title: "Traditional Lehenga",
                price: 4500,
                category: "Female",
                sizes: ["S", "M", "L"],
                rating: 4.8,
                image: "img/navratri.png",
                isNew: true,
                page: "product_details_lehenga.html"
            },
            {
                id: 6,
                title: "Modern Ethnic Wear",
                price: 2800,
                category: "Female",
                sizes: ["M", "L", "XL"],
                rating: 4.9,
                image: "img/gown.png",
                isNew: false,
                page: "product_details_ethnic_wear.html"
            },
            {
                id: 7,
                title: "Bridal Lehenga",
                price: 5500,
                category: "Female",
                sizes: ["S", "M"],
                rating: 5.0,
                image: "img/fe1.png",
                isNew: true,
                page: "product_details_bridal.html"
            },
            {
                id: 8,
                title: "Office Formal Suit",
                price: 3200,
                category: "Male",
                sizes: ["M", "L", "XL"],
                rating: 4.7,
                image: "img/img_ankit.png",
                isNew: false,
                page: "product_details_suit.html"
            },
            {
                id: 9,
                title: "Silk Saree",
                price: 4200,
                category: "Female",
                sizes: ["S", "M", "L"],
                rating: 4.9,
                image: "img/fe6.png",
                isNew: true,
                page: "product_details_silk_saree.html"
            },
            {
                id: 10,
                title: "Kids Casual Dress",
                price: 1500,
                category: "Kids",
                sizes: ["S", "M"],
                rating: 4.5,
                image: "img/kids_dress.jpg",
                isNew: true,
                page: "product_details_kids_dress.html"
            },
            {
                id: 11,
                title: "Gold Necklace Set",
                price: 8000,
                category: "Jewellery",
                sizes: ["One Size"],
                rating: 4.9,
                image: "img/jewellery1.jpg",
                isNew: false,
                page: "product_details_necklace.html"
            },
            {
                id: 12,
                title: "Men's Formal Suit",
                price: 3800,
                category: "Male",
                sizes: ["M", "L", "XL"],
                rating: 4.6,
                image: "img/me2.png",
                isNew: true,
                page: "product_details_formal_suit.html"
            },
            {
                id: 13,
                title: "Diamond Earrings",
                price: 6500,
                category: "Jewellery",
                sizes: ["One Size"],
                rating: 4.8,
                image: "img/jewellery2.jpg",
                isNew: true,
                page: "product_details_earrings.html"
            },
            {
                id: 14,
                title: "Kids Party Wear",
                price: 1800,
                category: "Kids",
                sizes: ["S", "M", "L"],
                rating: 4.4,
                image: "img/kids_jeans.jpg",
                isNew: false,
                page: "product_details_kids_party.html"
            },
            {
                id: 15,
                title: "Men's Traditional",
                price: 2200,
                category: "Male",
                sizes: ["S", "M", "L", "XL"],
                rating: 4.3,
                image: "img/me5.png",
                isNew: true,
                page: "product_details_shirt.html"
            },
            {
                id: 16,
                title: "Bridal Jewellery Set",
                price: 12000,
                category: "Jewellery",
                sizes: ["One Size"],
                rating: 5.0,
                image: "img/jewellery3.jpg",
                isNew: true,
                page: "product_details_bridal_jewellery.html"
            },
            {
                id: 17,
                title: "Kids Winter Jacket",
                price: 2800,
                category: "Kids",
                sizes: ["S", "M"],
                rating: 4.7,
                image: "img/kid5.jpg",
                isNew: false,
                page: "product_details_kids_jacket.html"
            },
            {
                id: 18,
                title: "Silver Bracelet",
                price: 3500,
                category: "Jewellery",
                sizes: ["One Size"],
                rating: 4.6,
                image: "img/jw4.png",
                isNew: true,
                page: "product_details_bracelet.html"
            }
        ];

        // Global Variables
        let activeFilters = {
            price: [],
            category: [],
            size: [],
            sort: 'popularity'
        };
        let currentPage = 1;
        const productsPerPage = 6;
        let filteredProducts = [...allProducts];
        
        // Track cart items
        let cartItems = new Set();

        // Initialize products
        function initializeProducts() {
            filteredProducts = filterProducts();
            displayProducts();
            setupPagination();
        }

        // Filter products based on active filters
        function filterProducts() {
            return allProducts.filter(product => {
                // Price filter
                if (activeFilters.price.length > 0) {
                    const priceMatch = activeFilters.price.some(filter => {
                        switch(filter) {
                            case 'under-1000': return product.price < 1000;
                            case '1000-2000': return product.price >= 1000 && product.price <= 2000;
                            case '2000-3000': return product.price >= 2000 && product.price <= 3000;
                            case 'above-3000': return product.price > 3000;
                            default: return true;
                        }
                    });
                    if (!priceMatch) return false;
                }
                
                // Category filter
                if (activeFilters.category.length > 0) {
                    if (!activeFilters.category.includes(product.category)) {
                        return false;
                    }
                }
                
                // Size filter
                if (activeFilters.size.length > 0) {
                    const sizeMatch = activeFilters.size.some(size => product.sizes.includes(size));
                    if (!sizeMatch) return false;
                }
                
                return true;
            });
        }

        // Sort products
        function sortProducts(products) {
            return [...products].sort((a, b) => {
                switch(activeFilters.sort) {
                    case 'price-low':
                        return a.price - b.price;
                    case 'price-high':
                        return b.price - a.price;
                    case 'newest':
                        return b.isNew - a.isNew;
                    case 'popularity':
                    default:
                        return b.rating - a.rating;
                }
            });
        }

        // Display products for current page
        function displayProducts() {
            const container = document.getElementById('productsContainer');
            const noResults = document.getElementById('noResults');
            
            // Sort filtered products
            const sortedProducts = sortProducts(filteredProducts);
            
            // Calculate products for current page
            const startIndex = (currentPage - 1) * productsPerPage;
            const endIndex = startIndex + productsPerPage;
            const productsToShow = sortedProducts.slice(startIndex, endIndex);
            
            // Clear container
            container.innerHTML = '';
            
            if (productsToShow.length === 0) {
                noResults.classList.add('show');
                return;
            }
            
            noResults.classList.remove('show');
            
            // Add products to container
            productsToShow.forEach(product => {
                const productElement = createProductElement(product);
                container.appendChild(productElement);
            });
        }

        // Setup pagination - Simplified without arrows
        function setupPagination() {
            const paginationContainer = document.getElementById('productsPagination');
            const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
            
            paginationContainer.innerHTML = '';
            
            if (totalPages <= 1) {
                return;
            }
            
            // Create page numbers only (no arrows)
            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('div');
                pageButton.className = `page-number ${i === currentPage ? 'active' : ''}`;
                pageButton.textContent = i;
                pageButton.onclick = () => changePage(i);
                paginationContainer.appendChild(pageButton);
            }
        }

        // Change page
        function changePage(page) {
            currentPage = page;
            displayProducts();
            setupPagination();
            
            // Scroll to top of products section
            document.querySelector('.products-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }

        // Create product element with clickable link
        function createProductElement(product) {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6';
            col.setAttribute('data-product-id', product.id);
            
            const stars = getStarRating(product.rating);
            
            // Check if product is in cart
            const isInCart = cartItems.has(product.id);
            const cartBtnClass = isInCart ? 'cart-active' : '';
            
            // Create the entire card as a clickable link
            col.innerHTML = `
                <a href="${product.page}" class="product-link">
                    <div class="product-card">
                        <div class="product-image" style="background-image: url('${product.image}');">
                            ${product.isNew ? '<div class="badge-new" style="position: absolute; top: 15px; left: 15px; background: white; color: var(--primary-orange); padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600;">NEW</div>' : ''}
                            <div class="product-actions">
                                <button class="action-btn" onclick="event.preventDefault(); toggleWishlist(${product.id}, this)">
                                    <i class="far fa-heart"></i>
                                </button>
                                <button class="action-btn ${cartBtnClass}" onclick="event.preventDefault(); addToCart(${product.id}, this)">
                                    <i class="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${product.title}</h3>
                            <div class="size-options">
                                ${product.sizes.map(size => 
                                    `<span class="size-option" data-size="${size}" onclick="event.preventDefault(); selectSize(this)">${size}</span>`
                                ).join('')}
                            </div>
                            <div class="product-footer">
                                <div class="product-price">
                                    <span class="price-tag">₹ ${product.price}</span>
                                </div>
                                <div class="product-rating">
                                    <span class="rating-value">${product.rating}</span>
                                    <div class="stars">
                                        ${stars}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            `;
            
            return col;
        }

        // Get star rating HTML
        function getStarRating(rating) {
            let stars = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            
            for (let i = 1; i <= 5; i++) {
                if (i <= fullStars) {
                    stars += '<i class="fas fa-star"></i>';
                } else if (i === fullStars + 1 && hasHalfStar) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    stars += '<i class="far fa-star star-empty"></i>';
                }
            }
            
            return stars;
        }

        // Filter Toggle Functionality
        function toggleFilter(menuId) {
            const menu = document.getElementById(menuId);
            const allMenus = document.querySelectorAll('.filter-menu');
            
            allMenus.forEach(m => {
                if (m.id !== menuId) {
                    m.classList.remove('show');
                }
            });
            
            menu.classList.toggle('show');
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.filter-dropdown')) {
                document.querySelectorAll('.filter-menu').forEach(menu => {
                    menu.classList.remove('show');
                });
            }
        });

        // Update active filters display
        function updateActiveFiltersDisplay() {
            const activeFiltersContainer = document.getElementById('activeFilters');
            const filterStatus = document.getElementById('filterStatus');
            
            activeFiltersContainer.innerHTML = '';
            
            let hasActiveFilters = false;
            
            // Price filters
            activeFilters.price.forEach(filter => {
                hasActiveFilters = true;
                const filterText = getFilterDisplayText('price', filter);
                const filterElement = createActiveFilterElement('price', filter, filterText);
                activeFiltersContainer.appendChild(filterElement);
            });
            
            // Category filters
            activeFilters.category.forEach(filter => {
                hasActiveFilters = true;
                const filterElement = createActiveFilterElement('category', filter, filter);
                activeFiltersContainer.appendChild(filterElement);
            });
            
            // Size filters
            activeFilters.size.forEach(filter => {
                hasActiveFilters = true;
                const filterElement = createActiveFilterElement('size', filter, filter);
                activeFiltersContainer.appendChild(filterElement);
            });
            
            // Show/hide filter status
            if (hasActiveFilters) {
                filterStatus.classList.add('active');
            } else {
                filterStatus.classList.remove('active');
            }
        }

        // Get filter display text
        function getFilterDisplayText(type, value) {
            switch(type) {
                case 'price':
                    switch(value) {
                        case 'under-1000': return 'Under ₹1000';
                        case '1000-2000': return '₹1000 - ₹2000';
                        case '2000-3000': return '₹2000 - ₹3000';
                        case 'above-3000': return 'Above ₹3000';
                        default: return value;
                    }
                default:
                    return value;
            }
        }

        // Create active filter element
        function createActiveFilterElement(type, value, displayText) {
            const div = document.createElement('div');
            div.className = 'active-filter';
            div.innerHTML = `
                ${displayText}
                <span class="remove-filter" onclick="removeFilter('${type}', '${value}')">&times;</span>
            `;
            return div;
        }

        // Remove specific filter
        function removeFilter(type, value) {
            activeFilters[type] = activeFilters[type].filter(item => item !== value);
            
            // Uncheck the corresponding checkbox
            const checkboxes = document.querySelectorAll(`input[data-filter="${type}"][value="${value}"]`);
            checkboxes.forEach(cb => cb.checked = false);
            
            // Update products and pagination
            currentPage = 1;
            filteredProducts = filterProducts();
            updateActiveFiltersDisplay();
            displayProducts();
            setupPagination();
        }

        // Clear all filters
        function clearAllFilters() {
            activeFilters = {
                price: [],
                category: [],
                size: [],
                sort: 'popularity'
            };
            
            // Uncheck all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            
            // Reset sort to popularity
            document.getElementById('sort1').checked = true;
            
            // Update products and pagination
            currentPage = 1;
            filteredProducts = filterProducts();
            updateActiveFiltersDisplay();
            displayProducts();
            setupPagination();
        }

        // Initialize event listeners for filters
        function initializeFilterListeners() {
            // Checkbox filters
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const filterType = this.getAttribute('data-filter');
                    const value = this.value;
                    
                    if (this.checked) {
                        if (!activeFilters[filterType].includes(value)) {
                            activeFilters[filterType].push(value);
                        }
                    } else {
                        activeFilters[filterType] = activeFilters[filterType].filter(item => item !== value);
                    }
                    
                    // Update products and pagination
                    currentPage = 1;
                    filteredProducts = filterProducts();
                    updateActiveFiltersDisplay();
                    displayProducts();
                    setupPagination();
                });
            });
            
            // Radio filters (sort)
            document.querySelectorAll('input[name="sort"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    activeFilters.sort = this.value;
                    currentPage = 1;
                    displayProducts();
                    setupPagination();
                });
            });
        }

        // Size selection function
        function selectSize(element) {
            event.stopPropagation(); // Prevent card click
            const sizeOptions = element.parentElement.querySelectorAll('.size-option');
            sizeOptions.forEach(option => option.classList.remove('selected'));
            element.classList.add('selected');
        }

        // Wishlist functionality
        function toggleWishlist(productId, button) {
            event.stopPropagation(); // Prevent card click
            const icon = button.querySelector('i');
            
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            if (icon.classList.contains('fas')) {
                button.style.background = '#FF7E00';
                button.style.color = 'white';
                const product = allProducts.find(p => p.id === productId);
                alert(`Added "${product.title}" to wishlist!`);
            } else {
                button.style.background = 'white';
                button.style.color = '#2D2D2D';
                const product = allProducts.find(p => p.id === productId);
                alert(`Removed "${product.title}" from wishlist!`);
            }
        }

        // Cart functionality - FIXED
        function addToCart(productId, button) {
            event.stopPropagation(); // Prevent card click
            const product = allProducts.find(p => p.id === productId);
            
            if (cartItems.has(productId)) {
                // Remove from cart
                cartItems.delete(productId);
                button.classList.remove('cart-active');
                button.style.background = 'white';
                button.style.color = '#2D2D2D';
                alert(`Removed "${product.title}" from cart!`);
            } else {
                // Add to cart
                cartItems.add(productId);
                button.classList.add('cart-active');
                button.style.background = '#FF7E00';
                button.style.color = 'white';
                alert(`Added "${product.title}" to cart!`);
            }
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initializeProducts();
            initializeFilterListeners();
        });