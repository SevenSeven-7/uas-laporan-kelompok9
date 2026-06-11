document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const progressBar = document.getElementById('progressBar');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlides() {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update Progress Bar
        const progress = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }

    function goToNextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlides();
        }
    }

    function goToPrevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlides();
        }
    }

    // Touch / Swipe Navigation for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimum distance to be considered a swipe

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const distance = touchEndX - touchStartX;
        
        // Swipe Left (Go to Next Slide)
        if (distance < -swipeThreshold) {
            goToNextSlide();
        }
        // Swipe Right (Go to Prev Slide)
        if (distance > swipeThreshold) {
            goToPrevSlide();
        }
    }

    // Keyboard navigation (Including Home and End)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown' || e.key === 'End') {
            goToNextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Home') {
            goToPrevSlide();
        }
    });

    // Initialize first slide
    updateSlides();

    // Scale presentation to fit any screen (True Responsive Landscape)
    function resizePresentation() {
        const container = document.getElementById('presentation');
        if (!container) return;
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        // Base presentation size (16:9 ratio)
        const baseWidth = 1280;
        const baseHeight = 720;
        
        // Calculate scale to fit both width and height perfectly without overflowing
        const scaleX = windowWidth / baseWidth;
        const scaleY = windowHeight / baseHeight;
        
        // Use the smallest scale to ensure it fits entirely inside the screen
        const scale = Math.min(scaleX, scaleY) * 0.98; // 0.98 gives a tiny 1% margin on edges
        
        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    // Run on load and whenever window resizes
    window.addEventListener('resize', resizePresentation);
    resizePresentation();
});
