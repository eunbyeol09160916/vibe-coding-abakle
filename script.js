// DOM 요소들
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const languageSelector = document.querySelector('.language-current');
const serviceCards = document.querySelectorAll('.service-card');

// 모바일 메뉴 토글 기능
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // 메뉴가 열릴 때 body 스크롤 방지
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// 모바일 메뉴 버튼 클릭 이벤트
mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// 모바일 메뉴 링크 클릭 시 메뉴 닫기
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// 언어 선택기 기능
function toggleLanguageDropdown() {
    // 실제 구현에서는 드롭다운 메뉴를 표시
    console.log('언어 선택 드롭다운 열기');
    // 여기에 언어 선택 드롭다운 로직 추가 가능
}

languageSelector.addEventListener('click', toggleLanguageDropdown);

// 서비스 카드 클릭 이벤트
serviceCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const cardTitles = ['아플 때', '불편할 때', '걱정될 때'];
        const cardSubtitles = ['병원 방문', '약국 방문', '건강 관리'];
        
        console.log(`${cardTitles[index]} - ${cardSubtitles[index]} 서비스 클릭됨`);
        
        // 카드 클릭 시 애니메이션 효과
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        // 실제 구현에서는 해당 서비스 페이지로 이동하거나 모달을 표시
        // window.location.href = `service-${index + 1}.html`;
    });
});

// 스크롤 시 헤더 스타일 변경
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', handleScroll);

// 윈도우 리사이즈 시 모바일 메뉴 닫기
function handleResize() {
    if (window.innerWidth > 768) {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('resize', handleResize);

// 페이지 로드 시 애니메이션
window.addEventListener('load', () => {
    // 메인 타이틀 애니메이션
    const mainTitle = document.querySelector('.main-title');
    mainTitle.style.opacity = '0';
    mainTitle.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        mainTitle.style.transition = 'all 0.8s ease-out';
        mainTitle.style.opacity = '1';
        mainTitle.style.transform = 'translateY(0)';
    }, 200);
    
    // 서비스 카드들 순차적 애니메이션
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 400 + (index * 200));
    });
});

// 키보드 접근성 개선
document.addEventListener('keydown', (e) => {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// 터치 이벤트 최적화 (모바일에서 더 부드러운 스크롤)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    // 위로 스와이프 시 모바일 메뉴 닫기
    if (Math.abs(diff) > swipeThreshold && diff > 0 && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// 서비스 카드 호버 효과 (터치 디바이스에서도 작동)
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'translateY(-8px)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            card.style.transform = 'translateY(0)';
        }
    });
    
    // 터치 디바이스에서 탭 효과
    card.addEventListener('touchstart', () => {
        card.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', () => {
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    });
});

