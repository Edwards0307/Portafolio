# Edwards Ardila — Portfolio

Personal developer portfolio showcasing my projects, skills and professional experience.

## Live Demo
https://portafolio-seven-amber.vercel.app/

## Tech Stack
- HTML5 / CSS3 / Vanilla JavaScript
- Font Awesome 6.5
- EmailJS (contact form)
- Google Fonts (JetBrains Mono + Inter)

## Features
- Bilingual (ES / EN) — language persists via localStorage
- Typing animation in hero section
- Scroll reveal animations (IntersectionObserver)
- Data-driven projects and timeline — add a project by editing `data/i18n/*.json`
- Contact form via EmailJS with toast notifications
- Fully responsive (mobile, tablet, desktop)
- Custom scrollbar and CSS custom properties for easy theming

## Project Structure
```
assets/
  css/main.css          # All styles with CSS custom properties
  js/
    i18n.js             # Multilanguage system
    nav.js              # Navigation, active links, scroll effect
    animations.js       # Scroll reveal, typewriter, dynamic renders
    contact.js          # Contact form + validation
    main.js             # Entry point
  img/
    profile/            # Profile photo
    skills/             # Tech logos
    projects/           # Project screenshots
    bg/                 # Background images
  docs/                 # CV download (ESP + ENG)
data/
  i18n/
    es.json             # Spanish content
    en.json             # English content
```

## Adding a New Project
Edit both `data/i18n/es.json` and `data/i18n/en.json`, add an entry to the `projects.list` array:
```json
{
  "id": "my-project",
  "title": "My Project",
  "description": "Short description.",
  "tech": ["React", "Node.js"],
  "demo": "https://...",
  "github": "https://github.com/Edwards0307",
  "image": "assets/img/projects/my-project.jpg"
}
```
Then drop the screenshot in `assets/img/projects/`.

## Running Locally
Requires a local server (fetch is used for i18n JSON files):
```bash
# Python
python3 -m http.server 3000

# Node
npx serve .
```
Then open `http://localhost:3000`.

## Author
**Edwards Ardila** — Full Stack .NET Developer  
[LinkedIn](https://www.linkedin.com/in/edwards-ardila-desarrollador-full-stack/) · [GitHub](https://github.com/Edwards0307)
