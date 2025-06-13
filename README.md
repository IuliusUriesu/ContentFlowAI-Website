# ContentFlowAI-Website

This package contains the frontend for the ContentFlowAI application, built with **React + TypeScript** and styled using **Tailwind CSS**.

The app is a static website deployed to **Amazon S3** and served globally via **CloudFront CDN**. It connects to a backend powered by AWS Lambda and API Gateway, and uses **Amazon Cognito** for user authentication.

Live at: [https://content.cleverlayer.com](https://content.cleverlayer.com)

---

## ⚙️ Tech Stack

- **Framework**: React + TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: `react-oidc-client`, `oidc-client-ts` (via Amazon Cognito)
- **Hosting**: S3 + CloudFront (deployed via CDK)

---

## 🔐 Authentication

All users must log in through **Amazon Cognito**. The frontend integrates with Cognito using the OIDC protocol to authenticate users and retrieve access tokens, which are used to securely call protected API endpoints.

---

## 🌐 Environment Variables

This project uses multiple environment configuration files for different stages:

- `.env.test` – for local testing
- `.env.dev` – for development stage
- `.env.prod` – for production deployment

These files control the API base URL, Cognito client details, and other environment-specific values.

---

## 📁 Project Structure

```text
contentflowai-website/
├── public/                        # Static public assets
├── src/
│   ├── config/                    # Static configuration values
│   ├── context/                   # React context providers
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Low-level libraries or wrappers
│   ├── model/                     # Types and interfaces
│   ├── reducers/                  # Global state reducers
│   ├── services/                  # API services and integrations
│   ├── ui/
│   │   ├── components/            # Reusable UI components
│   │   ├── layouts/               # Page layout components
│   │   ├── routing/               # Route definitions and guards
│   │   └── pages/                 # Page-level views
│   ├── utils/                     # Helper functions and utilities
│   ├── App.tsx                    # Root application component
│   └── main.tsx                   # App entry point
├── .env.*                         # Environment configs
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🧪 Local Development

To run the app locally:

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

Make sure you have a valid `.env.test` file set up before running locally.

---

## 🚀 Production Build

To build the app for production deployment:

```bash
npm run build:prod
```

This generates a static site in the `build/` folder, ready to be uploaded to the S3 bucket configured via CDK.

---

## 🛠 Maintainer

Built and maintained by Iulius Urieșu.
