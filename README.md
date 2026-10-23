# BAS SALON — Luxury Static Website for GitHub Pages

A world-class, responsive, luxury static website created for **BAS SALON** (Kannur, Kerala). Built purely with **HTML5, CSS3, and Vanilla JavaScript** — zero build tools, zero dependencies, and 100% compatible with direct GitHub Pages hosting.

---

## 📁 File Structure

```text
├── index.html              # 1. Homepage (Hero, Highlights, Featured Services, Gallery Preview, Location)
├── about.html              # 2. About Page (Salon Philosophy, Hygiene Standards, Ambiance, Values)
├── services.html           # 3. Services Menu (Cuts, Color, Blowouts, Keratin, Spa & Grooming Cards)
├── prices.html             # 4. Price Guide (Categorized Service Tables & WhatsApp Quote Inquiries)
├── gallery.html            # 5. Visual Portfolio (25 Curated Photographs & Interactive Lightbox)
├── contact.html            # 6. Contact & Booking (Interactive WhatsApp Appointment Enquiry Form & Map)
├── style.css               # 7. Luxury Black & Gold CSS3 Stylesheet
├── script.js               # 8. Centralized Configuration, Mobile Navigation, Lightbox & Form Logic
├── README.md               # Documentation & GitHub Pages Guide
└── assets/
    └── images/             # 25 High-Resolution Salon Photographs & SVG Logo
        ├── logo.svg
        ├── hero.jpg
        ├── brunette-long.jpg
        ├── layered-cut.jpg
        ├── signature-blowout.jpg
        ├── glossy-highlights.jpg
        ├── modern-cut.jpg
        ├── hair-coloring.jpg
        ├── hair-treatment.jpg
        ├── salon-interior-1.jpg
        ├── salon-interior-2.jpg
        ├── styling-progress-1.jpg
        ├── styling-progress-2.jpg
        ├── hair-texture.jpg
        ├── salon-tools.jpg
        ├── salon-products.jpg
        ├── transformation-1.jpg
        ├── transformation-2.jpg
        ├── style-short-bob.jpg
        ├── style-curls.jpg
        ├── style-waves.jpg
        ├── style-mens-fade.jpg
        ├── style-mens-beard.jpg
        ├── salon-wash-basin.jpg
        ├── bridal-styling.jpg
        └── consultation.jpg
```

---

## 🎨 Brand Identity & Design Tokens

- **Primary Background:** `#080808`
- **Secondary Background:** `#111111`
- **Card Background:** `#171717`
- **Primary Luxury Gold:** `#D9A52E`
- **Bright Champagne Gold:** `#F2C45B`
- **Primary Text:** `#FFFFFF`
- **Secondary Text:** `#B8B8B8`
- **Borders:** `#303030`
- **Typography:** Cormorant Garamond (Editorial Serif) & Manrope (Modern Sans-Serif)

---

## ⚙️ 1. How to Configure the WhatsApp & Contact Number

All business contact details are centralized in a single configuration object at the top of **`script.js`**:

```javascript
const SALON_CONFIG = {
  name: "BAS SALON",
  // International WhatsApp number (country code + number without spaces or '+')
  whatsappNumber: "919895014575",
  phoneNumber: "+91 98950 14575",
  googleMapsUrl: "https://maps.app.goo.gl/YcxcJFjoY9m1UB8YA",
  address: "Kannur - Kuthuparamba Rd, Thayatheru, Thana, Kannur, Kerala 670002",
  hours: "Monday – Sunday: 9:00 AM – 9:00 PM"
};
```

To update your WhatsApp number, simply edit `whatsappNumber: "YOUR_NUMBER"` in `script.js`. All WhatsApp buttons across all 6 pages and the appointment enquiry form will automatically use the updated number.

---

## 🖼️ 2. How to Add or Replace the Logo

- The current emblem is saved as an SVG vector at `assets/images/logo.svg`.
- If you have an official high-resolution PNG or JPG logo (e.g. `logo.png`), place it in `assets/images/` and replace `src="assets/images/logo.svg"` in the `<header>` and `<footer>` of each of the six HTML files, or simply replace `assets/images/logo.svg` with your SVG logo file.

---

## 📸 3. How to Add or Replace Photographs

The website contains **25 curated salon photographs** inside `assets/images/`.
To substitute any image with your own authentic salon photos:
1. Save your photograph with the corresponding filename (e.g. `hero.jpg`, `layered-cut.jpg`, `salon-interior-1.jpg`).
2. Overwrite the file in `assets/images/`.
3. Clear your browser cache or refresh to view the new image.

---

## 💰 4. How to Edit Service Information and Prices

Open **`services.html`** or **`prices.html`** in any text editor.
- In `services.html`, edit the `<article class="service-card">` blocks to change titles, descriptions, and categories.
- In `prices.html`, modify the table rows inside `<tr class="pricing-row">`. Replace `On Consultation` with your exact price (e.g. `₹450`, `₹1,200`, etc.) whenever verified.

---

## 🚀 5. How to Upload to GitHub and Enable GitHub Pages

1. **Create a GitHub Repository:**
   - Log in to [GitHub](https://github.com) and click **New Repository**.
   - Name it (for example: `bas-salon`).
   - Choose **Public**.

2. **Upload All Files:**
   - Upload the 6 HTML files (`index.html`, `about.html`, `services.html`, `prices.html`, `gallery.html`, `contact.html`), `style.css`, `script.js`, and the `assets/` folder directly to the root of the repository.
   - Or push via git:
     ```bash
     git init
     git add .
     git commit -m "Initial BAS SALON static website"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/bas-salon.git
     git push -u origin main
     ```

3. **Enable GitHub Pages:**
   - Go to your repository's **Settings** tab.
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment > Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` (or `master`) and folder `/(root)`, then click **Save**.
   - Within 1–2 minutes, GitHub will publish your live website at:
     `https://YOUR_USERNAME.github.io/bas-salon/`

4. **Testing the Published Website:**
   - Open your GitHub Pages URL on both your phone and computer.
   - Verify that all navigation links work seamlessly across all six pages.
   - Test the mobile hamburger menu and ensure it smoothly opens and closes.
   - Test submitting the appointment form on `contact.html` to confirm that WhatsApp opens with your prefilled appointment message.
