const I18n = (() => {
  const cache = {}
  let current = {}
  let currentLang = localStorage.getItem('lang') || 'es'

  function get(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = get(current, el.getAttribute('data-i18n'))
      if (value !== undefined) el.textContent = value
    })
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = get(current, el.getAttribute('data-i18n-html'))
      if (value !== undefined) el.innerHTML = value
    })
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = get(current, el.getAttribute('data-i18n-placeholder'))
      if (value !== undefined) el.placeholder = value
    })
  }

  function updateToggle(lang) {
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang)
    })
  }

  function renderDynamic() {
    Projects.render(current.projects)
    Timeline.render(current.resume)
  }

  function updateCvLink() {
    const link = document.getElementById('cv-link')
    if (!link) return

    const file = t('about.cv_file')
    if (file) {
      link.href = file
    }
  }

  async function setLang(lang) {
    if (!cache[lang]) {
      try {
        const res = await fetch(`data/i18n/${lang}.json`)
        cache[lang] = await res.json()
      } catch (e) {
        console.error('i18n load error:', lang, e)
        return
      }
    }
    current = cache[lang]
    currentLang = lang
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
    applyTranslations()
    updateCvLink()
    renderDynamic()
    updateToggle(lang)
    Typewriter.restart(current.hero?.roles || [])
  }

  function t(key) {
    return get(current, key) ?? key
  }

  function getLang() {
    return currentLang
  }

  async function init() {
    await setLang(currentLang)
  }

  return { init, setLang, t, getLang }
})()
