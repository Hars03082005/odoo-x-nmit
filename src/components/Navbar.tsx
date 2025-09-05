import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ShoppingCart, User, LogOut, Leaf, Menu } from 'lucide-react'

export const Navbar = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-emerald-800">EcoFinds</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Home
            </Link>
            <Link to="/browse" className="text-gray-700 hover:text-emerald-600 transition-colors">
              Browse
            </Link>
            {user && (
              <>
                <Link to="/my-listings" className="text-gray-700 hover:text-emerald-600 transition-colors">
                  My Listings
                </Link>
                <Link to="/cart" className="text-gray-700 hover:text-emerald-600 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {profile?.username || user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-1 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-emerald-600"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-emerald-600 px-3 py-2">
                Home
              </Link>
              <Link to="/browse" className="text-gray-700 hover:text-emerald-600 px-3 py-2">
                Browse
              </Link>
              {user && (
                <>
                  <Link to="/my-listings" className="text-gray-700 hover:text-emerald-600 px-3 py-2">
                    My Listings
                  </Link>
                  <Link to="/cart" className="text-gray-700 hover:text-emerald-600 px-3 py-2">
                    Cart
                  </Link>
                </>
              )}
              {user ? (
                <div className="px-3 py-2">
                  <div className="text-sm text-gray-600 mb-2">
                    {profile?.username || user.email}
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="px-3 py-2 space-y-2">
                  <Link
                    to="/login"
                    className="block text-emerald-600 hover:text-emerald-700"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block bg-emerald-600 text-white px-4 py-2 rounded-lg text-center hover:bg-emerald-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}