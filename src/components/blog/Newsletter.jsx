import React, { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };
  
  return (
    <div className="mb-16 bg-background rounded-lg p-8 border border-borderColor">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Stay Updated With Our Newsletter</h2>
        <p className="text-placeholderText">Subscribe to our newsletter for the latest dermatological insights and clinic updates</p>
      </div>
      
      <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <input
          type="email"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow px-4 py-3 rounded-lg border border-borderColor"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-lg bg-primary text-white font-medium"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
