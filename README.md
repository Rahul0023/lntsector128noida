🏗️ L&T Sector 128 Noida Website
📌 Overview

This is a responsive real estate project website for L&T Sector 128, Noida.
It includes project highlights, amenities, gallery, developer info, and contact forms.

Built with:

HTML5 + TailwindCSS for responsive UI

JavaScript (main.js) for interactions

EmailJS for enquiry & booking forms

Hosted on Hostinger with GitHub integration

🚀 Features

📱 Mobile Navigation Drawer with overlay & smooth toggle

📩 Book a Site Visit form with date & time validation

✉️ Contact Form powered by EmailJS

📷 Property Gallery with hover effects

🔝 Back-to-top button with smooth scroll

🎨 TailwindCSS styled luxury theme

📂 Project Structure
root/
│── index.html        # Main landing page
│── style.css         # Custom styles (Tailwind-based)
│── main.js           # All JavaScript logic
│── README.md         # Documentation

🐞 Bug Fixes (Recent)

Mobile Navigation Toggle

✅ Closes on overlay click & menu item click

Overlay Behavior

✅ Overlay hides properly after closing nav & modals

Event Listeners

✅ Unified close logic, removed duplicates

Site Visit Booking

✅ Modal closes after submit, success message shown

Date & Time Validation

✅ Disabled past slots, auto-moves to next day if needed

EmailJS Submission

✅ Fixed blank values, added validation

UI/UX

✅ Fixed property card hover glitch

✅ Back-to-top button visibility fixed

✅ Mobile scroll locking bug resolved

⚙️ Setup & Development

Clone repo:

git clone https://github.com/Rahul0023/lntsector128noida.git
cd lntsector128noida


Open in VS Code or any editor.

Run locally:
Just open index.html in browser.

Deploy to Hostinger:

Push changes to GitHub

Sync GitHub repo in Hostinger panel

Auto-deploy enabled

🔑 EmailJS Configuration

Create EmailJS
 account

Add your Service ID & Template ID in main.js

Example:

const serviceId = "service_xxxxxxx";
const templateId = "template_xxxxxxx";
emailjs.init("your_public_key");