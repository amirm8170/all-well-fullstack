import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import BoxTitle from "../../components/box-title/BoxTitle"
import Box from "../../components/box/Box"
import Button from "../../components/button/Button"
import { pallet } from "../../layout/pallet"
import SectionWithImage from "../components/section-with-image/SectionWithImage"
import '../Style.scss'

const ConfirmPassword = () => {
  const {state} = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!state?.valid){
      navigate('/*')
    }
  },[navigate,state])
  
  return (
    <section className="imagePage">
    <SectionWithImage>
      <div className="imagePage-container mt-4" style={{alignItems:'center'}}>
          <Box widthAuto>
              <BoxTitle center={true}>your password has been successfully changed!</BoxTitle>
          </Box>
          <Button onClick={()=>navigate('/login')} addClass="mt-3" width={350} bgColor={pallet.green}>Click here to Access your app again!</Button>
      </div>
    </SectionWithImage>
  </section>
  )
}

export default ConfirmPassword 