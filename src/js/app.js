document.addEventListener('DOMContentLoaded', function() {
    scrollNav();
    fixedNavigation();
});

function fixedNavigation() {
    const bar = document.querySelector('.header');
    // Register the intersection observer
    const observer = new IntersectionObserver( function(entries) {
        // console.log(entries[0]);
        if(entries[0].isIntersecting){
            bar.classList.remove('fixed');
        } else {
            bar.classList.add('fixed');
        }
    })
    // Element to observe
    observer.observe(document.querySelector('.video'))
}

function scrollNav() {
    const links = document.querySelectorAll('.navigation-main a');
    links.forEach( function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            // console.log(event.target.attributes.href.value);

            const section = document.querySelector(event.target.attributes.href.value);
            section.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}