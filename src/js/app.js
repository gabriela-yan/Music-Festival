document.addEventListener('DOMContentLoaded', function() {
    scrollNav();
});

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