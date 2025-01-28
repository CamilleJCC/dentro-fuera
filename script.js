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

    // Set initial position
    draggable.style.transform = 'translateX(0px) translateY(-50%)';
    
    function setTranslate(xPos) {
        draggable.style.transform = `translateX(${xPos}px) translateY(-50%)`;
    }

    function dragStart(e) {
        initialX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        xOffset = extractX(draggable.style.transform);
        isDragging = true;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const xPos = currentX - initialX + xOffset;
        
        setTranslate(xPos);
        
        const draggableRect = draggable.getBoundingClientRect();
        const dropZoneRect = dropZone.getBoundingClientRect();
        
        if (isInDropZone(draggableRect, dropZoneRect)) {
            isDragging = false;
            snapToDropZone(dropZoneRect);
            createSparkles(draggable);
        }
    }

    function dragEnd() {
        isDragging = false;
    }

    function extractX(transform) {
        const match = transform.match(/translateX\(([-\d.]+)px\)/);
        return match ? parseFloat(match[1]) : 0;
    }

    function isInDropZone(dragRect, dropRect) {
        return !(dragRect.right < dropRect.left || 
                dragRect.left > dropRect.right || 
                dragRect.bottom < dropRect.top || 
                dragRect.top > dropRect.bottom);
    }

    function snapToDropZone(dropRect) {
        const xPos = dropRect.left - draggable.offsetLeft;
        setTranslate(xPos);
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
    document.addEventListener('touchmove', drag, false);
    document.addEventListener('touchend', dragEnd, false);

    // Mouse Events for dragging
    draggable.addEventListener('mousedown', dragStart, false);
    document.addEventListener('mousemove', drag, false);
    document.addEventListener('mouseup', dragEnd, false);
});
