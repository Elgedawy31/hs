import React from 'react'

function CustomTabs({ tabs, activeTab, onChange, children }) {
  return (
    <div className="w-full rounded-lg overflow-auto">
      <div className="">
        <div className="flex relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`relative px-6 py-4 text-sm font-medium transition-all duration-300 ease-in-out
                ${
                  activeTab === tab.id
                    ? "text-primary"
                    : "text-text hover:text-hoverText"
                }
              `}
            >
              {tab.label}
              <div 
                className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-all duration-300 ease-in-out
                  ${activeTab === tab.id 
                    ? "bg-primary scale-x-100 opacity-100" 
                    : "scale-x-0 opacity-0"
                  }
                `} 
              />
            </button>
          ))}
        </div>
      </div>
      <div className="animate-fadeIn">
        {children}
      </div>
    </div>
  )
}

export default CustomTabs
