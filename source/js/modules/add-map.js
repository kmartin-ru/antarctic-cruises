const DESKTOP_WIDTH = '(min-width: 1024px)';
const TABLET_WIDTH = '(min-width: 768px) and (max-width: 1023px)';
const MOBILE_WIDTH = '(max-width: 767px)';
const isDesktopWidth = window.matchMedia(DESKTOP_WIDTH);
const isTabletWidth = window.matchMedia(TABLET_WIDTH);
const isMobileWidth = window.matchMedia(MOBILE_WIDTH);
const map = document.querySelector('[data-el="map"]');

map.addEventListener('click', function (evt) {
  evt.preventDefault();
});

ymaps.ready(init);

function init() {
  const myMap = new ymaps.Map(map, {
    center: [59.938635, 30.323118],
    zoom: 16,
  }, {
    suppressMapOpenBlock: true,
  });

  // get map center position and shift depending device width

  let position = myMap.getGlobalPixelCenter();
  position = [position[0], position[1]];
  const geoCenter = myMap.options.get('projection').fromGlobalPixels(position, myMap.getZoom());

  let positionDesktop = position;
  positionDesktop = [positionDesktop[0] + 20, positionDesktop[1] - 103];
  const geoCenterDesktop = myMap.options.get('projection').fromGlobalPixels(positionDesktop, myMap.getZoom());

  let positionTablet = position;
  positionTablet = [positionTablet[0] + 42, positionTablet[1] - 89];
  const geoCenterTablet = myMap.options.get('projection').fromGlobalPixels(positionTablet, myMap.getZoom());

  let positionMobile = position;
  positionMobile = [positionMobile[0] + 22, positionMobile[1] - 103];
  const geoCenterMobile = myMap.options.get('projection').fromGlobalPixels(positionMobile, myMap.getZoom());

  // shift map center position depending device width

  switch (true) {
    case isDesktopWidth.matches:
      myMap.setCenter(geoCenterDesktop);
      break;
    case isTabletWidth.matches:
      myMap.setCenter(geoCenterTablet);
      break;
    case isMobileWidth.matches:
      myMap.setCenter(geoCenterMobile);
      break;
  }

  // shift map center position and when resize window

  const onWindowResize = () => {
    switch (true) {
      case isDesktopWidth.matches:
        myMap.setCenter(geoCenterDesktop);
        break;
      case isTabletWidth.matches:
        myMap.setCenter(geoCenterTablet);
        break;
      case isMobileWidth.matches:
        myMap.setCenter(geoCenterMobile);
        break;
    }
  };

  window.addEventListener('resize', onWindowResize);

  // custom pin

  const myPlacemark = new ymaps.Placemark(geoCenter, {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/svg/pin.svg',
    iconImageSize: [18, 22],
  });

  // add custom pin

  myMap.geoObjects.add(myPlacemark);

  // remove default controls

  myMap.controls.remove('geolocationControl');
  myMap.controls.remove('searchControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('zoomControl');
  myMap.controls.remove('rulerControl');

  // disable scroll zoom with mouse

  myMap.behaviors.disable('scrollZoom');

  // remove copyright

  const copyright = document.querySelector('.ymaps-2-1-79-copyrights-pane');
  const copyrightLink = document.querySelector('.ymaps-2-1-79-copyright__link');
  const copyrightLogo = document.querySelector('.ymaps-2-1-79-copyright__logo');

  copyright.classList.add('visually-hidden');
  copyrightLink.setAttribute('tabindex', -1);
  copyrightLogo.setAttribute('tabindex', -1);
}
