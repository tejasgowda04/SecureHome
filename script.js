// Header functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileCloseBtn = document.querySelector('.mobile-close-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileCloseBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Project popup functionality
function initProjectPopups() {
    const projectCards = document.querySelectorAll('.project-card');
    const popup = document.getElementById('projectPopup');
    const popupClose = document.querySelector('.popup-close');
    const popupTitle = document.getElementById('popupTitle');
    const popupImage = document.getElementById('popupImage');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const thumbnailsContainer = document.querySelector('.popup-thumbnails');

    // Project data with images
    const projectData = {
        project1: {
            title: "Mandya",
            images: ['h1.jpg', 'h2.jpg', 'h3.jpg', 'h4.jpg', 'h5.jpg']
        },
        project2: {
            title: "Pandavapure",
            images: ['h6.jpg', 'h7.jpg', 'h8.jpg', 'h9.jpg', 'h10.jpg']
        },
        project3: {
            title: "Mysore",
            images: ['h11.jpg', 'h12.jpg', 'h13.jpg', 'h14.jpg', 'h15.jpg']
        }
    };

    let currentProject = null;
    let currentImageIndex = 0;

    // Open popup when project card is clicked
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open popup if view more button was clicked
            if (e.target.classList.contains('btn-view-more') || e.target.closest('.btn-view-more')) {
                return;
            }
            
            const projectId = card.getAttribute('data-project');
            openPopup(projectId);
        });

        // Add click event for view more button
        const viewMoreBtn = card.querySelector('.btn-view-more');
        viewMoreBtn.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openPopup(projectId);
        });
    });

    // Close popup
    popupClose.addEventListener('click', closePopup);
    popup.addEventListener('click', (e) => {
        if (e.target === popup || e.target.classList.contains('popup-overlay')) {
            closePopup();
        }
    });

    // Navigation
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!popup.classList.contains('active')) return;
        
        if (e.key === 'Escape') closePopup();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    function openPopup(projectId) {
        currentProject = projectData[projectId];
        currentImageIndex = 0;
        
        if (!currentProject) return;
        
        popupTitle.textContent = currentProject.title;
        totalImagesSpan.textContent = currentProject.images.length;
        
        updatePopupImage();
        createThumbnails();
        updateNavigation();
        
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        currentProject = null;
        currentImageIndex = 0;
    }

    function showPrevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updatePopupImage();
            updateNavigation();
            updateActiveThumbnail();
        }
    }

    function showNextImage() {
        if (currentProject && currentImageIndex < currentProject.images.length - 1) {
            currentImageIndex++;
            updatePopupImage();
            updateNavigation();
            updateActiveThumbnail();
        }
    }

    function updatePopupImage() {
        if (currentProject) {
            popupImage.src = currentProject.images[currentImageIndex];
            currentImageSpan.textContent = currentImageIndex + 1;
        }
    }

    function updateNavigation() {
        prevBtn.disabled = currentImageIndex === 0;
        nextBtn.disabled = currentImageIndex === currentProject.images.length - 1;
    }

    function createThumbnails() {
        thumbnailsContainer.innerHTML = '';
        
        if (currentProject) {
            currentProject.images.forEach((image, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = `thumbnail ${index === currentImageIndex ? 'active' : ''}`;
                thumbnail.innerHTML = `<img src="${image}" alt="Thumbnail ${index + 1}">`;
                
                thumbnail.addEventListener('click', () => {
                    currentImageIndex = index;
                    updatePopupImage();
                    updateNavigation();
                    updateActiveThumbnail();
                });
                
                thumbnailsContainer.appendChild(thumbnail);
            });
        }
    }

    function updateActiveThumbnail() {
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }
}

// Initialize project popups when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize project popups if they exist on the page
    if (document.querySelector('.project-card')) {
        initProjectPopups();
    }
});
