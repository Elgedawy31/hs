import React from 'react'

function SidebarItem({ title, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-full  px-6 py-4 transition-colors bg-background  text-center rounded-[16px]
        ${isActive ? 'border-l-[7px]' : 'border-l-[3px]'} border-primary 
        ${isActive ? 'text-primary font-medium' : 'text-placeholderText hover:text-primary'}`}
    >
      {title}
    </button>
  )
}

export default SidebarItem
