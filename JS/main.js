document.addEventListener('DOMContentLoaded', () => {
    // Benefit Accordion
    const benefitImg = document.querySelector('.accordion-img img');
    let lastSrc = benefitImg.src;
    let isFirstOpen = true;

    document.querySelectorAll('.benefit-item').forEach((item) => {
        item.addEventListener('click', () => {
            const accordionItems = document.querySelectorAll('.benefit-item');
            let newSrc;

            switch (true) {
                case item.classList.contains('first-benefit'):
                    newSrc = 'ASSETS/benefitimg1.png';
                    break;
                case item.classList.contains('second-benefit'):
                    newSrc = 'ASSETS/benefitimg2.png';
                    break;
                case item.classList.contains('third-benefit'):
                    newSrc = 'ASSETS/benefitimg3.png';
                    break;
                case item.classList.contains('fourth-benefit'):
                    newSrc = 'ASSETS/benefitimg4.png';
                    break;
                default:
                    newSrc = lastSrc;
            }

            if (item.classList.contains('active')) {
                item.classList.remove('active');
                benefitImg.src = lastSrc;
            } else {
                accordionItems.forEach((el) => el.classList.remove('active'));
                item.classList.add('active');

                if (benefitImg.src !== newSrc) {
                    benefitImg.classList.add('fade-out');
                    setTimeout(() => {
                        benefitImg.src = newSrc;
                        lastSrc = newSrc;
                        benefitImg.classList.remove('fade-out');
                    }, 500);
                }
            }

            isFirstOpen = false;
        });
    });

    // Program Slider
    const programList = document.querySelector('.program-list');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    let isDown = false, startX, scrollLeft, isDragging = false;

    programList.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;
        startX = e.pageX - programList.offsetLeft;
        scrollLeft = programList.scrollLeft;
        programList.classList.add('active');
    });

    programList.addEventListener('mouseleave', () => {
        isDown = false;
        programList.classList.remove('active');
    });

    programList.addEventListener('mouseup', () => {
        isDown = false;
        programList.classList.remove('active');
        setTimeout(() => { isDragging = false; }, 0);
    });

    programList.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        isDragging = true;
        const x = e.pageX - programList.offsetLeft;
        const walk = (x - startX) * 2;
        programList.scrollLeft = scrollLeft - walk;
        updateButtonState();
    });

    document.querySelectorAll('.program-elemen').forEach(elemen => {
        elemen.addEventListener('dragstart', (e) => e.preventDefault());
        elemen.addEventListener('mousedown', (e) => e.preventDefault());
        elemen.addEventListener('click', (e) => {
            if (isDragging) e.preventDefault();
        });
    });

    nextButton.addEventListener('click', () => scrollProgram(1));
    prevButton.addEventListener('click', () => scrollProgram(-1));

    function scrollProgram(direction) {
        const elementWidth = programList.querySelector('.program-elemen').offsetWidth + 30;
        programList.scrollBy({ left: elementWidth * direction, behavior: 'smooth' });
        setTimeout(updateButtonState, 500);
    }

    function updateButtonState() {
        const maxScrollLeft = programList.scrollWidth - programList.clientWidth;
        prevButton.style.fill = programList.scrollLeft <= 0 ? '#d3d3d3' : '#1C1C1C';
        nextButton.style.fill = programList.scrollLeft >= maxScrollLeft ? '#d3d3d3' : '#1C1C1C';
        prevButton.style.pointerEvents = programList.scrollLeft <= 0 ? 'none' : 'auto';
        nextButton.style.pointerEvents = programList.scrollLeft >= maxScrollLeft ? 'none' : 'auto';
    }

    updateButtonState();

    // Navbar Search and Placeholder Typing
    const icon = document.querySelector('.navbar-search .icon');
    const navbarSearch = document.querySelector('.navbar-search');
    const searchInput = document.getElementById('search');
    const placeholders = [
        "belajar apa hari ini?", "bingung belajar apa?", "web development?",
        "data science?", "machine learning?", "computer science?",
        "mathematic?", "app development?", "artificial intelligence?",
        "software engineer?", "data analysis?", "information system?", "cyber security?", "game development?"
    ];
    let i = 0, j = 0, currentText = '', isDeleting = false;

    icon.addEventListener('click', () => {
        navbarSearch.classList.toggle('active');
    });

    function type() {
        const currentPlaceholder = placeholders[i];
        if (!isDeleting && j < currentPlaceholder.length) {
            currentText = currentPlaceholder.substring(0, j + 1);
            j++;
            searchInput.setAttribute('placeholder', currentText);
            setTimeout(type, 100);
        } else if (isDeleting && j > 0) {
            currentText = currentPlaceholder.substring(0, j - 1);
            j--;
            searchInput.setAttribute('placeholder', currentText);
            setTimeout(type, 50);
        } else if (!isDeleting && j === currentPlaceholder.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % placeholders.length;
            setTimeout(type, 200);
        }
    }

    type();
});

// Dropdown and Menu
const dropdownTitles = document.querySelectorAll('.dropdown-title');
const menuIcon = document.querySelector('.menu');
const closeIcon = document.querySelector('.close');
const hiddenMenu = document.querySelector('.hidden-menu');

dropdownTitles.forEach(title => {
    title.addEventListener('click', function () {
        this.parentElement.classList.toggle('open');
    });
});

menuIcon.addEventListener('click', () => {
    hiddenMenu.classList.add('show');
});

closeIcon.addEventListener('click', () => {
    hiddenMenu.classList.remove('show');
});
