# odoo-x-nmit
# EcoFinds - Sustainable Marketplace

A React-based marketplace application for buying and selling sustainable products, built with Supabase backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Setup Instructions

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd odoo-x-nmit-main
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your Supabase credentials
   # Get these from your Supabase project dashboard
   ```

3. **Supabase Setup:**
   - Create a new Supabase project
   - Run the database migrations in the `supabase/migrations/` folder
   - Copy your project URL and anon key to the `.env` file

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🛠️ Database Error Troubleshooting

If you encounter database errors when saving new users:

### Common Issues:

1. **Missing Environment Variables**
   - Ensure `.env` file exists with `VITE_SUPABASE_ANON_KEY`
   - Verify the Supabase URL and key are correct

2. **Database Schema Issues**
   - Run the migrations in order:
     - `20250905214144_icy_meadow.sql` (creates tables and policies)
     - `20250905214856_orange_peak.sql` (fixes profile creation policy)

3. **RLS (Row Level Security) Policies**
   - Ensure RLS is enabled on all tables
   - Verify policies allow authenticated users to create profiles

### Debug Steps:

1. Check browser console for Supabase connection errors
2. Verify environment variables are loaded correctly
3. Test database connection in Supabase dashboard
4. Check RLS policies in Supabase SQL editor

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/          # Login/Signup components
│   ├── cart/          # Shopping cart
│   ├── products/      # Product-related components
│   └── Navbar.tsx     # Navigation
├── contexts/
│   └── AuthContext.tsx # Authentication state management
├── lib/
│   └── supabaseClient.js # Supabase configuration
└── pages/              # Main application pages
```

## 🔧 Technologies Used

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth)
- **Build Tool:** Vite
- **Icons:** Lucide React

## 📝 Features

- User authentication (signup/login)
- Product browsing and management
- Shopping cart functionality
- Responsive design
- Real-time database updates

## 🐛 Known Issues Fixed

- ✅ Duplicate user creation logic consolidated
- ✅ Environment variable validation added
- ✅ Better error handling for profile creation
- ✅ Race condition prevention in signup flow
- ✅ Product display issues resolved
- ✅ RLS policies fixed for public product browsing
- ✅ Sample products added for testing

## 🛍️ Product Display Features

The application now properly displays products when clicked:

### Product Browsing
- **Browse Page**: View all products with search and filtering
- **Product Cards**: Clickable cards that navigate to product details
- **Product Details**: Full product information with seller details
- **Public Access**: Products can be viewed without authentication

### Navigation Flow
1. **Browse Products** → Click on any product card
2. **Product Detail** → View full product information
3. **Add to Cart** → Requires authentication
4. **Edit/Delete** → Only available to product owner

### Database Migrations
Run these migrations in order:
1. `20250905214144_icy_meadow.sql` - Base schema
2. `20250905214856_orange_peak.sql` - Profile creation fix
3. `20250106000000_fix_products_policy.sql` - Public product access
4. `20250106000001_sample_products.sql` - Sample data (optional)
