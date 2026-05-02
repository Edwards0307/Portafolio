const Contact = (() => {
  const EMAIL_REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  const SERVICE_ID = 'contact_service';
  const TEMPLATE_ID = 'contact_form';

  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i> ${message}`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  function validateEmail(email) {
    return EMAIL_REGEX.test(email);
  }

  function setFormState(btn, loading) {
    btn.disabled = loading;
    btn.querySelector('.btn-text').textContent = loading
      ? I18n.t('contact.sending')
      : I18n.t('contact.send_btn');
    btn.querySelector('.btn-spinner').style.display = loading ? 'inline-block' : 'none';
  }

  function init() {
    const form = document.getElementById('contact-form');
    const emailInput = document.getElementById('user_email');
    const emailError = document.getElementById('email-error');

    if (!form) return;

    emailInput.addEventListener('input', () => {
      const valid = validateEmail(emailInput.value);
      emailError.textContent = emailInput.value && !valid ? I18n.t('contact.invalid_email') : '';
      emailInput.classList.toggle('input-error', emailInput.value && !valid);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('#contact-btn');

      if (!validateEmail(emailInput.value)) {
        emailError.textContent = I18n.t('contact.invalid_email');
        emailInput.classList.add('input-error');
        emailInput.focus();
        return;
      }

      setFormState(btn, true);

      try {
        if (typeof emailjs === 'undefined') {
          throw new Error('EmailJS no está disponible. Verifica tu conexión o desactiva el bloqueador de anuncios.');
        }
        await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
        showToast(I18n.t('contact.success'), 'success');
        form.reset();
        emailError.textContent = '';
        emailInput.classList.remove('input-error');
      } catch (err) {
        console.error('EmailJS error:', err);
        showToast(I18n.t('contact.error'), 'error');
      } finally {
        setFormState(btn, false);
      }
    });
  }

  return { init };
})();
