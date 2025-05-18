

# Fakestore Next.js App

A responsive e-commerce frontend built with Next.js, Redux Toolkit, Tailwind CSS, and shadcn/ui.  
Features product listing from FakeStore API, a dynamic cart sidebar, product details modal, and a custom tooltip for quick info preview.

---

## 📂 Project Structure

```

src/
├── app/                           # Next.js App Router pages and layouts
├── components/                    # React components
│   ├── Cart.jsx                   # Cart sidebar component
│   ├── CartItem.jsx               # Cart item with quantity controls and tooltip
│   ├── HoverTooltip.jsx           # Custom tooltip component with delay and dynamic positioning
│   ├── Navbar.jsx                 # Navigation bar with search, cart toggle, and profile icon
│   ├── ProductCard.jsx            # Product card with add-to-cart and tooltip
│   ├── ProductDetailsModal.jsx    # Modal component for detailed product info
│   └── ProductDetailsTooltip.jsx  # Tooltip wrapper (optional if used)
├── store/                         # Redux Toolkit slices and store config
│   ├── cartSlice.js
│   ├── productSlice.js
│   └── searchSlice.js
├── api/                           # API calls and utilities (e.g. fakestore API)
│   └── api.js
├── styles/                        # Global CSS and Tailwind config
│   └── globals.css
└── ...

````

---

## 🛠 Tech Stack

- **Next.js 13** — React framework with App Router and server/client components  
- **React 18** — Frontend UI library  
- **Redux Toolkit** — State management (cart, products, search)  
- **Tailwind CSS** — Utility-first CSS framework for styling  
- **shadcn/ui** — Accessible UI components based on Radix UI primitives  
- **React Icons** — For cart and profile icons  
- **FakeStore API** — Public API for product data  
- **React Portal** — For rendering tooltip outside overflow containers  

---

## 🚀 Running Locally

### Prerequisites

- Node.js (>=16.x recommended)  
- npm or yarn package manager  

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/Shourov98/cloudone-test.git
   cd cloudone-test


2. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or yarn:

   ```bash
   yarn
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

   Or with yarn:

   ```bash
   yarn dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the app in action.

---

## ⚙️ Additional Notes

* **State management:**
  Redux Toolkit slices manage product fetching, cart state, and search filtering.

* **Tooltips & Modals:**

  * Custom `HoverTooltip` uses React portals to prevent clipping inside scrollable/cart sidebar.
  * Product details modal appears on image click with full product info.

* **Styling:**
  Tailwind CSS with customizations in `globals.css` and class-based component styling.

---

## 📫 Contact

For questions or contributions, please open an issue or contact \[[mahbubulhoqueshourov@gmail.com](mailto:mahbubulhoqueshourov@gmail.com)].

---

Enjoy exploring and customizing your Fakestore app! 🎉

