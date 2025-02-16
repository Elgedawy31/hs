import React from 'react'
import PropTypes from 'prop-types'
import { Loader } from 'lucide-react'

function UniBtn({ text, onClick, className = "", type = "button", loading = false , disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`bg-primary px-8 py-2 rounded-full transition-all duration-200 ease-in-out hover:scale-105 hover:opacity-90 active:scale-95 ${className}`}
    >
      {loading ? <Loader className=' animate-spin' />: text}
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
