import PropTypes from 'prop-types';

const UniCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-background  p-6 border-1 border-borderColor flex items-center gap-4"
    style={{borderTopLeftRadius: '30px', borderBottomRightRadius: '30px'}}>
      <Icon strokeWidth={1} className='text-primary ' size={38} />
      <div>
        <h2 className="text-placeholderText text-[16px] font-[600]  mb-2">{title}</h2>
        <p className="text-[32px] font-[600] text-text leading-none">{value}</p>
      </div>
    </div>
  );
};

UniCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired
};

export default UniCard;
