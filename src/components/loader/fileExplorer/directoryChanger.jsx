import styled from "styled-components"
import Colors from "../../../Colors"
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

const CurrentDirectoryChangerStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    transition-timing-function: ease-in-out;
    transition-property: background-color;
    transition-duration: 0.3s;
    &:hover{
        background-color: ${Colors.AffirmativeButtonHoverBackgroundColor}
    };
    align-items: center;
    cursor: pointer;
    margin-bottom: 4px;
`

const CurrentDirectoryDisplayStyle = styled.div`
    word-break: break-all;
`

const ChangeDirectoryIconStyle = styled.div`
    margin-right: 8px;
`

export default function DirectoryChanger(props, state) {
    const changeCurrentDirectory = () => {
        var newCurrentDirectory = window.api.changeCurrentDirectory()
        if (newCurrentDirectory) {
            props.changeState({
                currentDirectory: newCurrentDirectory
            })
        }
    }

    return (
        <CurrentDirectoryChangerStyle onClick={changeCurrentDirectory}>
            <ChangeDirectoryIconStyle>
                <FolderOpenIcon fontSize="small" />
            </ChangeDirectoryIconStyle>
            <CurrentDirectoryDisplayStyle>{props.state.currentDirectory}</CurrentDirectoryDisplayStyle>
        </CurrentDirectoryChangerStyle>
    )
}