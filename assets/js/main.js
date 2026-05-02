document.addEventListener('DOMContentLoaded', async () => {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('aNZb5pta1uvQsES2q');
  } else {
    console.warn('EmailJS no cargó. El formulario mostrará un aviso al enviar.');
  }

  await I18n.init();

  Nav.init();
  Animations.init();
  Contact.init();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => I18n.setLang(btn.dataset.lang));
  });
});
