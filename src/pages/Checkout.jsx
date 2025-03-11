import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import UniTextInput from '../components/UniTextInput'
import UniBtn from '../components/UniBtn'
import { Shield, CreditCard, Calendar, Clock, User, CreditCardIcon } from 'lucide-react'
import SEO from '../components/SEO'

function Checkout() {
  const { theme } = useTheme()
  const [paymentMethod, setPaymentMethod] = useState('card') // 'card' or 'paypal'
  const [cardType, setCardType] = useState('credit') // 'credit' or 'debit'
  
  // Form state
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: ''
  })

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    })
  }

  // Mock payment details
  const paymentDetails = {
    service: 'Advanced Skin Treatment',
    expert: 'Dr. Alejandro Gómez',
    date: 'Friday, 25 April, 2025',
    time: '8:00 PM'
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
         title={`HS - Healthcare Solutions - Checkout`}
        description="Complete your payment for healthcare services"
      />
      
      <h1 className="text-3xl font-bold text-center mb-8" style={{ color: theme.text }}>
        Complete Your Payment
      </h1>
      
      <div className="max-w-4xl mx-auto">
        {/* Payment Details */}
        <div className="mb-8 rounded-lg border p-6" style={{ borderColor: theme.borderColor, backgroundColor: theme.background }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
            Payment Details
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center border-b pb-4" style={{ borderColor: theme.borderColor }}>
              <div className="w-8 h-8 mr-4 flex-shrink-0 text-primary">
                <CreditCard className="w-full h-full" style={{ color: theme.primary }} />
              </div>
              <div className="flex-grow">
                <span className="block text-sm" style={{ color: theme.text }}>Service</span>
              </div>
              <div className="text-right">
                <span className="font-medium" style={{ color: theme.text }}>{paymentDetails.service}</span>
              </div>
            </div>
            
            <div className="flex items-center border-b pb-4" style={{ borderColor: theme.borderColor }}>
              <div className="w-8 h-8 mr-4 flex-shrink-0">
                <User className="w-full h-full" style={{ color: theme.primary }} />
              </div>
              <div className="flex-grow">
                <span className="block text-sm" style={{ color: theme.text }}>Expert</span>
              </div>
              <div className="text-right">
                <span className="font-medium" style={{ color: theme.text }}>{paymentDetails.expert}</span>
              </div>
            </div>
            
            <div className="flex items-center border-b pb-4" style={{ borderColor: theme.borderColor }}>
              <div className="w-8 h-8 mr-4 flex-shrink-0">
                <Calendar className="w-full h-full" style={{ color: theme.primary }} />
              </div>
              <div className="flex-grow">
                <span className="block text-sm" style={{ color: theme.text }}>Date</span>
              </div>
              <div className="text-right">
                <span className="font-medium" style={{ color: theme.text }}>{paymentDetails.date}</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 mr-4 flex-shrink-0">
                <Clock className="w-full h-full" style={{ color: theme.primary }} />
              </div>
              <div className="flex-grow">
                <span className="block text-sm" style={{ color: theme.text }}>Time</span>
              </div>
              <div className="text-right">
                <span className="font-medium" style={{ color: theme.text }}>{paymentDetails.time}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Payment Methods */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
            Payment Methods
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* PayPal Option */}
            <div 
              className={`rounded-lg border p-6 cursor-pointer transition-all duration-200 ${paymentMethod === 'paypal' ? 'border-primary' : ''}`}
              style={{ 
                borderColor: paymentMethod === 'paypal' ? theme.primary : theme.borderColor,
                backgroundColor: theme.background
              }}
              onClick={() => setPaymentMethod('paypal')}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center">
                  <img  draggable="false" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="PayPal" className="w-full" />
                </div>
                <h3 className="font-medium mb-2" style={{ color: theme.text }}>Pay With PayPal</h3>
                <p className="text-sm text-center" style={{ color: theme.placeholderText }}>Quick and secure checkout</p>
                
                {paymentMethod === 'paypal' && (
                  <UniBtn 
                    text="Continue with PayPal" 
                    className="mt-4 text-sm py-2 px-4 text-white"
                  />
                )}
              </div>
            </div>
            
            {/* Card Option */}
            <div 
              className={`rounded-lg border p-6 cursor-pointer transition-all duration-200 ${paymentMethod === 'card' ? 'border-primary' : ''}`}
              style={{ 
                borderColor: paymentMethod === 'card' ? theme.primary : theme.borderColor,
                backgroundColor: theme.background
              }}
              onClick={() => setPaymentMethod('card')}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 mb-4 flex items-center justify-center space-x-2">
                  <img  draggable="false" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" alt="MasterCard" className="w-8 h-8" />
                  <img  draggable="false" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png" alt="Visa" className="w-8 h-8" />
                  <img  draggable="false" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png" alt="Apple Pay" className="w-6 h-6" />
                </div>
                
                <div className="flex items-center space-x-4 mb-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${cardType === 'credit' ? 'border-primary' : 'border-gray-300'}`}>
                      {cardType === 'credit' && (
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                      )}
                    </div>
                    <input 
                      type="radio" 
                      name="cardType" 
                      value="credit" 
                      checked={cardType === 'credit'} 
                      onChange={() => setCardType('credit')} 
                      className="hidden"
                    />
                    <span style={{ color: theme.text }}>Credit Card</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${cardType === 'debit' ? 'border-primary' : 'border-gray-300'}`}>
                      {cardType === 'debit' && (
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                      )}
                    </div>
                    <input 
                      type="radio" 
                      name="cardType" 
                      value="debit" 
                      checked={cardType === 'debit'} 
                      onChange={() => setCardType('debit')} 
                      className="hidden"
                    />
                    <span style={{ color: theme.text }}>Debit Card</span>
                  </label>
                </div>
                
                {paymentMethod === 'card' && (
                  <UniBtn 
                    text="Continue with card" 
                    className="mt-4 text-sm py-2 px-4 text-white"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Details - Only show if card payment method is selected */}
        {paymentMethod === 'card' && (
          <div className="mb-8">
            <div className="mb-6">
              <UniTextInput
                label="Card Number"
                value={formData.cardNumber}
                onChange={(value) => handleInputChange('cardNumber', value)}
                placeholder="1234 5678 9012 2476"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <UniTextInput
                label="Expiry Date"
                value={formData.expiryDate}
                onChange={(value) => handleInputChange('expiryDate', value)}
                placeholder="MM/YY"
              />
              
              <UniTextInput
                label="CVV"
                value={formData.cvv}
                onChange={(value) => handleInputChange('cvv', value)}
                placeholder="123"
              />
            </div>
            
            <div className="mb-6">
              <UniTextInput
                label="CardHolderName"
                value={formData.cardHolderName}
                onChange={(value) => handleInputChange('cardHolderName', value)}
                placeholder="Name as shown on your card"
              />
            </div>
          </div>
        )}
        
        {/* Billing Address */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: theme.text }}>
            Billing Address
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <UniTextInput
              label="FirstName"
              value={formData.firstName}
              onChange={(value) => handleInputChange('firstName', value)}
              placeholder="First Name"
            />
            
            <UniTextInput
              label="LastName"
              value={formData.lastName}
              onChange={(value) => handleInputChange('lastName', value)}
              placeholder="Last Name"
            />
          </div>
          
          <div className="mb-6">
            <UniTextInput
              label="StreetAddress"
              value={formData.streetAddress}
              onChange={(value) => handleInputChange('streetAddress', value)}
              placeholder="Street Address"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UniTextInput
              label="City"
              value={formData.city}
              onChange={(value) => handleInputChange('city', value)}
              placeholder="City"
            />
            
            <UniTextInput
              label="State"
              value={formData.state}
              onChange={(value) => handleInputChange('state', value)}
              placeholder="State"
            />
            
            <UniTextInput
              label="Zip Code"
              value={formData.zipCode}
              onChange={(value) => handleInputChange('zipCode', value)}
              placeholder="Zip Code"
            />
          </div>
        </div>
        
        {/* Security Note */}
        <div className="flex items-center justify-center mb-8 text-sm" style={{ color: theme.placeholderText }}>
          <Shield className="w-5 h-5 mr-2" />
          <span>Your payment information is secure and encrypted</span>
        </div>
        
        {/* Submit Button */}
        <div className="flex justify-center">
          <UniBtn 
            text="Complete Payment" 
            className="px-8 py-3 text-white"
            onClick={() => alert('Payment processing would happen here')}
          />
        </div>
      </div>
    </div>
  )
}

export default Checkout
