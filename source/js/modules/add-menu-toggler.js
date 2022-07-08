// variables

const OPEN_STATE_CLASS = 'is-open';
const MOBILE_WIDTH = '(max-width: 767px)';
const ABOVE_MOBILE_WIDTH = '(min-width: 768px)';
const isMobileWidth = window.matchMedia(MOBILE_WIDTH);
const isAboveMobileWidth = window.matchMedia(ABOVE_MOBILE_WIDTH);
const menu = document.querySelector('[data-el="menu"]');
const menuButton = document.querySelector('[data-el="menu-button"]');
const menuLinks = document.querySelectorAll('[data-el="menu-link"]');
const elementsToHide = document.querySelectorAll('[data-el="to-hide"]');

// escape checker

const isEscKey = (evt) => {
  return evt.key === 'Escape';
};

const onEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    hideMenu();
  }
};

// create/remove overlay

const createOverlay = () => {
  const menuOverlay = document.createElement('div');

  menuOverlay.classList.add('overlay');
  document.body.append(menuOverlay);
  document.body.style.overflowY = 'hidden';

  menuOverlay.addEventListener('click', hideMenu);
};

const removeOverlay = () => {
  const menuOverlay = document.querySelector('.overlay');

  menuOverlay.remove();
  document.body.style.overflowY = 'auto';

  menuOverlay.removeEventListener('click', hideMenu);
};

// menu state checker

const isMenuOpen = () => {
  return menu.classList.contains(OPEN_STATE_CLASS);
};

// show/hide elements

const showElementsUnderMenu = () => {
  elementsToHide.forEach((el) => {
    el.style.opacity = '1';
  });
};

const hideElementsUnderMenu = () => {
  elementsToHide.forEach((el) => {
    el.style.opacity = '0';
  });
};

// show/hide menu

const showMenu = () => {
  menu.classList.add(OPEN_STATE_CLASS);
  menuButton.classList.add(OPEN_STATE_CLASS);
  hideElementsUnderMenu();
  document.addEventListener('keydown', onEscKeydown);
  createOverlay();
};

const hideMenu = () => {
  menu.classList.remove(OPEN_STATE_CLASS);
  menuButton.classList.remove(OPEN_STATE_CLASS);
  showElementsUnderMenu();
  document.removeEventListener('keydown', onEscKeydown);
  removeOverlay();
};

// menu listeners

const onMenuButtonClick = () => {
  return isMenuOpen() ? hideMenu() : showMenu();
};

const onMenuLinkClick = () => {
  if (isMobileWidth.matches) {
    hideMenu();
  }
};

const onWindowResize = () => {
  if (isAboveMobileWidth.matches && isMenuOpen()) {
    hideMenu();
  }
};

// menu listeners in single function

const addMenuListeners = () => {
  menuButton.addEventListener('click', onMenuButtonClick);

  menuLinks.forEach((el) => {
    el.addEventListener('click', onMenuLinkClick);
  });

  window.addEventListener('resize', onWindowResize);
};

// end function for export

const addMenuToggler = () => {
  addMenuListeners();
};

addMenuToggler();
