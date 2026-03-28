// 导航栏激活状态管理
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (currentPath === linkPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 搜索功能
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            const searchInput = this.querySelector('input[name="q"]');
            if (!searchInput.value.trim()) {
                e.preventDefault();
                alert('请输入搜索关键词');
            }
        });
    }
}

// 分类卡片动画效果
function initCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 文物卡片动画效果
function initArtifactCards() {
    const artifactCards = document.querySelectorAll('.artifact-card');
    artifactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 响应式导航栏
function initResponsiveNav() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '☰';
    menuToggle.style.cssText = `
        display: none;
        background: transparent;
        border: none;
        color: #00f0ff;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const navbar = document.querySelector('.navbar .container');
    navbar.appendChild(menuToggle);
    
    function toggleMenu() {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 25, 47, 0.95)';
            navLinks.style.backdropFilter = 'blur(10px)';
            navLinks.style.borderBottom = '1px solid rgba(0, 240, 255, 0.3)';
            navLinks.style.padding = '20px';
            navLinks.style.gap = '15px';
        }
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navLinks.style.display = 'none';
        } else {
            menuToggle.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.width = 'auto';
            navLinks.style.background = 'none';
            navLinks.style.backdropFilter = 'none';
            navLinks.style.borderBottom = 'none';
            navLinks.style.padding = '0';
            navLinks.style.gap = '30px';
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    initCategoryCards();
    initArtifactCards();
    initSmoothScroll();
    initResponsiveNav();
    
    // 星空背景效果增强
    function createStars() {
        const starsContainer = document.querySelector('.stars');
        if (starsContainer) {
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.style.cssText = `
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    animation: twinkle ${Math.random() * 5 + 2}s infinite ease-in-out;
                `;
                
                const size = Math.random() * 2 + 1;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 5}s`;
                
                starsContainer.appendChild(star);
            }
        }
    }
    
    createStars();
    
    // 初始化API系统
    if (typeof artifactAPI !== 'undefined') {
        console.log('API系统初始化成功');
        
        // 示例：获取统计数据
        const stats = artifactAPI.getStats();
        console.log('文物统计数据:', stats);
    }
});

