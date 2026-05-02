const Nav = (() => {
  let menuOpen = false;

  function toggleMenu() {
    const nav = document.getElementById('nav');
    menuOpen = !menuOpen;
    nav.classList.toggle('responsive', menuOpen);
    document.querySelector('.nav-toggle').setAttribute('aria-expanded', menuOpen);
  }

  function closeMenu() {
    const nav = document.getElementById('nav');
    nav.classList.remove('responsive');
    menuOpen = false;
    document.querySelector('.nav-toggle').setAttribute('aria-expanded', false);
  }

  function highlightActive() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link) {
        link.classList.toggle('active', scrollY >= top && scrollY < top + height);
      }
    });
  }

  function scrollHeader() {
    const header = document.querySelector('.contenedor-header');
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  function init() {
    document.querySelector('.nav-toggle').addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    window.addEventListener('scroll', () => {
      highlightActive();
      scrollHeader();
    }, { passive: true });
  }

  return { init };
})();
