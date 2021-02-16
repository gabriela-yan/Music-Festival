document.addEventListener('DOMContentLoaded', function() {
    createGallery();

});

/**
 * createGallery.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Monday, February 15th, 2021.
 * @global
 * @return	void
 * @description Create and add an small image to an LI element of the gallery-img unordered list
 */
function createGallery() {
    const gallery = document.querySelector('.gallery-img');

    for(let i = 1; i <= 12; i++){
        const image = document.createElement('IMG');
        image.src = `build/img/thumb/${i}.webp`;
        image.dataset.imageId = i;

        image.onclick = showImage;

        const list = document.createElement('LI');
        list.appendChild(image);

        gallery.appendChild(list);
    }
}

/**
 * showImage.
 *
 * @author	Gabriela Yan
 * @since	v0.0.1
 * @version	v1.0.0	Monday, February 15th, 2021.
 * @global
 * @param	mixed	event	
 * @return	void
 * @description Create and add a large image to display by clicking on the small image
 */
function showImage(event) {
    const id = parseInt(event.target.dataset.imageId);
    const image = document.createElement('IMG');
    image.src = `build/img/grande/${id}.webp`;

    image.classList.add('big-image');

    const overlay = document.createElement('DIV');
    overlay.appendChild(image);
    overlay.classList.add('overlay');

    overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('body-fixed');
    }

    const closeImage = document.createElement('P');
    closeImage.textContent = 'X';
    closeImage.classList.add('btn-close');

    closeImage.onclick = function(){
        overlay.remove();
        body.classList.remove('body-fixed');
    }

    overlay.appendChild(closeImage);

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('body-fixed')
}