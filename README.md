# Rapid Wash Website

A plain HTML/CSS/JS website for Rapid Wash — no build step, no frameworks, no dependencies. Just files you can push straight to GitHub and host for free with GitHub Pages.

## File structure

```
index.html      the whole site
styles.css      all styling
script.js       mobile menu, smooth scroll, and the quote form
assets/         photos and logo
favicon.svg     browser tab icon
opengraph.jpg   preview image for social media links
robots.txt      search engine crawling rules
```

## Deploy with GitHub Pages (free hosting)

1. Create a new repository on GitHub (e.g. `rapid-wash-site`).
2. Upload all the files in this folder to the repository (drag-and-drop on github.com works, or use `git push`).
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`, pick the `main` branch and `/ (root)` folder, then save.
5. GitHub will give you a live URL like `https://yourusername.github.io/rapid-wash-site/` within a minute or two.

## Using a custom domain

In the same **Settings → Pages** screen, add your domain under **Custom domain**. You'll also need to point your domain's DNS at GitHub's servers — GitHub's docs walk through the exact records: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## About the quote form

This site has no backend/database, so the "Get Your Quote Fast" form doesn't submit anywhere on its own. Right now it opens the visitor's email app with a pre-filled message addressed to:

```
rapidwashprosbros@gmail.com
```

To change that address, open `script.js` and edit the `QUOTE_REQUEST_EMAIL` constant near the top of the file.

If you'd rather have form submissions land quietly in an inbox or spreadsheet (no email app popup for the visitor), a free service like [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) can do that — it just means swapping the form's submit handler for a fetch call to their endpoint. Ask if you'd like this wired up.

## Editing content

Everything is in plain HTML in `index.html` — phone numbers, service list, reviews, and section text can all be edited directly, no compiling required. Colors and spacing live in `styles.css` as CSS custom properties at the top of the file.
