import styled from "styled-components"
import Colors from "../../Colors"
import LoaderButtons from "./LoaderButtons"
import FileExplorer from "./fileExplorer/index"
import Logo from "./logo"

const LoaderScreenStyle = styled.div`
    width: 25%;
    height: 100vh;
    background-color: ${Colors.LoaderScreenOverlayColor};
    display: flex;
    flex-direction: column;
    justify-content: center;
`

export default function LoaderScreen(props,state) {
    return (
        <LoaderScreenStyle>
            <Logo/>
            <LoaderButtons state={props.state} changeState={props.changeState}/>
            <FileExplorer state={props.state} changeState={props.changeState}/>
        </LoaderScreenStyle>
    )
}