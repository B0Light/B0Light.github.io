// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const maxHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    document.querySelector('.scroll-progress').style.width = progress + '%';
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe skill cards and project cards
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    observer.observe(card);
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            // HTML 태그 처리
            if (text.charAt(i) === '<') {
                let tagEnd = text.indexOf('>', i);
                if (tagEnd !== -1) {
                    element.innerHTML += text.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                } else {
                    element.innerHTML += text.charAt(i);
                    i++;
                }
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const originalText = heroTitle.innerHTML;
    typeWriter(heroTitle, originalText, 100);
});





// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});



// Add dynamic greeting based on time
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    let greeting = '';
    if (hour < 12) {
        greeting = '좋은 아침입니다! ';
    } else if (hour < 18) {
        greeting = '좋은 오후입니다! ';
    } else {
        greeting = '좋은 저녁입니다! ';
    }
    
    heroSubtitle.textContent = greeting + '게임개발자 장보광입니다. 게임 개발자 & 게임 디자이너';
}

// Update greeting on load
window.addEventListener('load', updateGreeting);



// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const sections = ['home', 'about', 'skills', 'projects', 'contact'];
    const currentSection = getCurrentSection();
    let currentIndex = sections.indexOf(currentSection);
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentIndex < sections.length - 1) {
            document.getElementById(sections[currentIndex + 1]).scrollIntoView({
                behavior: 'smooth'
            });
        }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentIndex > 0) {
            document.getElementById(sections[currentIndex - 1]).scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            current = section.id;
        }
    });
    
    return current;
}

// Update active navigation link
window.addEventListener('scroll', () => {
    const current = getCurrentSection();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Animate elements on load
    const animateElements = document.querySelectorAll('.skill-card, .project-card');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add scroll-triggered animations for skill bars
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        if (!card.querySelector('.skill-bar')) {
            const skillBar = document.createElement('div');
            skillBar.className = 'skill-bar';
            skillBar.innerHTML = `
                <div class="skill-progress"></div>
            `;
            card.appendChild(skillBar);
        }
    });
}

// Initialize skill bars
animateSkillBars();

// Set random progress for skill bars
document.querySelectorAll('.skill-progress').forEach((bar, index) => {
    const progress = 70 + Math.random() * 25; // 70-95%
    bar.style.setProperty('--progress', progress + '%');
});

// Trigger skill bar animations when in view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                setTimeout(() => {
                    progressBar.style.width = progressBar.style.getPropertyValue('--progress');
                }, 300);
            }
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillsObserver.observe(card);
});

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    const body = document.body;
    body.style.filter = 'hue-rotate(180deg) saturate(1.5)';
    
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 50);
    }
    
    setTimeout(() => {
        body.style.filter = '';
    }, 3000);
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.zIndex = '10000';
    confetti.style.borderRadius = '50%';
    
    document.body.appendChild(confetti);
    
    const animation = confetti.animate([
        { 
            transform: 'translateY(0) rotate(0deg)',
            opacity: 1
        },
        { 
            transform: `translateY(${window.innerHeight + 100}px) rotate(720deg)`,
            opacity: 0
        }
    ], {
        duration: Math.random() * 2000 + 1000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => {
        confetti.remove();
    };
}

// Add theme toggle functionality
function addThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        backdrop-filter: blur(10px);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('click', toggleTheme);
    document.body.appendChild(themeToggle);
}

function toggleTheme() {
    const root = document.documentElement;
    const body = document.body;
    const isDark = root.style.getPropertyValue('--primary-bg') !== '#ffffff';
    
    if (isDark) {
        // Light theme - 하양-보라 조합
        root.style.setProperty('--primary-bg', '#ffffff');
        root.style.setProperty('--secondary-bg', '#f8f9fa');
        root.style.setProperty('--text-primary', '#333333');
        root.style.setProperty('--text-secondary', '#666666');
        root.style.setProperty('--accent-color', '#8b5cf6'); // 보라색
        root.style.setProperty('--accent-secondary', '#a855f7'); // 보조 보라색
        root.style.setProperty('--card-bg', 'rgba(139, 92, 246, 0.05)'); // 보라색 배경
        root.style.setProperty('--border-color', 'rgba(139, 92, 246, 0.1)'); // 보라색 테두리
        root.style.setProperty('--gradient', 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)'); // 보라색 그라데이션
        body.setAttribute('data-theme', 'light');
        
        // 테마 토글 버튼 아이콘 변경
        const themeToggle = document.querySelector('button[style*="fixed"]');
        if (themeToggle) {
            themeToggle.innerHTML = '☀️';
        }
    } else {
        // Dark theme (default) - 검정-녹색 조합
        root.style.setProperty('--primary-bg', '#0a0a0a');
        root.style.setProperty('--secondary-bg', '#1a1a1a');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#a0a0a0');
        root.style.setProperty('--accent-color', '#00ff88'); // 녹색
        root.style.setProperty('--accent-secondary', '#ff6b6b'); // 보조 색상
        root.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.05)');
        root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.1)');
        root.style.setProperty('--gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
        body.setAttribute('data-theme', 'dark');
        
        // 테마 토글 버튼 아이콘 변경
        const themeToggle = document.querySelector('button[style*="fixed"]');
        if (themeToggle) {
            themeToggle.innerHTML = '🌙';
        }
    }
}

