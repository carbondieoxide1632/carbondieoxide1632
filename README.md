# AHNAF.BD - Portfolio & CO2-FEED Showcase

Welcome to the official repository for **AHNAF.BD**. This project is a high-end, minimalist photography portfolio and interactive social feed platform (CO2-FEED).

---

## 🚀 Experience the Live App
[**View the full interactive website here**](https://ais-pre-xhdivver3k26tcskgklqfx-104778091129.asia-southeast1.run.app)

---

## 🗺️ Project Site Architecture (A-Z)

This documentation catalogs the functional elements of the website.

### 1. Public Interface
- **Landing Page:** Minimalist hero, fluid animations, navigation to all sub-pages.
- **Photography Gallery:** Categorized (Street, Concert, Event) gallery with light-box functionality and responsive grid layout.
- **CO2-FEED:** Interactive social platform. Users can:
    - View posts (Images, PDF, Audio).
    - Engage (Like functionality).
    - Discuss (Nested comment threading and replies).
- **Projects Showcase:** Dynamic, filterable portfolio view.
- **Collaboration Portal:** Dedicated landing for project inquiries.

### 2. Admin Management Portal (`/admin`)
- **Secure Authentication:** Restricted to `ahnafmahidul32@gmail.com` via Supabase Auth + Email Verification.
- **Dashboard Hub:**
  - **Messages:** View contact form submissions.
  - **Inquiries:** View collaboration inquiries.
  - **Projects:** Create, list, and delete portfolio projects.
  - **Photography:** Categorized photo management with direct Cloudinary uploads.
  - **CO2-FEED:** Manage posts (Create, Upload media, Add Links/Captions).
  - **Profile:** Manage admin avatar for feed post authoring.

---

## 🛠 Tech Stack
- **Framework:** React 18+ with Vite (TypeScript).
- **Styling:** Tailwind CSS (Utility-first, responsive design).
- **Animations:** Framer Motion (`motion/react`) for layout and interaction.
- **Database/Auth:** Supabase (Real-time DB, Auth, Row Level Security).
- **Media Hosting:** Cloudinary (Dynamic assets, images, audio, PDF).

---

## 📦 How to Deploy (Your own GitHub)

To show this exact website to everyone from your GitHub repository:

1.  **Clone this repository:** `git clone [YOUR_REPO_URL]`
2.  **Environment Setup:** Create a `.env` file with your credentials:
    - `VITE_SUPABASE_URL`
    - `VITE_SUPABASE_ANON_KEY`
3.  **Deploy for Free:**
    - Go to your repository settings on GitHub.
    - Navigate to **"Pages"**.
    - Under "Build and deployment", select **"GitHub Actions"**.
    - This will host your site automatically at `https://[username].github.io/[repo-name]/`.

---
*Built with passion for visual storytelling.*
