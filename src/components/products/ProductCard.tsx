import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  image_url?: string
  created_at: string
  profiles?: {
    username: string
  }
}

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden">
        {/* Image placeholder */}
        <div className="h-48 bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-emerald-600 text-xl font-semibold">
                  {product.title.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-emerald-600 text-sm">Product Image</p>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
              {product.title}
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full whitespace-nowrap ml-2">
              {product.category}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-emerald-600">
              {formatPrice(product.price)}
            </span>
            
            <div className="text-right">
              {product.profiles && (
                <p className="text-xs text-gray-500 mb-1">
                  by {product.profiles.username}
                </p>
              )}
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="h-3 w-3 mr-1" />
                {formatDate(product.created_at)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}