// Initialize theme toggle
addThemeToggle();

// Set initial theme to dark
document.body.setAttribute('data-theme', 'dark');

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perf = performance.getEntriesByType('navigation')[0];
            console.log(`페이지 로드 시간: ${perf.loadEventEnd - perf.loadEventStart}ms`);
        }, 0);
    });
}

// Add accessibility improvements
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('click', () => {
    document.body.classList.remove('keyboard-navigation');
});

// 3D Project Carousel
class ProjectCarousel {
    constructor() {
        this.currentIndex = 0; // 첫 번째 카드부터 시작 (STEALALIVE)
        this.cards = document.querySelectorAll('.project-card-3d');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
    }
    
    init() {
        // 네비게이션 버튼 이벤트
        this.prevBtn.addEventListener('click', () => this.goToPrev());
        this.nextBtn.addEventListener('click', () => this.goToNext());
        
        // 인디케이터 클릭 이벤트
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // 카드 클릭 이벤트
        this.cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (index !== this.currentIndex) {
                    this.goToSlide(index);
                }
            });
        });
        
        // 키보드 이벤트
        document.addEventListener('keydown', (e) => {
            if (this.isInProjectSection()) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    this.goToPrev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    this.goToNext();
                }
            }
        });
        
        // 초기 상태 설정
        this.updateCarousel();
        
        // 터치 이벤트 (모바일 지원)
        this.initTouchEvents();
        
        // 창 크기 변경 시 업데이트
        window.addEventListener('resize', () => {
            this.updateCarousel();
        });
    }
    
    isInProjectSection() {
        const projectSection = document.getElementById('projects');
        const rect = projectSection.getBoundingClientRect();
        return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
    }
    
    goToPrev() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.updateCarousel();
    }
    
    goToNext() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        
        // 반응형 위치값 계산
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        let positions;
        if (isSmallMobile) {
            positions = {
                right1: { x: 120, z: -80, y: -20, scale: 0.5 },
                right2: { x: 200, z: -120, y: -30, scale: 0.3 },
                left1: { x: -120, z: -80, y: 20, scale: 0.5 },
                left2: { x: -200, z: -120, y: 30, scale: 0.3 }
            };
        } else if (isMobile) {
            positions = {
                right1: { x: 200, z: -100, y: -25, scale: 0.6 },
                right2: { x: 350, z: -200, y: -40, scale: 0.4 },
                left1: { x: -200, z: -100, y: 25, scale: 0.6 },
                left2: { x: -350, z: -200, y: 40, scale: 0.4 }
            };
        } else {
            positions = {
                right1: { x: 320, z: -150, y: -35, scale: 0.7 },
                right2: { x: 600, z: -300, y: -50, scale: 0.5 },
                left1: { x: -320, z: -150, y: 35, scale: 0.7 },
                left2: { x: -600, z: -300, y: 50, scale: 0.5 }
            };
        }
        
        // 모든 카드에 직접 스타일 적용
        this.cards.forEach((card, index) => {
            const position = (index - this.currentIndex + this.cards.length) % this.cards.length;
            // 모든 클래스 제거
            card.classList.remove('active', 'left-1', 'left-2', 'right-1', 'right-2');
            
            if (position === 0) {
                // 중앙 카드
                card.style.transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
                card.classList.add('active');
            } else if (position === 1) {
                // 오른쪽 첫 번째 카드
                const pos = positions.right1;
                card.style.transform = `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.y}deg) scale(${pos.scale})`;
                card.style.opacity = '0.6';
                card.style.zIndex = '5';
            } else if (position === 2) {
                // 오른쪽 두 번째 카드
                const pos = positions.right2;
                card.style.transform = `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.y}deg) scale(${pos.scale})`;
                card.style.opacity = '0.3';
                card.style.zIndex = '3';
            } else if (position === this.cards.length - 1) {
                // 왼쪽 첫 번째 카드
                const pos = positions.left1;
                card.style.transform = `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.y}deg) scale(${pos.scale})`;
                card.style.opacity = '0.6';
                card.style.zIndex = '5';
            } else if (position === this.cards.length - 2) {
                // 왼쪽 두 번째 카드
                const pos = positions.left2;
                card.style.transform = `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.y}deg) scale(${pos.scale})`;
                card.style.opacity = '0.3';
                card.style.zIndex = '3';
            } else {
                // 나머지 카드들 (완전히 숨김)
                card.style.transform = 'translateX(0) translateZ(-500px) scale(0.3)';
                card.style.opacity = '0';
                card.style.zIndex = '1';
            }
        });
        
        // 인디케이터 업데이트
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // 카드 애니메이션 효과
        this.addAnimationEffect();
    }
    
    addAnimationEffect() {
        // 간단한 애니메이션만 유지
        const cardElements = this.cards[this.currentIndex].querySelectorAll('.card-title, .card-description, .tech-tag, .card-link');
        cardElements.forEach((element, index) => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
            }, 100);
        });
    }
    
    initTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        const carousel = document.querySelector('.carousel-container');
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        carousel.addEventListener('touchmove', (e) => {
            e.preventDefault(); // 스크롤 방지
        });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // 수평 스와이프가 수직 스와이프보다 클 때만 처리
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    this.goToPrev();
                } else {
                    this.goToNext();
                }
            }
        });
    }
}

