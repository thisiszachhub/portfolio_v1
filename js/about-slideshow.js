(function () {
  function init() {
    var el = document.querySelector('.about-slideshow');
    if (!el) return;

    var imgs = Array.prototype.slice.call(el.querySelectorAll('img'));
    if (imgs.length < 2) return;

    var index = 0;
    setInterval(function () {
      imgs[index].classList.remove('is-active');
      index = (index + 1) % imgs.length;
      imgs[index].classList.add('is-active');
    }, 4000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
