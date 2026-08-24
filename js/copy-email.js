(function () {
  function init() {
    var button = document.querySelector('.copy-email');
    var toast = document.querySelector('.copy-toast');
    if (!button || !toast) return;

    var hideTimer = null;

    function showToast() {
      toast.classList.add('is-visible');
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 2000);
    }

    function fallbackCopy(text) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        /* no-op */
      }
      document.body.removeChild(textarea);
    }

    button.addEventListener('click', function () {
      var email = button.getAttribute('data-email');

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showToast, function () {
          fallbackCopy(email);
          showToast();
        });
      } else {
        fallbackCopy(email);
        showToast();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
