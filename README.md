# Zella

Zella is an e-commerce web application built with [Next.js](https://nextjs.org/) and styled using [Tailwind CSS](https://tailwindcss.com/). It uses [Zustand](https://github.com/pmndrs/zustand) for state management, providing a seamless shopping experience with features like browsing products, managing a shopping cart, and checking out.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Scripts](#scripts)
- [Routes](#routes)
- [State Management](#state-management)
- [License](#license)

## Demo
Check out the live version here: [Zella Demo](https://zilla-nu.vercel.app/)

## Features
- **Home Page**: Product listings with search and filter capabilities.
- **Product Detail**: Individual product view with detailed information.
- **Shopping Cart**: Add, remove, and view items in the cart.
- **Checkout**: Complete the purchase process with success confirmation.
- **Responsive Design**: Mobile-first and responsive styling with Tailwind CSS.

## Technologies
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)

## Project Structure
The file structure follows a typical Next.js application:

```plaintext
zella/
├── components/        # Reusable UI components
├── pages/             # Application routes
│   ├── index.js       # Home page
│   ├── cart.js        # Cart page
│   ├── checkout.js    # Checkout page
│   ├── checkout/
│   │   └── success.js # Checkout success confirmation page
│   ├── login.js       # Login page
│   ├── register.js    # Registration page
│   ├── product/
│   │   ├── index.js   # Product listing page
│   │   └── [id].js    # Dynamic product detail page
├── public/            # Static assets
├── styles/            # Global styles and Tailwind CSS configurations
└── store/             # Zustand store for state management
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/Kreesta-r/zilla-ecommerce
cd zella
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

## Scripts

- `npm run dev` or `yarn dev`: Start the development server
- `npm run build` or `yarn build`: Build the production application
- `npm run start` or `yarn start`: Start the production server


## Routes

### Public Routes
- `/`: Home page with product listings
- `/product`: Product listing
- `/product/[id]`: Individual product details
- `/login`: User login
- `/register`: User registration

### Cart and Checkout Routes
- `/cart`: Shopping cart
- `/checkout`: Checkout process
- `/checkout/success`: Order confirmation page

## State Management

The application uses Zustand for efficient state management:

- **Cart Store**: Manages cart items, total price, and cart operations
- **Filter Store**: Handles product filtering
-

Example of a cart store:
```javascript
const useCartStore = create((set) => ({
  items: [],
  total: 0,
  addToCart: (product) => set((state) => ({
    items: [...state.items, product],
    total: state.total + product.price
  })),
  removeFromCart: (productId) => set((state) => ({
    items: state.items.filter(item => item.id !== productId),
    total: state.total - state.items.find(item => item.id === productId).price
  }))
}));
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Kreesta - [kreestalegend@gmail.com]

Project Link:https://github.com/Kreesta-r/zilla-ecommerce