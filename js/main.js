document.addEventListener('DOMContentLoaded', function() {
    // calculate age
    function calculateAge(birthdate) {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    }
    
    // print age in HTML
    const ageElement = document.getElementById('age');
    if (ageElement) {
        ageElement.textContent = calculateAge('1997-02-08') + ' anos';
    }
    
    // Menu Mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const header = document.getElementById('header');
    
    if (menuMobile && header) {
        menuMobile.addEventListener('click', function() {
            header.classList.toggle('menu-active');
            const icon = menuMobile.querySelector('i');
            
            // change menu icon
            if (header.classList.contains('menu-active')) {
                icon.classList.replace('bi-list', 'bi-x');
                menuMobile.setAttribute('aria-expanded', 'true');
            } else {
                icon.classList.replace('bi-x', 'bi-list');
                menuMobile.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // close menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (header.classList.contains('menu-active')) {
                header.classList.remove('menu-active');
                menuMobile.querySelector('i').classList.replace('bi-x', 'bi-list');
                menuMobile.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // soft scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // refresh URL
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
    
    // change active link scroll
    function activateNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', activateNavLink);
    activateNavLink();
    
    // initialize swipper
    const portfolioSwiper = new Swiper('.portfolio-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    });
    
    // elements animation
    function animateOnScroll() {
        const elements = document.querySelectorAll('.about-grid, .skills-container, .resume-grid, .portfolio-slider, .contact-grid');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // skills bar
    function animateSkillBars() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        skillLevels.forEach(level => {
            const width = level.getAttribute('data-level');
            level.style.width = '0';
            
            setTimeout(() => {
                level.style.width = width;
            }, 100);
        });
    }
    
    // obs skills bar
    const skillsSection = document.querySelector('#skills');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(skillsSection);
    }
});