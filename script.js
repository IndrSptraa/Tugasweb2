document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');
    const navigasiLinks = document.querySelectorAll('.link-navigasi');
    const socialIcons = sidebar.querySelector('.social-icons');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('minimized');
        toggleBtn.classList.toggle('rotate');
        toggleBtn.innerHTML = sidebar.classList.contains('minimized') ? '=' : 'x';
        socialIcons.style.display = sidebar.classList.contains('minimized') ? 'none' : 'flex';
    });

    function hideAllSections() {
        sections.forEach(section => section.classList.add('hidden'));
    }

    function showSection(sectionId) {
        const targetSection = document.querySelector(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }
    }

    function minimizeSidebar() {
        if (!sidebar.classList.contains('minimized')) {
            sidebar.classList.add('minimized');
            toggleBtn.classList.add('rotate');
            toggleBtn.innerHTML = '=';
            socialIcons.style.display = 'none';
        }
    }

    function handleNavClick(e) {
        e.preventDefault();
        hideAllSections();
        showSection(this.getAttribute('href'));
        minimizeSidebar();
    }

    links.forEach(link => link.addEventListener('click', handleNavClick));
    navigasiLinks.forEach(link => link.addEventListener('click', handleNavClick));

    // Show home section by default
    showSection('#home');

    // Carousel functionality
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelector('.carousel-images');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const imageCount = images.children.length;
        let index = 1; // Start from the second image

        function updateCarousel() {
            const imageWidth = images.clientWidth / imageCount;
            images.style.transform = `translateX(${-index * imageWidth}px)`;
            images.querySelectorAll('img').forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        prevBtn.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : imageCount - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            index = (index < imageCount - 1) ? index + 1 : 0;
            updateCarousel();
        });

        updateCarousel(); // Initialize with the second image active
    });

    // Scrollbar functionality
    const scrollableElement = document.querySelector('.scrollable');
    let scrollTimer;

    function toggleScrollbar() {
        clearTimeout(scrollTimer);
        scrollableElement.style.scrollbarWidth = 'auto';
        scrollTimer = setTimeout(() => {
            scrollableElement.style.scrollbarWidth = 'none';
        }, 3500);
    }

    scrollableElement.addEventListener('scroll', toggleScrollbar);
    toggleScrollbar(); // Initialize scrollbar visibility

    // Sidebar2 functionality
    const sidebar2 = document.querySelector('#sidebar2');
    const overlay = document.querySelector('.overlay');

    document.querySelector('.nav-link[href="#about"]').addEventListener('click', () => {
        overlay.classList.add('visible');
        sidebar2.classList.add('visible');
    });

    document.querySelectorAll('#sidebar2 .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('visible');
            sidebar2.classList.remove('visible');
        });
    });

    document.querySelector('#toggle-btn2').addEventListener('click', () => {
        sidebar2.classList.toggle('visible');
    });

    overlay.addEventListener('click', () => {
        sidebar2.classList.remove('visible');
        overlay.classList.remove('visible');
    });
});