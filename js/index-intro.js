(function () {
  function init() {
    var overlay = document.querySelector('.page-transition');
    var video = overlay ? overlay.querySelector('video') : null;
    if (!overlay || !video) return;

    try {
      if (window.sessionStorage.getItem('skipIndexIntro')) {
        window.sessionStorage.removeItem('skipIndexIntro');
        return;
      }
    } catch (err) {
      /* no-op */
    }

    var FALLBACK_DELAY = 4000;
    var revealed = false;

    function reveal() {
      if (revealed) return;
      revealed = true;
      overlay.classList.remove('is-active');
    }

    overlay.classList.add('is-active');
    video.currentTime = 0;

    var playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(reveal);
    }

    video.addEventListener('ended', reveal, { once: true });
    video.addEventListener('error', reveal, { once: true });
    window.setTimeout(reveal, FALLBACK_DELAY);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
