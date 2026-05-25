# 🏠 RealNest — Real Estate Management System
**University Semester Project | React.js Frontend**

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js **v18 or higher** ([download](https://nodejs.org))
- npm (comes with Node.js)

### Step 1 — Install dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### Step 2 — Start the development server
```bash
npm run dev
```
Your app will open at **http://localhost:5173**

### Step 3 — Build for production (optional)
```bash
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          ← Top navigation bar
│   ├── Footer.jsx          ← Page footer
│   └── PropertyCard.jsx    ← Reusable property listing card
│
├── pages/
│   ├── Home.jsx            ← Landing page with hero, features, CTA
│   ├── Login.jsx           ← User login form
│   ├── Register.jsx        ← User registration form
│   ├── Properties.jsx      ← Browse/filter all properties
│   ├── PropertyDetails.jsx ← Single property detail view
│   └── AddProperty.jsx     ← Form to list a new property
│
├── styles/
│   ├── global.css          ← CSS reset, design tokens, utilities
│   ├── Navbar.css
│   ├── Footer.css
│   ├── PropertyCard.css
│   ├── Home.css
│   ├── Properties.css
│   ├── PropertyDetails.css
│   ├── AddProperty.css
│   └── Auth.css            ← Shared styles for Login & Register
│
├── data/
│   └── properties.js       ← Sample property data (mock database)
│
├── App.jsx                 ← Root component with React Router setup
└── main.jsx                ← Entry point
```

---

## 🗺️ Routing (React Router DOM v6)

| Path                 | Component         | Description              |
|----------------------|-------------------|--------------------------|
| `/`                  | `Home`            | Landing page             |
| `/properties`        | `Properties`      | Browse all listings      |
| `/properties/:id`    | `PropertyDetails` | Single property view     |
| `/add-property`      | `AddProperty`     | Add new listing form     |
| `/login`             | `Login`           | User sign-in             |
| `/register`          | `Register`        | Create account           |

---

## ✨ Features Implemented

- ✅ Responsive Navbar with mobile hamburger menu
- ✅ Hero section with live search bar
- ✅ Featured property cards
- ✅ Full property listing page with:
  - Search by title/location/type
  - Filter by type, status, max price
  - Sort by date, price (asc/desc)
- ✅ Property detail page with inquiry form
- ✅ Add Property form with client-side validation
- ✅ Login & Register pages with validation
- ✅ Fully responsive design (mobile-friendly)
- ✅ Pure CSS only — no frameworks

---

## 🛠 Tech Stack

| Layer     | Technology            |
|-----------|-----------------------|
| Framework | React 18 + Vite 5     |
| Routing   | React Router DOM v6   |
| Styling   | Pure CSS (CSS vars)   |
| Data      | Static JS mock data   |

---

## 📦 Key npm Commands

```bash
npm install       # Install all packages
npm run dev       # Start dev server (hot reload)
npm run build     # Build for production
npm run preview   # Preview production build locally
```

---

*Built with ❤️ as a university semester project*
