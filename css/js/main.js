// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items and about section
document.querySelectorAll('.gallery-item, .about').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===== SPOTLIGHT & 3D TILT EFFECT ON GALLERY ITEMS =====
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update spotlight effect
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
        
        // 3D Tilt effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotationX = ((y - centerY) / centerY) * 20;
        const rotationY = ((centerX - x) / centerX) * 20;
        
        this.style.transform = `perspective(800px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(1.08)`;
    });

    item.addEventListener('mouseleave', function() {
        // Reset spotlight
        this.style.setProperty('--mouse-x', '50%');
        this.style.setProperty('--mouse-y', '50%');
        
        // Reset 3D tilt and return to normal scale
        this.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});
