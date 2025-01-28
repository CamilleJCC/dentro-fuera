document.addEventListener('DOMContentLoaded', () => {
    const artwork = document.querySelector('.artwork');
    const inputs = document.querySelectorAll('.magic-input');
    const plusBtn = document.getElementById('plusBtn');
    const bioPopup = document.getElementById('bioPopup');
    const plusPopup = document.getElementById('tooltipText');
    const overlay = document.getElementById('overlay');
    const closeButtons = document.querySelectorAll('.close-btn');
    const tooltipText = document.querySelector('.tooltip-text');
    const artistName = document.querySelector('.semibold');
    const bioBtn = document.getElementById('bioBtn');
    const draggable = document.getElementById('draggable');
    let isInOriginalPosition = true;

    function moveElement() {
        const screenWidth = window.innerWidth;
        let targetPosition;
        
        if (isInOriginalPosition) {
            // Move to drop zone
            if (screenWidth > 1200) {
                targetPosition = -258;
            } else if (screenWidth > 768) {
                targetPosition = -220;
            } else if (screenWidth > 480) {
                targetPosition = -180;
            } else {
                targetPosition = -150;
            }
        } else {
            // Move back to start
            if (screenWidth > 1200) {
                targetPosition = 0;
            } else if (screenWidth > 768) {
                targetPosition = 220;
            } else if (screenWidth > 480) {
                targetPosition = 180;
            } else {
                targetPosition = 150;
            }
        }

        draggable.style.transition = 'transform 0.6s ease-in-out';
        draggable.style.transform = `translateX(${targetPosition}px) translateY(-50%)`;
        
        if (isInOriginalPosition) {
            createSparkles(draggable);
        }
        
        isInOriginalPosition = !isInOriginalPosition;
    }

    function createSparkles(element) {
        const rect = element.getBoundingClientRect();
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            const x = Math.random() * rect.width;
            const y = Math.random() * rect.height;
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 50%)`;
            element.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1500);
        }
    }

    // Bio button functionality
    bioBtn.addEventListener('click', () => {
        overlay.style.display = 'block';
        bioPopup.style.display = 'block';
    });

    // Plus button functionality
    plusBtn.addEventListener('click', () => {
        if (tooltipText.style.visibility === 'visible') {
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.display = 'none';
        } else {
            tooltipText.style.visibility = 'visible';
            tooltipText.style.display = 'block';
        }
    });

    // Artist name click
    artistName.addEventListener('click', () => {
        overlay.style.display = 'block';
        bioPopup.style.display = 'block';
    });

    // Close buttons functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.closest('.popup');
            overlay.style.display = 'none';
            popup.style.display = 'none';
        });
    });

    // Close tooltip when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.matches('#plusBtn') && !e.target.closest('.tooltip-text')) {
            tooltipText.style.visibility = 'hidden';
            tooltipText.style.display = 'none';
        }
    });

    // Handle both click and touch events for draggable
    draggable.addEventListener('click', moveElement);
    draggable.addEventListener('touchend', (e) => {
        e.preventDefault();
        moveElement();
    });

    // Set initial position
    const screenWidth = window.innerWidth;
    let initialPosition;
    
    if (screenWidth > 1200) {
        initialPosition = 258;
    } else if (screenWidth > 768) {
        initialPosition = 220;
    } else if (screenWidth > 480) {
        initialPosition = 180;
    } else {
        initialPosition = 150;
    }
    
    draggable.style.transform = `translateX(${initialPosition}px) translateY(-50%)`;
});
