import { childProps } from '../../types/Types'
import './Box.scss'

const Box = ({children , widthAuto}:childProps) => {
  const style = widthAuto ? {width: 'fit-content' , margin:'0px 10px'} : {}
  return (
    <div className='box' style={style}>
      {children}
    </div>
  )
}

export default Box