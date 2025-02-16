import React from 'react'
import PropTypes from 'prop-types'

function UniBtn({ text, onClick, className = "", type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary px-8 py-2 rounded-full  transition-colors ${className}`}
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
