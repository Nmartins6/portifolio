/* Open and close side menu mobile */

const menuMobile = document.querySelector('.menu-mobile')
const body = document.querySelector('body')

menuMobile.addEventListener('click', () => {
    menuMobile.classList.contains("bi-list")
    ? menuMobile.classList.replace("bi-list", "bi-x")
    : menuMobile.classList.replace("bi-x", "bi-list")
    body.classList.toggle('menu-nav-active')
})

/*Close menu*/

const navItem = document.querySelectorAll('.nav-item')
console.log(navItem)
navItem.forEach(item => {
    item.addEventListener('click', () => {
        if(body.classList.contains("menu-nav-active")) {
         body.classList.remove("menu-nav-active")
         menuMobile.classList.replace("bi-x", "bi-list")
        }
    })
})


document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        var scrollPosition = window.scrollY;

        navLinks.forEach(function(link) {
            var targetId = link.getAttribute("href").substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                var targetPosition = targetElement.getBoundingClientRect().top + scrollPosition;
                var targetHeight = targetElement.offsetHeight;

                if (
                    scrollPosition >= targetPosition - window.innerHeight / 2 &&
                    scrollPosition < targetPosition + targetHeight - window.innerHeight / 2
                ) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);
    window.addEventListener("resize", setActiveLink);

    setActiveLink();
});

/*carousel animation*/


