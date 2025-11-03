let lastScrollTop = 0;
const menuBar = document.querySelector('.menu-bar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll down - hide the menu bar
        menuBar.classList.add('hidden');
    } else {
        // Scroll up - show the menu bar
        menuBar.classList.remove('hidden');
    }

    lastScrollTop = scrollTop;
});

let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}
