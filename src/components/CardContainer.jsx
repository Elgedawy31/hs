import React from 'react'

function CardContainer({children}) {
  return (
    <div className='bg-background border-1 border-borderColor p-4 rounded-md' >
      {children}
    </div>
  )
}

export default CardContainer
