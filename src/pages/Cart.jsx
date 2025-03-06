import React, { useState } from 'react'
import SEO from '../components/SEO'
import { useTheme } from '../contexts/ThemeContext'
import { Minus, Plus, X, Heart } from 'lucide-react'
import UniBtn from '../components/UniBtn'

// Sample product data - in a real app this would come from a state or context
const initialProducts = [
  {
    id: 1,
    name: "Product 1",
    image: "/src/assets/Images/Med1.jpg",
    price: 300,
    quantity: 1,
    isFavorite: false
  },
  {
    id: 2,
    name: "Product 2",
    image: "/src/assets/Images/Med2.jpg",
    price: 400,
    quantity: 2,
    isFavorite: true
  },
  {
    id: 3,
    name: "Product 3",
    image: "/src/assets/Images/Med3.jpg",
    price: 320,
    quantity: 2,
    isFavorite: false
  }
]

function Cart() {
  const { theme } = useTheme()
  const [products, setProducts] = useState(initialProducts)
  const [paymentMethod, setPaymentMethod] = useState('cash') // 'online' or 'cash'

  // Calculate subtotal
  const subtotal = products.reduce((total, product) => {
    return total + (product.price * product.quantity)
  }, 0)

  const shipping = 100
  const total = subtotal + shipping

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return
    
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: newQuantity } : product
    ))
  }

  // Handle remove product
  const handleRemoveProduct = (id) => {
    setProducts(products.filter(product => product.id !== id))
  }

  // Toggle favorite
  const toggleFavorite = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
    ))
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
        {products.map(product => (
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
                  onClick={() => toggleFavorite(product.id)}
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
                  onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                  className="p-1 rounded-full border border-borderColor"
                >
                  <Minus size={16} />
                </button>
                
                <span className="w-8 text-center">{product.quantity}</span>
                
                <button 
                  onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
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
                <span>{product.price * product.quantity} LE</span>
                <button 
                  onClick={() => handleRemoveProduct(product.id)}
                  className="p-1 rounded-full"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
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
