document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
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
    const dropZone = document.getElementById('drop-zone');
    
    let isDragging = false;
    let currentX;
    let initialX;
    let xOffset = 0;

    // Make draggable responsive to screen size
    function updateInitialPosition() {
        const screenWidth = window.innerWidth;
        const initialPosition = screenWidth > 768 ? 0 : -50; // Adjust based on screen size
        draggable.style.transform = `translateX(${initialPosition}px) translateY(-50%)`;
    }

    // Call on load and resize
    updateInitialPosition();
    window.addEventListener('resize', updateInitialPosition);
    
    function setTranslate(xPos) {
        draggable.style.transform = `translateX(${xPos}px) translateY(-50%)`;
    }

    function dragStart(e) {
        initialX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        xOffset = extractX(draggable.style.transform);
        isDragging = true;
        draggable.style.transition = 'none';
        draggable.style.cursor = 'grabbing';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const xPos = currentX - initialX + xOffset;
        
        // Add visual feedback during dragging
        draggable.style.transition = 'none';
        setTranslate(xPos);
        
        const draggableRect = draggable.getBoundingClientRect();
        const dropZoneRect = dropZone.getBoundingClientRect();
        
        if (isInDropZone(draggableRect, dropZoneRect)) {
            isDragging = false;
            draggable.style.transition = 'transform 0.3s ease-out';
            snapToDropZone();
            createSparkles(draggable);
        }
    }

    function dragEnd() {
        isDragging = false;
        draggable.style.cursor = 'grab';
        draggable.style.transition = 'transform 0.3s ease-out';
    }

    function extractX(transform) {
        const match = transform.match(/translateX\(([-\d.]+)px\)/);
        return match ? parseFloat(match[1]) : 0;
    }

    function isInDropZone(dragRect, dropRect) {
        const overlap = !(dragRect.right < dropRect.left || 
                         dragRect.left > dropRect.right || 
                         dragRect.bottom < dropRect.top || 
                         dragRect.top > dropRect.bottom);
        
        if (overlap) {
            dropZone.style.borderColor = '#FFD700';
        } else {
            dropZone.style.borderColor = 'transparent';
        }
        
        return overlap;
    }

    function snapToDropZone() {
        const screenWidth = window.innerWidth;
        const snapPosition = screenWidth > 768 ? -200 : -150; // Responsive snap position
        draggable.style.transition = 'transform 0.3s ease-out';
        setTranslate(snapPosition);
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

    // Touch Events for dragging
    draggable.addEventListener('touchstart', dragStart, false);
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', dragEnd, false);

    // Mouse Events for dragging
    draggable.addEventListener('mousedown', dragStart, false);
    document.addEventListener('mousemove', drag, false);
    document.addEventListener('mouseup', dragEnd, false);
});
