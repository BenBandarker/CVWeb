# Personal Portfolio Website

A responsive personal portfolio website showcasing my projects, skills, education, and contact information.  
Built with **HTML, CSS, and vanilla JavaScript**, and deployed with **Netlify**.  
Includes animated sections, a secure contact form, and a clean folder structure for maintainability.

---

## 🚀 Features

- **Animated Sections** – Smooth scroll animations using [ScrollReveal](https://scrollrevealjs.org/).
- **Contact Form with EmailJS** – Messages are sent directly via EmailJS.
- **Secure API Keys** – All sensitive keys are stored in Netlify environment variables (not exposed in the code).
- **Responsive Layout** – Optimized for desktop and mobile devices.
- **Clean Assets Structure** – CSS, JS, and images organized under `assets/`.

---

## 📂 Project Structure

```
CVWeb/
├─ index.html
├─ assets/
│  ├─ css/
│  │  └─ styles.css
│  ├─ js/
│  │  └─ main.js
│  └─ img/
│     └─ ... images ...
├─ netlify/
│  └─ functions/
│     └─ send-email.js   # Serverless function (optional if using EmailJS only for client-side)
├─ _redirects
├─ CNAME
├─ netlify.toml
└─ README.md
```

---

## ⚙️ Setup & Deployment

### 1. Clone the repository

```bash
git clone https://github.com/BenBandarker/portfolio.git
cd portfolio
```

### 2. Install dependencies

This project is pure **HTML/CSS/JS**, so no build tools are required.  
If you use Netlify functions, ensure you have Node.js installed.

### 3. Environment Variables

Set the following in **Netlify → Site Settings → Environment Variables**:

- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`

These are used by EmailJS to securely send emails.

### 4. Run locally

Simply open `index.html` in your browser, or serve with:

```bash
npx serve .
```

### 5. Deploy

Push to GitHub and connect the repository to Netlify.  
Netlify will handle deployment automatically.

---

## 🛠️ Technologies

- **Frontend:** HTML5, CSS3, JavaScript
- **Animations:** ScrollReveal
- **Email Service:** EmailJS
- **Hosting & CI/CD:** Netlify

---

## 📬 Contact

- **Website:** [benbandarker.com](https://benbandarker.com)
- **LinkedIn:** [linkedin.com/in/benbandarker](https://linkedin.com/in/benbandarker)
- **GitHub:** [github.com/BenBandarker](https://github.com/BenBandarker)
