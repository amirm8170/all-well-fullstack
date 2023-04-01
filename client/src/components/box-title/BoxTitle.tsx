import { CSSProperties } from 'react'
import { childProps } from '../../types/Types'
import './BoxTitle.scss'

const BoxTitle = ({children ,center}:childProps) => {
  const style : CSSProperties | undefined = center ? {textAlign:'center' , transform:'translateX(0px)' , marginBottom:'0px'} : {}
  return (
    <h2 className='box-title' style={style}>{children}</h2>
  )
}

export default BoxTitle