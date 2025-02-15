import React from 'react'

function CardContainer({children , className}) {
  return (
    <div className={`bg-background border-1 border-borderColor p-4 rounded-lg ${className}`}>
      {children}
    </div>
  )
}

export default CardContainer
