// America Party 정적 페이지 JavaScript

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    // 네비게이션 스크롤 이벤트
    initSmoothScrolling();
    
    // 모바일 메뉴
    initMobileMenu();
    
    // 갤러리 모달
    initGalleryModal();
    
    // 동영상 모달
    initVideoModal();
    
    // 배경 비디오 처리
    initBackgroundVideo();
    
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 커뮤니티 버튼 기능
    initCommunityButtons();
});

// 부드러운 스크롤 네비게이션
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 헤더 높이 고려
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 모바일 메뉴 토글
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // 모바일 메뉴가 없다면 생성
            if (!mobileMenu) {
                createMobileMenu();
            } else {
                toggleMobileMenu();
            }
        });
    }
}

function createMobileMenu() {
    const header = document.querySelector('header');
    const mobileMenuHtml = `
        <div class="mobile-menu fixed top-16 left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-patriot-blue/30 z-40 transform -translate-y-full transition-transform duration-300">
            <nav class="container mx-auto px-4 py-6">
                <div class="flex flex-col space-y-4">
                    <a href="#home" class="text-gray-300 hover:text-patriot-red transition-colors font-tech text-sm uppercase tracking-wider">Home</a>
                    <a href="#about" class="text-gray-300 hover:text-patriot-red transition-colors font-tech text-sm uppercase tracking-wider">About</a>
                    <a href="#tokenomics" class="text-gray-300 hover:text-patriot-red transition-colors font-tech text-sm uppercase tracking-wider">Tokenomics</a>
                    <a href="#gallery" class="text-gray-300 hover:text-patriot-red transition-colors font-tech text-sm uppercase tracking-wider">Gallery</a>
                    <a href="#videos" class="text-gray-300 hover:text-patriot-red transition-colors font-tech text-sm uppercase tracking-wider">Videos</a>
                    <button class="bg-gradient-to-r from-patriot-red to-patriot-blue hover:from-patriot-blue hover:to-patriot-red text-white px-6 py-2 rounded font-tech uppercase tracking-wider">
                        Buy $AMERICA
                    </button>
                </div>
            </nav>
        </div>
    `;
    
    header.insertAdjacentHTML('afterend', mobileMenuHtml);
    
    // 모바일 메뉴 링크에 스크롤 이벤트 추가
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a[href^="#"]');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 메뉴 닫기
                toggleMobileMenu();
            }
        });
    });
}

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('-translate-y-full');
        mobileMenu.classList.toggle('translate-y-0');
    }
}

// 갤러리 모달 기능
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('#gallery .cursor-pointer');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openImageModal(img.src, img.alt);
            }
        });
    });
}

function openImageModal(src, alt) {
    const modalHtml = `
        <div class="image-modal fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onclick="closeImageModal()">
            <div class="relative max-w-4xl max-h-full">
                <button class="absolute top-4 right-4 text-white hover:text-patriot-red text-2xl z-10" onclick="closeImageModal()">
                    ✕
                </button>
                <img src="${src}" alt="${alt}" class="max-w-full max-h-full object-contain rounded-lg" onclick="event.stopPropagation()">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 class="text-white text-xl font-orbitron font-bold">${alt}</h3>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// 동영상 모달 기능
function initVideoModal() {
    const videoItems = document.querySelectorAll('#videos .cursor-pointer');
    
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                const videoId = extractYouTubeVideoId(img.src);
                const title = this.querySelector('h3').textContent;
                if (videoId) {
                    openVideoModal(videoId, title);
                }
            }
        });
    });
}

function extractYouTubeVideoId(thumbnailUrl) {
    const match = thumbnailUrl.match(/\/vi\/([^\/]+)\//);
    return match ? match[1] : null;
}

function openVideoModal(videoId, title) {
    const modalHtml = `
        <div class="video-modal fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onclick="closeVideoModal()">
            <div class="relative w-full max-w-4xl">
                <button class="absolute top-4 right-4 text-white hover:text-patriot-red text-2xl z-10" onclick="closeVideoModal()">
                    ✕
                </button>
                <div class="relative aspect-video">
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        title="${title}"
                        class="w-full h-full rounded-lg"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                        onclick="event.stopPropagation()">
                    </iframe>
                </div>
                <div class="mt-4 text-center">
                    <h3 class="text-white text-xl font-orbitron font-bold">${title}</h3>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.querySelector('.video-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// 배경 비디오 처리
function initBackgroundVideo() {
    const backgroundVideo = document.querySelector('.elementor-background-video-hosted');
    
    if (backgroundVideo) {
        // 비디오 로드 이벤트 처리
        backgroundVideo.addEventListener('loadeddata', function() {
            console.log('Background video loaded successfully');
        });
        
        // 비디오 에러 처리
        backgroundVideo.addEventListener('error', function() {
            console.log('Background video failed to load');
            // 비디오 컨테이너 숨기기
            const container = backgroundVideo.closest('.elementor-background-video-container');
            if (container) {
                container.style.display = 'none';
            }
        });
        
        // 비디오가 끝나면 다시 재생
        backgroundVideo.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play();
        });
    }
}

// 스크롤 애니메이션
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animatedElements = document.querySelectorAll('.grid > div, .text-center, .bg-gradient-to-r');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 키보드 이벤트 처리
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
        closeVideoModal();
    }
});

// 버튼 클릭 이벤트
document.addEventListener('click', function(e) {
    // Buy $AMERICA 버튼 클릭
    if (e.target.textContent === 'Buy $AMERICA' || e.target.closest('button')?.textContent?.includes('Buy $AMERICA')) {
        alert('🚀 America Party Token coming soon! 🇺🇸');
    }
    
    // View Chart 버튼 클릭
    if (e.target.textContent === 'View Chart' || e.target.closest('button')?.textContent?.includes('View Chart')) {
        alert('📈 Chart will be available after token launch! 🚀');
    }
});

// 커뮤니티 버튼 기능
function initCommunityButtons() {
    const communityButtons = document.querySelectorAll('#community button');
    
    communityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            // 각 버튼에 따라 적절한 링크로 이동
            let url = '';
            
            if (buttonText.includes('X (Twitter)')) {
                url = 'https://twitter.com/america_party_coin';
            } else if (buttonText.includes('Telegram')) {
                url = 'https://t.me/america_party_coin';
            } else if (buttonText.includes('DexTools')) {
                url = 'https://www.dextools.io/app/en/ether/pair-explorer/';
            } else if (buttonText.includes('DexScreener')) {
                url = 'https://dexscreener.com/';
            }
            
            if (url) {
                window.open(url, '_blank');
            }
        });
    });
}

// 스크롤 시 헤더 활성화 효과
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(to right, rgba(15, 23, 42, 0.98), rgba(127, 29, 29, 0.95), rgba(15, 23, 42, 0.98))';
        header.style.borderBottomColor = 'rgba(251, 191, 36, 0.6)';
    } else {
        header.style.background = 'linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(127, 29, 29, 0.90), rgba(15, 23, 42, 0.95))';
        header.style.borderBottomColor = 'rgba(251, 191, 36, 0.4)';
    }
});

// 전역 함수들 (HTML onclick에서 사용)
window.closeImageModal = closeImageModal;
window.closeVideoModal = closeVideoModal; 