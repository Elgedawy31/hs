import React, { useState } from 'react';
import { 
  Video, 
  Phone, 
  MoreVertical, 
  Send,
  Mic,
  Paperclip
} from 'lucide-react';

function Chat() {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle sending message logic here
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] bg-body" data-aos="fade-in">
      {/* Left sidebar - Doctor info */}
      <div className="w-full md:w-72 lg:w-80 bg-background border-r border-borderColor flex-shrink-0">
        <div className="p-6 flex flex-col items-center" data-aos="fade-right" data-aos-delay="200">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-borderColor">
              <img 
                src="/src/assets/Images/model-1.jpg" 
                alt="Dr. Emily Watson" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 left-2 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          
          <h2 className="text-xl font-bold mt-4 text-text">Dr. Emily Watson</h2>
          <p className="text-placeholderText">Dermatologist</p>
          
          <div className="flex items-center mt-2">
            <span className="text-primary text-lg font-bold">4.9</span>
            <span className="text-placeholderText ml-1">(250 review)</span>
          </div>
          
          <div className="w-full mt-6">
            <h3 className="font-semibold text-text mb-2">Working Hours</h3>
            <p className="text-placeholderText">Mon - Fri: 9:00 AM - 5:00 PM</p>
            <p className="text-placeholderText">Sat: 9:00 AM - 1:00 PM</p>
          </div>
        </div>
      </div>
      
      {/* Right side - Chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        <div className="p-4 border-b border-borderColor bg-background flex items-center justify-between" data-aos="fade-down" data-aos-delay="300">
          <div className="flex items-center">
            <div className="relative mr-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img 
                  src="/src/assets/Images/model-1.jpg" 
                  alt="Dr. Emily Watson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
            </div>
            <div>
              <h3 className="font-semibold text-text">Dr. Emily Watson</h3>
              <p className="text-primary text-sm">Online</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-altPrimary text-text">
              <Video size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-altPrimary text-text">
              <Phone size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-altPrimary text-text">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
        
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-body" data-aos="fade-up" data-aos-delay="400">
          <div className="text-center text-placeholderText text-sm mb-6">
            Today, 3/8/2025
          </div>
          
          <div className="mb-6 max-w-[80%]">
            <div className="text-placeholderText text-sm mb-2">
              Welcome to your chat with Dr. Sarah Wilson.
              You can ask questions about clinic location,
              working hours, or general inquiries.
              Please note that this chat is not for
              medical diagnosis or treatment advice.
            </div>
          </div>
          
          {/* Doctor message */}
          <div className="flex mb-4" data-aos="fade-right" data-aos-delay="500">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <img 
                src="/src/assets/Images/model-1.jpg" 
                alt="Dr. Emily Watson" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="bg-background p-3 rounded-lg rounded-tl-none max-w-xs md:max-w-md">
                <p className="text-text">Hello! How can I assist you today?</p>
              </div>
              <span className="text-placeholderText text-xs mt-1">10:30 AM</span>
            </div>
          </div>
          
          {/* User message */}
          <div className="flex justify-end mb-4" data-aos="fade-left" data-aos-delay="600">
            <div className="flex flex-col items-end">
              <div className="bg-primary p-3 rounded-lg rounded-tr-none max-w-xs md:max-w-md">
                <p className="text-white">Hi Dr. Watson, what documents should I bring for my first visit?</p>
              </div>
              <span className="text-placeholderText text-xs mt-1">10:35 AM</span>
            </div>
          </div>
          
          {/* Doctor message */}
          <div className="flex mb-4" data-aos="fade-right" data-aos-delay="700">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <img 
                src="/src/assets/Images/model-1.jpg" 
                alt="Dr. Emily Watson" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="bg-background p-3 rounded-lg rounded-tl-none max-w-xs md:max-w-md">
                <p className="text-text">For your first visit, please bring your ID, any previous medical records, and insurance details if applicable. Let me know if you need any further assistance</p>
              </div>
              <span className="text-placeholderText text-xs mt-1">10:38 AM</span>
            </div>
          </div>
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t border-borderColor bg-background" data-aos="fade-up" data-aos-delay="800">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <button 
              type="button" 
              className="p-2 text-placeholderText hover:text-primary"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your Message"
              className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-text placeholder:text-placeholderText"
            />
            <button 
              type="button" 
              className="p-2 text-placeholderText hover:text-primary mr-1"
            >
              <Mic size={20} />
            </button>
            <button 
              type="submit" 
              className="p-2 bg-primary text-white rounded-lg"
              disabled={!message.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
