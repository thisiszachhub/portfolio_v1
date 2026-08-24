(function () {
  function init() {
    var overlay = document.querySelector('.page-transition');
    var video = overlay ? overlay.querySelector('video') : null;
    var links = document.querySelectorAll('.nav a[href]');
    if (!overlay || !video || !links.length) return;

    var FALLBACK_DELAY = 4000;

    function goTo(href) {
      try {
        window.sessionStorage.setItem('skipIndexIntro', '1');
      } catch (err) {
        /* no-op */
      }
      window.location.href = href;
    }

    function playTransition(href) {
      var navigated = false;
      function go() {
        if (navigated) return;
        navigated = true;
        goTo(href);
      }

      overlay.classList.add('is-active');
      video.currentTime = 0;

      var playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(go);
      }

      video.addEventListener('ended', go, { once: true });
      video.addEventListener('error', go, { once: true });
      setTimeout(go, FALLBACK_DELAY);
    }

    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || link.target === '_blank') return;
      if (!/(^|\/)index\.html$/.test(href)) return;

      link.addEventListener('click', function (e) {
        e.preventDefault();
        playTransition(href);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
