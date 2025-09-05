import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../lib/supabaseClient'
import { ShoppingCart, Edit, Trash2, User, Clock, Tag } from 'lucide-react'

interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  image_url?: string
  user_id: string
  created_at: string
  profiles: {
    username: string
  }
}

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (id) {
      fetchProduct()
    }
  }, [id])

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          profiles (
            username
          )
        `)
        .eq('id', id)
        .single()

      if (error) throw error
      setProduct(data)
    } catch (error) {
      console.error('Error fetching product:', error)
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async () => {
    if (!user || !product) return

    setAddingToCart(true)
    try {
      const { error } = await supabase
        .from('cart')
        .insert([
          {
            user_id: user.id,
            product_id: product.id
          }
        ])

      if (error) {
        if (error.code === '23505') {
          setError('This item is already in your cart')
        } else {
          throw error
        }
      } else {
        setError('')
        // Show success message or redirect to cart
        navigate('/cart')
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error)
      setError('Failed to add to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  const deleteProduct = async () => {
    if (!product || !user || product.user_id !== user.id) return
    
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id)

      if (error) throw error
      navigate('/my-listings')
    } catch (error) {
      console.error('Error deleting product:', error)
      setError('Failed to delete product')
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/browse')}
            className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  const isOwner = user?.id === product.user_id

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="lg:h-96">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full bg-gradient-to-br from-emerald-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-emerald-600 text-3xl font-bold">
                        {product.title.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <p className="text-emerald-600">Product Image</p>
                  </div>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>

              <div className="text-4xl font-bold text-emerald-600 mb-6">
                {formatPrice(product.price)}
              </div>

              <div className="prose max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Seller Info */}
              <div className="border-t border-gray-200 pt-6 mb-8">
                <div className="flex items-center space-x-3 mb-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">
                    Sold by <span className="font-medium">{product.profiles.username}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Listed on {formatDate(product.created_at)}</span>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-6">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-4">
                {!isOwner && user && (
                  <button
                    onClick={addToCart}
                    disabled={addingToCart}
                    className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 font-medium"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>{addingToCart ? 'Adding to Cart...' : 'Add to Cart'}</span>
                  </button>
                )}

                {isOwner && (
                  <div className="flex space-x-4">
                    <button
                      onClick={() => navigate(`/edit-product/${product.id}`)}
                      className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Edit className="h-5 w-5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={deleteProduct}
                      className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}

                {!user && (
                  <div className="text-center">
                    <p className="text-gray-600 mb-4">Please sign in to add items to your cart</p>
                    <button
                      onClick={() => navigate('/login')}
                      className="bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}