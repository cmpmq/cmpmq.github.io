const sliders = document.querySelectorAll('.slide')
const next = document.querySelector('next')
const prev = document.querySelector('prev')

const auto = false;
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
    // Get current class
    const current = document.querySelector('.current')
    // Remove current class
    current.classList.remove('current')
    // Check for next slide
    if(current.nextElementSibling) {
        // Add current to next sibling
        current.nextElementSibling.classList.add('current')
    } else {
        // Add current to start
        sliders[0].classList.add('current')
    }
    setTimeout(() => current.classList.remove('current'))
}

const prevSlide = () => {
    // Get current class
    const current = document.querySelector('.current')
    // Remove current class
    current.classList.remove('current')
    // Check for prev slide
    if(current.previousElementSibling) {
        // Add current to prev sibling
        current.previousElementSibling.classList.add('current')
    } else {
        // no prev, go to last
        sliders[sliders.length - 1].classList.add('current')
    }
    setTimeout(() => current.classList.remove('current'))
}

// Button events
// next.addEventListener('click', e => {
//     nextSlide();
// });

// Auto Slide
if(auto) {
    // intervals
    slideInterval = setInterval(nextSlide, intervalTime)
}