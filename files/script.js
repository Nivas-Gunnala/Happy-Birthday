// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Hamburger animation
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Confetti Animation
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];
let isConfettiActive = false;

class ConfettiParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
    }

    getRandomColor() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff8787', '#a8e6cf', '#ffd3b6'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

function createConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new ConfettiParticle());
    }
}

function animateConfetti() {
    if (!isConfettiActive) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    confettiParticles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateConfetti);
}

function startConfetti(duration = 5000) {
    if (!isConfettiActive) {
        isConfettiActive = true;
        createConfetti();
        animateConfetti();
        
        setTimeout(() => {
            isConfettiActive = false;
            confettiParticles = [];
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, duration);
    }
}

// Celebrate Button
const celebrateBtn = document.getElementById('celebrateBtn');
celebrateBtn.addEventListener('click', () => {
    startConfetti(8000);
    celebrateBtn.textContent = '🎊 Celebrating! 🎊';
    setTimeout(() => {
        celebrateBtn.textContent = '🎉 Let\'s Celebrate! 🎉';
    }, 8000);
});

// Smooth scroll observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and timeline items
document.querySelectorAll('.card, .timeline-item, .wish-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Birthday Cake Interactive Candles
const candles = document.querySelectorAll('.candle');
const wishMessage = document.getElementById('wishMessage');
let litCandles = 3;

candles.forEach(candle => {
    candle.addEventListener('click', () => {
        if (candle.dataset.lit === 'true') {
            candle.dataset.lit = 'false';
            litCandles--;
            
            // Play blow sound effect (optional)
            const blowSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBj2R1/LMeSsGKHnJ7uCQQAoUXrTp66hVFApGn+DyvmwhBj2R1/LMeSsGKHnJ7uCQQAoUXrTp66hVFApGn+DyvmwhBj2R1/LMeSsGKHnJ7t+QPwoTXrPo7KlWFApGnt/xwG4iBjyP1fDNezwKLHrJ7t6OPwoSXbPo7KpYFglFnN7ww3MkBzyQ1/HNezwKLHrJ7t6OPwoSXbPo7KpYFglFnN7ww3MkBzyQ1/HNezwKLHrJ7t6OPwoSXbPo7KpYFglFnN7ww3MkBzyQ1/HNezwKLHrJ7t6OPwoSXbPo7KpYFglFnN7ww3MkBzyQ1/HNezwKLHrJ7t6OPwAAAA==');
            
            if (litCandles === 0) {
                wishMessage.textContent = '🎉 Happy Birthday! Your wish will come true! 🎉';
                startConfetti(6000);
                
                // Relight candles after 3 seconds
                setTimeout(() => {
                    candles.forEach(c => c.dataset.lit = 'true');
                    litCandles = 3;
                    wishMessage.textContent = '';
                }, 3000);
            }
        }
    });
});

// Gallery Lightbox Effect
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Add lightbox styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            .lightbox-content img {
                max-width: 100%;
                max-height: 90vh;
                border-radius: 10px;
            }
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 40px;
                color: white;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .lightbox-close:hover {
                transform: scale(1.2);
            }
        `;
        document.head.appendChild(style);
        
        // Close lightbox
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.className === 'lightbox-close') {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                    document.head.removeChild(style);
                }, 300);
            }
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Auto-start confetti on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        startConfetti(5000);
    }, 500);
});

// Handle window resize for confetti canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Add floating animation to cards
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
});

// Add CSS for float animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatStyle);

// Easter egg: Click on footer for surprise
let clickCount = 0;
const footer = document.querySelector('.footer');
footer.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 3) {
        startConfetti(10000);
        const messages = [
            "Dad, you're the best! 💖",
            "We love you so much! 🌟",
            "Thank you for everything! 🙏",
            "You make every day special! ✨",
            "You're our superhero! 🦸‍♂️"
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem;
            border-radius: 20px;
            font-size: 2rem;
            text-align: center;
            z-index: 10001;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: bounceIn 0.5s ease;
        `;
        popup.textContent = randomMessage;
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                document.body.removeChild(popup);
            }, 500);
        }, 3000);
        
        clickCount = 0;
    }
});

// Add bounce animation
const bounceStyle = document.createElement('style');
bounceStyle.textContent = `
    @keyframes bounceIn {
        0% {
            transform: translate(-50%, -50%) scale(0);
        }
        50% {
            transform: translate(-50%, -50%) scale(1.1);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(bounceStyle);

// Console message
console.log('%c🎉 Happy Birthday Dad! 🎉', 'font-size: 24px; color: #ff6b6b; font-weight: bold;');
console.log('%cThis website was made with love ❤️', 'font-size: 16px; color: #4ecdc4;');
