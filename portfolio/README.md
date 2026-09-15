# Suman Sagar — Portfolio Website

A responsive, single-page portfolio built with plain HTML, CSS, and JavaScript (no build step, no framework required). Dark theme by default with a light-mode toggle, smooth-scroll navigation, and scroll-triggered reveal animations.

## Files

```
portfolio/
├── index.html      → all page content/sections
├── styles.css       → theme tokens, layout, responsive rules
├── script.js        → theme toggle, nav, scroll animations, contact form
├── assets/
│   ├── profile.jpg              → ⚠️ add your real photo here (see below)
│   ├── profile-placeholder.svg  → fallback shown if profile.jpg is missing
│   └── Suman_Sagar_Resume.pdf   → ⚠️ placeholder — replace with your real resume
└── README.md
```

## 1. Add your photo and resume

- Drop your circular-friendly headshot into `assets/profile.jpg` (any square-ish photo works — it's cropped into a circle by CSS). If the file is missing, an SVG placeholder shows instead so the layout never breaks.
- Replace `assets/Suman_Sagar_Resume.pdf` with your actual resume PDF, keeping the same filename (or update the `href` in the "Download Resume" button in `index.html` if you rename it).

## 2. Add your social links

Open `index.html` and search for `href="#"` — these are in the Connect section and the footer. Replace each with your real profile URL:

- GitHub
- LinkedIn
- Instagram
- Facebook

The four project cards also have `href="#"` placeholders under "View on GitHub →" — point each at its actual repository.

## 3. Wire up the contact form (required for it to actually send email)

Plain HTML/JS cannot send emails by itself — the form needs a small backend service in between. The form is already built to work with **Formspree** out of the box; **EmailJS** is a good alternative if you'd rather not have submissions leave your browser via a redirect service.

### Option A — Formspree (recommended, easiest)

1. Go to [formspree.io](https://formspree.io) and sign up for free.
2. Create a new form and set its destination to `sagarrookee1999@gmail.com`.
3. Copy the form endpoint it gives you (looks like `https://formspree.io/f/abc123xy`).
4. In `index.html`, find:
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   and replace `YOUR_FORM_ID` with your real ID.
5. Done — `script.js` already submits the form via `fetch` and shows a success/error message without leaving the page.

### Option B — EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com) and connect your Gmail account as an email service.
2. Create an email template addressed to `sagarrookee1999@gmail.com` with variables for name, email, and message.
3. Include the EmailJS SDK in `index.html` before `script.js`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```
4. Replace the form submit handler in `script.js` with an `emailjs.sendForm(...)` call using your service ID, template ID, and public key (all shown in your EmailJS dashboard).

Until one of these is set up, submitting the form will show a friendly "not configured yet" message instead of failing silently.

## 4. Customize content

Everything is in plain HTML in `index.html`, organized by section comment (`<!-- ===== Hero ===== -->`, etc.), so you can edit text directly. Colors, fonts, and spacing all live as CSS custom properties at the top of `styles.css` under `:root` (dark theme) and `[data-theme="light"]` (light theme) if you want to adjust the palette.

## 5. Preview locally

No build tools needed — just open `index.html` in a browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 6. Deploy

This is a static site, so it works on any static host:

- **GitHub Pages** — push this folder to a repo and enable Pages in settings.
- **Netlify / Vercel** — drag-and-drop the folder or connect the repo.
- **Any static host** — just upload the files as-is.

---

Built with semantic HTML, CSS custom properties, and vanilla JS (theme persistence via `localStorage`, scroll reveals via `IntersectionObserver`). Fully responsive down to small mobile widths, and respects `prefers-reduced-motion`.
