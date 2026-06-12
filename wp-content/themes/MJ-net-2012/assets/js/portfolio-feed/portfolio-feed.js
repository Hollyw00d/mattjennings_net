export default class PortfolioFeedUtils {
  init() {
    this.photoswipeSlideshow();
  }

  async photoswipeSlideshow() {
    const imagesSinglePost = document.querySelectorAll(
      'body.single-portfoliopost main#main_content img.photoswipe, body.single main#main_content img.photoswipe'
    );

    if (!imagesSinglePost.length) return;

    await Promise.all(
      [...imagesSinglePost].map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
              resolve();
              return;
            }

            img.addEventListener('load', resolve, { once: true });
            img.addEventListener('error', resolve, { once: true });
          })
      )
    );

    const invalidImages = [...imagesSinglePost].filter(
      (img) => img.naturalWidth === 0 && img.naturalHeight === 0
    );

    if (invalidImages.length !== 0) return;

    imagesSinglePost.forEach((img) => {
      if (img.closest('a.photoswipe-link')) return;

      const alt = img.getAttribute('alt');
      const a = document.createElement('a');
      const divContainer = document.createElement('div');
      let divCaption = null;

      if (alt) {
        divCaption = document.createElement('div');
        divCaption.classList.add('photoswipe-caption');
        divCaption.textContent = alt;
      }

      a.href = img.src;
      a.dataset.pswpWidth = img.naturalWidth;
      a.dataset.pswpHeight = img.naturalHeight;
      a.classList.add('photoswipe-link');

      divContainer.classList.add('photoswipe-container');

      img.parentNode?.insertBefore(divContainer, img);
      divContainer.appendChild(a);

      if (divCaption) {
        divContainer.appendChild(divCaption);
      }

      a.appendChild(img);
    });

    const { default: PhotoSwipeLightbox } = await import('photoswipe/lightbox');
    const options = {
      gallery: '#main_content',
      children: '.photoswipe-container > a.photoswipe-link',
      pswpModule: () => import('photoswipe')
    };

    const lightbox = new PhotoSwipeLightbox(options);

    lightbox.on('uiRegister', function () {
      lightbox.pswp.ui.registerElement({
        name: 'custom-caption',
        order: 9,
        isButton: false,
        appendTo: 'root',
        html: 'Caption text',
        // eslint-disable-next-line no-unused-vars
        onInit: (el, pswp) => {
          lightbox.pswp.on('change', () => {
            const currSlideElement = lightbox.pswp.currSlide.data.element;
            let captionHTML = '';

            if (currSlideElement) {
              const hiddenCaption = currSlideElement.nextElementSibling;
              if (hiddenCaption) {
                captionHTML = hiddenCaption.innerHTML;
              } else {
                // get caption from alt attribute
                captionHTML = currSlideElement
                  .querySelector('img')
                  .getAttribute('alt');
              }
            }
            el.innerHTML = captionHTML || '';
          });
        }
      });
    });

    lightbox.init();
  }
}
