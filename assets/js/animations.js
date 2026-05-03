const Animations = (() => {
  function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  function init() {
    initScrollReveal();
  }

  return { init };
})();

const Typewriter = (() => {
  let roles = [];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeoutId = null;
  const el = () => document.getElementById('typewriter');

  function type() {
    if (!el()) return;
    const current = roles[roleIndex] || '';
    const display = isDeleting
      ? current.substring(0, charIndex - 1)
      : current.substring(0, charIndex + 1);

    el().textContent = display;
    isDeleting ? charIndex-- : charIndex++;

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === current.length) {
      speed = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }

    timeoutId = setTimeout(type, speed);
  }

  function restart(newRoles) {
    if (!newRoles?.length) return;
    if (timeoutId) clearTimeout(timeoutId);
    roles = newRoles;
    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    type();
  }

  function init(initialRoles) {
    roles = initialRoles || [];
    if (roles.length) type();
  }

  return { init, restart };
})();

const Projects = (() => {
  function buildCarousel(images, title) {
    const multi = images.length > 1;
    return `
      <div class="carousel-wrap">
        ${images.map((src, i) => `<img src="${src}" alt="${title}" loading="lazy" class="${i === 0 ? 'active' : ''}" />`).join('')}
      </div>
      ${multi ? `<div class="carousel-dots">
        ${images.map((_, i) => `<span class="carousel-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
      </div>` : ''}
    `;
  }

  function initCarousels() {
    document.querySelectorAll('.carousel-wrap').forEach(wrap => {
      const imgs = Array.from(wrap.querySelectorAll('img'));
      if (imgs.length <= 1) return;

      const dots = Array.from(wrap.closest('.project-img-wrap').querySelectorAll('.carousel-dot'));
      let idx = 0;
      let timer;

      function goTo(n) {
        imgs[idx].classList.remove('active');
        dots[idx]?.classList.remove('active');
        idx = n;
        imgs[idx].classList.add('active');
        dots[idx]?.classList.add('active');
      }

      const start = () => { timer = setInterval(() => goTo((idx + 1) % imgs.length), 3200); };
      const stop  = () => clearInterval(timer);

      dots.forEach((dot, i) => dot.addEventListener('click', () => { stop(); goTo(i); start(); }));
      wrap.addEventListener('mouseenter', stop);
      wrap.addEventListener('mouseleave', start);
      start();
    });
  }

  function render(data) {
    if (!data?.list) return;
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = data.list.map((project, i) => {
      const images = project.images?.length ? project.images : [project.image];
      return `
        <article class="project-card reveal" style="transition-delay: ${i * 0.1}s">
          <div class="project-img-wrap">
            ${buildCarousel(images, project.title)}
            <div class="project-overlay">
              ${project.demo
                ? `<a href="${project.demo}" target="_blank" rel="noopener" class="btn-project">
                    <i class="fa-solid fa-arrow-up-right-from-square"></i> ${data.btn_demo}
                   </a>`
                : `<span class="btn-project btn-coming">${data.coming_soon}</span>`}
              ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="btn-project btn-ghost">
                <i class="fa-brands fa-github"></i> ${data.btn_code}
              </a>` : ''}
            </div>
          </div>
          <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tech.map(t => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </article>
      `;
    }).join('');

    document.querySelectorAll('.project-card.reveal').forEach(el => {
      new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
      }, { threshold: 0.1 }).observe(el);
    });

    initCarousels();
  }

  return { render };
})();

const Timeline = (() => {
  function renderItems(items, type) {
    return items.map((item, i) => `
      <div class="timeline-item reveal" style="transition-delay: ${i * 0.1}s">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <span class="timeline-period">${item.period}</span>
          <h4>${type === 'job' ? item.role : item.degree}</h4>
          <span class="timeline-org">${type === 'job' ? item.company : item.institution}</span>
          ${item.description ? `<p>${item.description}</p>` : ''}
          <ul>
            ${item.items.map(li => `<li>${li}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }

  function render(data) {
    if (!data) return;
    const expContainer = document.getElementById('experience-list');
    const eduContainer = document.getElementById('education-list');

    if (expContainer && data.jobs) {
      expContainer.innerHTML = renderItems(data.jobs, 'job');
    }
    if (eduContainer && data.education) {
      eduContainer.innerHTML = renderItems(data.education, 'edu');
    }

    document.querySelectorAll('.timeline-item.reveal').forEach(el => {
      new IntersectionObserver((entries) => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
      }, { threshold: 0.1 }).observe(el);
    });
  }

  return { render };
})();
