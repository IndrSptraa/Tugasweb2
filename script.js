document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    toggleBtn.addEventListener('click', function() {
        sidebar.classList.toggle('minimized');
        toggleBtn.classList.toggle('rotate');

        if (sidebar.classList.contains('minimized')) {
            toggleBtn.innerHTML = '=';
        } else {
            toggleBtn.innerHTML = 'x';
        }

        // Hide/show social icons based on sidebar state
        const socialIcons = sidebar.querySelector('.social-icons');
        if (sidebar.classList.contains('minimized')) {
            socialIcons.style.display = 'none';
        } else {
            socialIcons.style.display = 'flex';
        }
    });

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.classList.remove('hidden');

            // Minimize the sidebar when a link is clicked
            if (!sidebar.classList.contains('minimized')) {
                sidebar.classList.add('minimized');
                toggleBtn.classList.add('rotate');
                toggleBtn.innerHTML = '=';
                socialIcons.style.display = 'none';
            }
        });
    });

    document.querySelector('#home').classList.remove('hidden');

    // Carousel functionality
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelector('.carousel-images');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');
        const imageCount = images.children.length;
        let index = 1; // Start from the second image

        function updateCarousel() {
            const imageWidth = images.clientWidth / imageCount; // Adjust with number of images
            images.style.transform = `translateX(${-index * imageWidth}px)`;

            // Update active image
            images.querySelectorAll('img').forEach((img, i) => {
                if (i === index) {
                    img.classList.add('active');
                } else {
                    img.classList.remove('active');
                }
            });
        }

        prevBtn.addEventListener('click', function() {
            index = (index > 0) ? index - 1 : imageCount - 1;
            updateCarousel();
        });

        nextBtn.addEventListener('click', function() {
            index = (index < imageCount - 1) ? index + 1 : 0;
            updateCarousel();
        });

        // Initialize with the second image active
        updateCarousel();
    });

    document.addEventListener('DOMContentLoaded', function() {
        const scrollableElement = document.querySelector('.scrollable');

        let timer;
        scrollableElement.addEventListener('scroll', function() {
            clearTimeout(timer);
            scrollableElement.style.scrollbarWidth = 'auto'; // Show scrollbar
            timer = setTimeout(function() {
                scrollableElement.style.scrollbarWidth = 'none'; // Hide scrollbar
            }, 3500); // Hide scrollbar after 3.5 seconds of inactivity
        });

        // Initialize scrollbar visibility
        scrollableElement.style.scrollbarWidth = 'auto'; // Ensure scrollbar is visible on load
    });
});
document.querySelector('.nav-link[href="#about"]').addEventListener('click', function () {
  document.querySelector('.overlay').classList.add('visible');
  document.querySelector('#sidebar2').classList.add('visible');
});

document.querySelectorAll('#sidebar2 .nav-link').forEach(link => {
  link.addEventListener('click', function () {
    document.querySelector('.overlay').classList.remove('visible');
    document.querySelector('#sidebar2').classList.remove('visible');
  });
});

document.querySelector('#toggle-btn2').addEventListener('click', function () {
  document.querySelector('#sidebar2').classList.toggle('visible');
});

document.querySelector('.overlay').addEventListener('click', function () {
  document.querySelector('#sidebar2').classList.remove('visible');
  document.querySelector('.overlay').classList.remove('visible');
});
