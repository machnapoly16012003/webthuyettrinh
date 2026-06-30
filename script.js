/**
 * UMS Graduation Report Landing Page - Custom Script
 * Xử lý các hiệu ứng động, bộ đếm số, sơ đồ tương tác và cuộn trang mượt mà.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Hiệu ứng cuộn màn hình (Fade-In Scroll Effect)
       ========================================================================== */
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dừng quan sát phần tử sau khi đã kích hoạt hiệu ứng
                observer.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    /* ==========================================================================
       2. Bộ đếm số tự động chạy (Count-Up Animation)
       ========================================================================== */
    const counterSection = document.getElementById('statistics');
    const counters = document.querySelectorAll('.counter-number');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Thời gian chạy hiệu ứng (ms)
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;

            const timer = setInterval(() => {
                current += Math.ceil(target / (duration / stepTime));
                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = current;
                }
            }, stepTime);
        });
    };

    const statisticsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                startCounters();
                hasCounted = true; // Chỉ chạy một lần duy nhất
            }
        });
    }, { threshold: 0.3 });

    if (counterSection) {
        statisticsObserver.observe(counterSection);
    }

    /* ==========================================================================
       3. Sơ đồ tương tác Kiến Trúc (Interactive Clean Architecture)
       ========================================================================== */
    const archLayers = document.querySelectorAll('.arch-layer');
    const detailContent = document.getElementById('arch-detail-content');

    archLayers.forEach(layer => {
        const showDetail = () => {
            // Lấy thông tin mô tả lưu trong thuộc tính data-desc
            const desc = layer.getAttribute('data-desc');
            const title = layer.querySelector('h4').innerText;
            const badge = layer.querySelector('.layer-badge').innerText;

            detailContent.innerHTML = `
                <div class="active-detail-content">
                    <span class="badge" style="margin-bottom: 10px;">${badge}</span>
                    <h4 style="color: var(--color-accent); font-size: 16px; font-weight: 600; margin-bottom: 12px;">${title}</h4>
                    <p style="font-size: 13.5px; line-height: 1.6; color: var(--color-text-bright);">${desc}</p>
                </div>
            `;
        };

        // Kích hoạt khi hover chuột
        layer.addEventListener('mouseenter', showDetail);
        
        // Kích hoạt khi chạm trên thiết bị di động
        layer.addEventListener('click', (e) => {
            e.preventDefault();
            showDetail();
            // Cuộn nhẹ tới vùng hiển thị mô tả trên mobile
            if (window.innerWidth <= 1024) {
                detailContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    });

    /* ==========================================================================
       4. Thanh điều hướng Active Navigation trên Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNavigation = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset cho khoảng đệm
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavigation);

    /* ==========================================================================
       5. Mobile Menu Toggle
       ========================================================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            // Thay đổi icon menu khi mở
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars-staggered';
            }
        });

        // Đóng menu khi nhấp vào liên kết điều hướng trên mobile
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
            });
        });
    }

    /* ==========================================================================
       6. Header Glassmorphic Blur Effect on Scroll
       ========================================================================== */
    const header = document.querySelector('.main-header');
    
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(7, 11, 25, 0.85)';
            header.style.padding = '5px 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(7, 11, 25, 0.7)';
            header.style.padding = '0';
            header.style.boxShadow = 'none';
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);

});
