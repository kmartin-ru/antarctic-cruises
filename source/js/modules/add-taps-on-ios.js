if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
  const routesCards = document.querySelectorAll('.route__wrapper');

  routesCards.forEach((el) => {
    el.addEventListener('touchstart', function () {
      el.classList.toggle('is-open');
    });
  });
}