// 자동 회전 기능
class AutoRotateCarousel extends ProjectCarousel {
    constructor(autoRotateInterval = 5000) {
        super();
        this.autoRotateInterval = autoRotateInterval;
        this.autoRotateTimer = null;
        this.isUserInteracting = false;
        
        this.initAutoRotate();
    }
    
    initAutoRotate() {
        this.startAutoRotate();
        
        // 사용자 상호작용 감지
        const interactionEvents = ['mouseenter', 'touchstart', 'click'];
        const carousel = document.querySelector('.project-carousel');
        
        interactionEvents.forEach(event => {
            carousel.addEventListener(event, () => {
                this.stopAutoRotate();
                this.isUserInteracting = true;
            });
        });
        
        carousel.addEventListener('mouseleave', () => {
            if (this.isUserInteracting) {
                setTimeout(() => {
                    this.isUserInteracting = false;
                    this.startAutoRotate();
                }, 2000);
            }
        });
        
        // 페이지 가시성 변경 감지
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoRotate();
            } else if (!this.isUserInteracting) {
                this.startAutoRotate();
            }
        });
    }
    
    startAutoRotate() {
        this.stopAutoRotate();
        this.autoRotateTimer = setInterval(() => {
            if (!this.isUserInteracting && this.isInProjectSection()) {
                this.goToNext();
            }
        }, this.autoRotateInterval);
    }
    
    stopAutoRotate() {
        if (this.autoRotateTimer) {
            clearInterval(this.autoRotateTimer);
            this.autoRotateTimer = null;
        }
    }
    
    goToPrev() {
        super.goToPrev();
        this.resetAutoRotate();
    }
    
    goToNext() {
        super.goToNext();
        this.resetAutoRotate();
    }
    
    goToSlide(index) {
        super.goToSlide(index);
        this.resetAutoRotate();
    }
    
    resetAutoRotate() {
        if (!this.isUserInteracting) {
            this.startAutoRotate();
        }
    }
}

// 페이지 로드 시 캐러셀 초기화
document.addEventListener('DOMContentLoaded', () => {
    // 자동 회전 기능이 있는 캐러셀 초기화 (5초마다 회전)
    window.projectCarousel = new AutoRotateCarousel(5000);
});

// 프로젝트 카드에 마우스 효과 추가
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card-3d');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('active')) {
                this.style.transform += ' translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('active')) {
                this.style.transform = this.style.transform.replace(' translateY(-10px)', '');
            }
        });
    });
}); 