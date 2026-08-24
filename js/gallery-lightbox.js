(function () {
  function init() {
    var galleries = document.querySelectorAll('.gallery-grid');
    if (!galleries.length) return;

    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<button class="lightbox-prev" aria-label="Previous image">&#8249;</button>' +
      '<img class="lightbox-img" src="" alt="">' +
      '<button class="lightbox-next" aria-label="Next image">&#8250;</button>';
    document.body.appendChild(overlay);

    var imgEl = overlay.querySelector('.lightbox-img');
    var currentImages = [];
    var currentIndex = 0;

    imgEl.addEventListener('load', function () {
      imgEl.classList.add('is-loaded');
    });

    function show(index) {
      currentIndex = (index + currentImages.length) % currentImages.length;
      var target = currentImages[currentIndex];
      imgEl.classList.remove('is-loaded');
      imgEl.src = target.getAttribute('data-full') || target.src;
      imgEl.alt = target.alt;
    }

    function open(images, index) {
      currentImages = images;
      show(index);
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    var heroImg = document.querySelector('.hero-frame img');

    galleries.forEach(function (gallery) {
      var imgs = heroImg ? [heroImg] : [];
      imgs = imgs.concat(Array.prototype.slice.call(gallery.querySelectorAll('img')));
      imgs.forEach(function (img, i) {
        img.addEventListener('click', function () {
          open(imgs, i);
        });
      });
    });

    overlay.querySelector('.lightbox-close').addEventListener('click', close);
    overlay.querySelector('.lightbox-prev').addEventListener('click', function () {
      show(currentIndex - 1);
    });
    overlay.querySelector('.lightbox-next').addEventListener('click', function () {
      show(currentIndex + 1);
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(currentIndex - 1);
      if (e.key === 'ArrowRight') show(currentIndex + 1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
