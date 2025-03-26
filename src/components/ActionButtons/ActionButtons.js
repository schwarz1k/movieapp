import PropTypes from 'prop-types'

import './ActionButtons.css'

const ActionButtons = ({ text, isSelected, onClick, id }) => {
  return (
    <li>
      <button className={isSelected ? 'selected' : ''} onClick={onClick} type="button" id={id}>
        {text}
      </button>
    </li>
  )
}

ActionButtons.defaultProps = {
  isSelected: false,
}

ActionButtons.propTypes = {
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
}

export default ActionButtons
