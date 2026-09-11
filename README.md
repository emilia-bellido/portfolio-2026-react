# Emilia Francisca Bellido - Digital Portfolio

A responsive, dynamic digital portfolio built with React and Vite. This application bridges front-end user experience with secure back-end data management, utilizing an Airtable base as a headless CMS to dynamically generate project cards.

**Live Demo:** [Insert your Vercel URL here]

## 🛠 Tech Stack
*   **Front-End:** React, Vite, JavaScript, HTML/CSS
*   **UI Framework:** React-Bootstrap, CSS Glassmorphism
*   **Back-End/API:** Vercel Serverless Functions (Node.js)
*   **Database/CMS:** Airtable API
*   **Deployment & Hosting:** Vercel

## ✨ Key Features
*   **Dynamic Data Fetching:** Project details, links, and tags are pulled in real-time from an Airtable database, allowing for content updates without redeploying the site.
*   **Secure API Routing:** Airtable Personal Access Tokens and Base IDs are protected using Vercel Serverless Functions (`/api/projects.js`), ensuring zero credential exposure on the client side.
*   **Responsive UX/UI:** Fully responsive layout utilizing Bootstrap's grid system, custom glassmorphism borders, and mobile-first design principles.
*   **Static Asset Management:** Direct resume downloading handled via Vite's public directory routing.
