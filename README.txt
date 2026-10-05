Harrison Arkue Jr. - Portfolio
Open index.html in a browser. No build step needed.

Edit:
- js/main.js  -> LINKS (LinkedIn / GitHub URLs), CERTS list, PROJECTS text, EMAIL. Empty link = button hidden.
- index.html  -> text, project descriptions
- css/style.css -> colours (variables at top), spacing, animation
- images/     -> replace photos, keep the same file names

Fonts (Big Shoulders Display, Manrope) load from Google Fonts when online.

Contact form: sends through FormSubmit to your email. Upload the site to a host (Netlify etc.),
send ONE test message, then click the activation link FormSubmit emails to you. After that it works.
If sending fails, it falls back to opening the visitor's email app.

Coming Soon handling:
- Buttons with no real link yet (LinkedIn, GitHub) open a "Coming Soon" card on the page.
- 404.html is shown automatically by Netlify / GitHub Pages / Vercel for any broken or missing address.
- coming-soon.html is the same page: use it as index.html while the full site is not live, or link to it from anything unfinished.
