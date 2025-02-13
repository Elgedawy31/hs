import PropTypes from 'prop-types';

const UniHeading = ({ icon: Icon, text, showButton = false, buttonText = "Send public notification", onButtonClick }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-2xl" />}
        <h1 className="text-xl font-medium">{text}</h1>
      </div>
      {showButton && (
        <button
          onClick={onButtonClick}
          className="bg-primary text-text px-4 py-2 rounded-full transform hover:scale-105 hover:bg-opacity-90 transition-all duration-300 ease-in-out"
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

UniHeading.propTypes = {
  icon: PropTypes.elementType,
  text: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func
};

export default UniHeading;
