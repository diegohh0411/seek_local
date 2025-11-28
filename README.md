# SEEK Local - Monterrey 2025

> **Experience the event before it begins.**

A modern, high-performance conference platform built for the **SEEK Local** event in Monterrey, NL. This application serves as the digital heart of the conference, managing the schedule, speaker lineups, and attendee registrations with a focus on speed and fluid user experience.

## 🛠 Tech Stack

![Astro](https://img.shields.io/badge/astro-%232C2052.svg?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ Key Features

*   **⚡️ Zero-JS by Default:** Built on **Astro**, shipping minimal JavaScript to the client. Heavy interactivity (like forms) is loaded only when needed via "Islands Architecture."
*   **📅 Real-Time Content Management:** Seamlessly integrated with the **Notion API**. Organizers can update the schedule, speaker bios, and event details in Notion. They can trigger a rebuild of the site via a button in Notion that sends a webhook to Vercel.
*   **🎟 Smart Conference Pass:** Automatically generates a personalized digital pass with a scannable barcode (via **JsBarcode**) for every attendee, tracking their payment status in real-time.
*   **🎨 Cinematic Animations:** Features immersive parallax scrolling and scroll-triggered reveals powered by **GSAP** and **Lenis** for a premium, app-like feel.
*   **📝 Robust Registration:** A complex, validated registration flow using **React Hook Form** and **Zod**, ensuring data integrity for hundreds of attendees.

## 🏗 Architectural Decisions

### Why Astro?
For a conference website, 90% of the content (schedule, FAQs, speaker info) is static. Using a traditional SPA (Single Page App) would be overkill and hurt SEO/performance. **Astro** allows us to render HTML on the server and only "hydrate" the interactive parts (like the registration form and countdown) with React. This ensures the site loads instantly, even on congested venue WiFi.

### Why Notion as a CMS?
Building a custom admin dashboard takes time. By using **Notion** as the database, we provided the non-technical organizing team with a familiar interface they already used. This decoupled the content management from the codebase, allowing for rapid iteration on event details.

### Why TypeScript & Zod?
Event registration data is critical. We used **TypeScript** across the full stack to prevent runtime errors and **Zod** to strictly validate user input on both the client and server. This strict type safety ensures that we capture valid, formatted data for every single attendee.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/diegohh0411/seek_local
    cd seek-local
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The app will run at `http://localhost:4321`.

## 🛣 Project Status & Roadmap

The project is currently in **Active Development / Beta**.

*   [x] Landing Page with Parallax Hero
*   [x] Notion Integration (Schedule & Speakers)
*   [x] Registration Logic with Zod Validation
*   [x] Digital Conference Pass with Barcode
*   [ ] **Feature:** Admin Check-in System / Scanner
*   [ ] **Feature:** Add "Add to Calendar" functionality for specific talks

---
*Developed by Diego Hernández Herrera*