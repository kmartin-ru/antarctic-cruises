const bookingForm = document.querySelector('[data-el="booking-form"]');
const inputTel = bookingForm.querySelector('[type="tel"]');

inputTel.addEventListener('invalid', () => {
  if (inputTel.validity.patternMismatch) {
    inputTel.setCustomValidity('Введите номер в формате +7 XXX XX-XX-XX');
  } else {
    inputTel.setCustomValidity('');
  }
});

inputTel.addEventListener('input', () => {
  const telMask = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
  const isTelMatches = telMask.test(inputTel.value);

  if (!isTelMatches) {
    inputTel.setCustomValidity('Введите номер в формате +7 XXX XX-XX-XX');
  } else {
    inputTel.setCustomValidity('');
  }

  inputTel.reportValidity();
});
