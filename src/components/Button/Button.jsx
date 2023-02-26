import PropTypes from 'prop-types'
import css from './Button.module.css'

const Button = ({children,onBtnClick,type ='button'}) => {
    return (
        <button className={css.Button} onClick={onBtnClick} type={type}>{children}</button>
    )
}
export default Button


Button.propTypes = {
    onBtnClick: PropTypes.func.isRequired,
   
};