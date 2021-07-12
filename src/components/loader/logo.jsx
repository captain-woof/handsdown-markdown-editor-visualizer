import styled from "styled-components"
import LogoImage from "../../assets/images/logo.svg"

const LogoContainerStyle = styled.div`
    align-self: center;
    height: 100px;
    width: 100px;
    margin-top: 32px;
    margin-bottom: 48px;
    background-color: white;
`

const LogoImageStyle = styled.img`
    height: 100px;
    width: 100px;
`

const LogoTextStyle = styled.div`
    text-align: center;
    color: rgba(255,255,255,0.9);
`

export default function Logo(){
    return(
        <LogoContainerStyle>
            <LogoImageStyle src={LogoImage} alt="Handsdown Logo"/>
            <LogoTextStyle>Handsdown</LogoTextStyle>
        </LogoContainerStyle>
    )
}