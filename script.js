/*import { db } from './firebase-config.js';
import { ref, set, push } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

// Test connection outside DOMContentLoaded
const testRef = ref(db, 'connection-test');
set(testRef, {
    lastAccess: new Date().toISOString(),
    status: 'connected'
});
*/
document.addEventListener('DOMContentLoaded', () => {
    // Popup Elements
    const plusIcon = document.querySelector('.plus-icon');
    const overlay = document.getElementById('overlay');
    const bioPopup = document.getElementById('bioPopup');
    const transportPopup = document.getElementById('transportPopup');
    const dreamPopup = document.getElementById('dreamPopup');
    const closeButtons = document.querySelectorAll('.close-btn');

    // Drag and Drop Elements
    const draggable = document.getElementById('draggable');
    const dropZone = document.getElementById('drop-zone');

    // Touch Event Handlers
    draggable.addEventListener('touchstart', handleTouchStart, { passive: false });
    draggable.addEventListener('touchmove', handleTouchMove, { passive: false });
    draggable.addEventListener('touchend', handleTouchEnd);

    function handleTouchStart(e) {
        e.preventDefault();
        draggable.classList.add('dragging');
    }

    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const newX = touch.clientX - draggable.offsetWidth / 2;
        draggable.style.left = `${newX}px`;
    }

    function handleTouchEnd() {
        draggable.classList.remove('dragging');
        const dropRect = dropZone.getBoundingClientRect();
        const dragRect = draggable.getBoundingClientRect();

        if (isOverlapping(dragRect, dropRect)) {
            dropZone.appendChild(draggable);
            draggable.style.position = 'relative';
            draggable.style.left = '0';
            draggable.style.top = '0';
        }
    }

    function isOverlapping(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    // Drag and Drop Functionality
    draggable.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', 'draggable');
        draggable.classList.add('dragging');
    });

    dropZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        dropZone.classList.add('hover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('hover');
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        if (data === 'draggable') {
            dropZone.appendChild(draggable);
            draggable.style.position = 'absolute';
            draggable.style.left = '0';
            draggable.style.top = '0';
            draggable.style.right = 'auto';
            draggable.style.width = 'auto';
            draggable.style.height = '100%';
            draggable.style.transform = 'none';
        }
        dropZone.classList.remove('hover');
        draggable.classList.remove('dragging');
    });

    // Popup Functionality
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const popup = button.parentElement;
            if (popup.classList.contains('answer-popup')) {
                popup.classList.remove('show');
                setTimeout(() => {
                    popup.style.display = 'none';
                    overlay.style.display = 'none';
                }, 500);
            } else {
                overlay.style.display = 'none';
                popup.style.display = 'none';
            }
        });
    });

    plusIcon.addEventListener('click', () => {
        overlay.style.display = 'block';
        bioPopup.style.display = 'block';
    });

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        bioPopup.style.display = 'none';
        transportPopup.style.display = 'none';
        dreamPopup.style.display = 'none';
    });
});

