# Inventory Management Dashboard

A modern, responsive inventory management dashboard built with React, Vite, Tailwind CSS, and shadcn/ui components. The application provides a centralized view of product inventory, allowing users to view, search, add, edit, and delete products, along with summary statistics and visual insights.

## Tech Stack

- **React**
- **Vite**
- **Tailwind CSS** 
- **shadcn/ui components**
- **Recharts** (via shadcn/ui chart)
- **Lucide React icons**
- **Plain JavaScript**

## Features

- View all products in a responsive table
- Search and filter products
- Add, edit, and delete products
- Summary statistics (total products, low stock, etc.)
- Interactive charts and visual insights

## Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/BettyyN/inventory-dashboard.git
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm run dev
Open http://localhost:5173 in your browser.

The application runs entirely client-side using a mock API — no backend setup required.

Project Structure
nix
Copy code
src/
├── api/             # Mock API functions
├── components/      # Reusable UI components
├── App.jsx          # Main application component
├── main.jsx         # Entry point
└── index.css        # Global styles and theme
The dashboard features a clean, component-based architecture with responsive design and consistent theming using Tailwind CSS and shadcn/ui components.
