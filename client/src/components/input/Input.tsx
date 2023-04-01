import { InputHTMLAttributes } from 'react'
import { pallet } from '../../layout/pallet'
import { inputProps } from '../../types/Types'
import './Input.scss'

const Input:React.FC<InputHTMLAttributes<HTMLInputElement> & inputProps> = ({
  width,
  height,
  error,
  rightIcon,
  addClass,
  ...props

}) => {
  return (
    <div className={`input-container ${addClass}`} style={{width:`${width}` , height:`${height}`}}>
      <input className='input-field' {...props} style={{borderColor:error ? pallet.errorColor : pallet.inputBorder}}/>
      <div className='input-icon-right'>
        {rightIcon}
      </div>
      <span className='input-error'>{error}</span>
    </div>
  )
}

export default Input