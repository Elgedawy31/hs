import React, { useState } from 'react'
import SEO from '../components/SEO'
import { useTheme } from '../contexts/ThemeContext'
import { Minus, Plus, X, Heart } from 'lucide-react'
import UniBtn from '../components/UniBtn'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, increaseQuantity, decreaseQuantity, toggleFavorite } from '../store/cartSlice'

function Cart() {
  const { theme } = useTheme()
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const [paymentMethod, setPaymentMethod] = useState('cash') // 'online' or 'cash'

  // Calculate subtotal
  const subtotal = cartItems.reduce((total, product) => {
    // Handle price that might be a string with "LE" suffix
    const price = typeof product.price === 'string' 
      ? parseFloat(product.price.replace(' LE', '')) 
      : product.price;
    
    return total + (price * product.quantity)
  }, 0)

  const shipping = 100
  const total = subtotal + shipping

  // Handle quantity change
  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id))
  }

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id))
  }

  // Handle remove product
  const handleRemoveProduct = (id) => {
    dispatch(removeFromCart(id))
  }

  // Toggle favorite
  const handleToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <SEO 
        title={`HS - Healthcare Solutions - Cart`}
        description={`Cart page for HS - Healthcare Solutions`}
      />
      
      {/* Cart Header - Hidden on mobile */}
      <div className="hidden md:grid md:grid-cols-4 gap-4 mb-4 font-semibold text-text">
        <div>Product</div>
        <div className="text-center">Price</div>
        <div className="text-center">Quantity</div>
        <div className="text-center">Total</div>
      </div>
      
      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="text-sm mt-2">Add some products to your cart to see them here.</p>
          </div>
        ) : (
          cartItems.map(product => (
          <div 
            key={product.id} 
            className="flex flex-col md:grid md:grid-cols-4 gap-4 items-center p-4 rounded-lg bg-altPrimary shadow-sm"
          >
            {/* Product - Full width on mobile */}
            <div className="w-full md:w-auto flex items-center justify-center md:justify-start space-x-4 mb-4 md:mb-0">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg"
              />
            </div>
            
            {/* Price - With labels on mobile */}
            <div className="w-full md:w-auto flex justify-between md:block md:text-center mb-4 md:mb-0">
              <span className="font-medium md:hidden">Price:</span>
              <div className="flex flex-col md:block items-end md:items-center">
                <p>{product.price} LE</p>
                <button 
                  onClick={() => handleToggleFavorite(product.id)}
                  className="mt-2"
                >
                  <Heart 
                    className={`${product.isFavorite ? 'fill-primary' : ''} text-primary`} 
                    size={20} 
                  />
                </button>
              </div>
            </div>
            
            {/* Quantity - With labels on mobile */}
            <div className="w-full md:w-auto flex justify-between md:justify-center items-center mb-4 md:mb-0">
              <span className="font-medium md:hidden">Quantity:</span>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => handleDecreaseQuantity(product.id)}
                  className="p-1 rounded-full border border-borderColor"
                >
                  <Minus size={16} />
                </button>
                
                <span className="w-8 text-center">{product.quantity}</span>
                
                <button 
                  onClick={() => handleIncreaseQuantity(product.id)}
                  className="p-1 rounded-full border border-borderColor"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Total - With labels on mobile */}
            <div className="w-full md:w-auto flex justify-end items-center">
              <span className="font-medium md:hidden">Total:</span>
              <div className="flex items-center space-x-4">
                <span>
                  {typeof product.price === 'string' 
                    ? `${parseFloat(product.price.replace(' LE', '')) * product.quantity} LE`
                    : `${product.price * product.quantity} LE`
                  }
                </span>
                <button 
                  onClick={() => handleRemoveProduct(product.id)}
                  className="p-1 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        )))}
      </div>
      
      {/* Payment and Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-altPrimary rounded-lg p-4 md:p-6 shadow-sm">
        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Choose Pay way</h3>
          
          <div className="space-y-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center ${paymentMethod === 'online' ? 'border-primary' : 'border-borderColor'}`}>
                {paymentMethod === 'online' && (
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
              </div>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="online" 
                checked={paymentMethod === 'online'} 
                onChange={() => setPaymentMethod('online')} 
                className="hidden"
              />
              <span>Online</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <div className={`w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center ${paymentMethod === 'cash' ? 'border-primary' : 'border-borderColor'}`}>
                {paymentMethod === 'cash' && (
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
              </div>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="cash" 
                checked={paymentMethod === 'cash'} 
                onChange={() => setPaymentMethod('cash')} 
                className="hidden"
              />
              <span>Cash on delivery</span>
            </label>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>SubTotal</span>
            <span className="font-semibold">{subtotal} LE</span>
          </div>
          
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-semibold">{shipping} LE</span>
          </div>
          
          <div className="flex justify-between border-t border-borderColor pt-4">
            <span>Total</span>
            <span className="font-semibold">{total} LE</span>
          </div>
          
          <div className="mt-6">
            <UniBtn 
              text="CheckOut" 
              className="w-full text-white" 
              onClick={() => alert('Checkout process initiated')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
