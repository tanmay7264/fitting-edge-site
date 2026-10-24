# Fitting Edge · website

Static site for Fitting Edge: browse services, view details, book a visit, contact. No build step.

- Run locally: `python3 -m http.server` in this folder, then open http://localhost:8000
- Edit content (services, contact details, FAQ): `data.js`
- Before launch: replace the placeholder phone, WhatsApp and email in `data.js`, and set `formEndpoint` to a form service (e.g. Formspree) to receive bookings. Without it, forms open a pre-filled email.
