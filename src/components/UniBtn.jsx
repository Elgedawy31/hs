import React from 'react'
import PropTypes from 'prop-types'

function UniBtn({ text, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary px-8 py-2 rounded-full transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-90 active:scale-95 ${className}`}
    >
      {text}
    </button>
  )
}

UniBtn.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"])
}

export default UniBtn
