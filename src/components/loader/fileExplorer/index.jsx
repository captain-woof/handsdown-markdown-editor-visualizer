import styled from "styled-components"
import DirectoryChanger from "./directoryChanger"
import Colors from "../../../Colors"
import DescriptionIcon from '@material-ui/icons/Description'
import { Scrollbars } from 'react-custom-scrollbars'

const EachDirectoryListingStyle = styled.div`
    transition-timing-function: ease-in-out;
    transition-property: background-color;
    transition-duration: 0.3s;
    &:hover{
        background-color: ${Colors.AffirmativeButtonHoverBackgroundColor}
    };
    cursor: pointer;
    padding: 2px;
    margin-right: 12px;
    word-break: break-all;
`

const FileExplorerStyle = styled.div`
    margin-left: 8px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    resize: none;
    color: ${Colors.LoaderScrenFileExplorerTextColor};
    font-size: small;
`

const FileExplorerTitleStyle = styled.div`
    align-self: center;
    margin-bottom: 8px;
`

const ExplorerInfoChangerStyle = styled.div`
    margin-top: 12px;
    margin-left: 8px;
    margin-right: 8px;
    display: flex;
    flex-direction: column;
    overflow: none;
    resize: none;
    color: ${Colors.LoaderScrenFileExplorerTextColor};
    font-size: small;
`

export default function FileExplorer(props, state) {

    const displaySavePrompt = () => {
        // If current file has not been saved yet
        var result = undefined
        if (!props.state.isSaved) {
            result = window.api.displaySavePrompt()
            if (result === 1) {
                handleSaveToFile()
            }
            return result
        }
    }

    // Save button handler
    const handleSaveToFile = () => {
        // If file has been saved before
        if (props.state.filepath) {
            // If save operation failed
            if (!window.api.writeToFile(props.state.text, props.state.filepath)) {
                window.api.displayErrorBox("Error", `Failed to save to filepath '${props.state.filepath}'`)
                props.changeState({
                    isSaved: false
                })
                document.title = `Handsdown - *${props.state.filepath}`
            } else { // If file save operation is successful
                props.changeState({
                    isSaved: true
                })
                document.title = `Handsdown - ${props.state.filepath}`
            }
        } else { // If file has not been saved before
            handleSaveAsToFile()
        }
    }

    // Save as button handler
    const handleSaveAsToFile = () => {
        var isSuccess_filepath = window.api.chooseAndWriteToFile(props.state.text)
        // If not cancelled
        if (isSuccess_filepath) {
            // If file save operation is successful
            if (isSuccess_filepath.isSuccess) {
                props.changeState({
                    isSaved: true,
                    filepath: isSuccess_filepath.filepath
                })
                document.title = `Handsdown - ${isSuccess_filepath.filepath}`
            } else { // If file save operation failed
                props.changeState({
                    isSaved: false
                })
                document.title = `Handsdown - *${props.state.filepath}`
            }
        }
    }

    const handleFileClickInExplorer = (filepath) => {
        var filepath_text = window.api.getSpecificFileContents(filepath)
        if (displaySavePrompt() !== 2) {
            props.changeState({
                text: filepath_text.text,
                filepath: filepath_text.filepath
            })
        }
    }

    const getDirectoryListing = () => {
        // Get current directory listing
        // // Each element (object) is {name:"",filepath:""}
        var directoryListing = window.api.getDirectoryListing()
        var directoryEntryComponents = []
        directoryListing.forEach((entry) => {
            directoryEntryComponents.push(
                <EachDirectoryListingStyle onClick={() => {
                    handleFileClickInExplorer(entry.filepath)
                }}>
                    <DescriptionIcon style={{ "vertical-align": "bottom" }} fontSize="small" />
                    {entry.name}
                </EachDirectoryListingStyle>
            )
        })
        return directoryEntryComponents
    }

    return (
        <>
            <ExplorerInfoChangerStyle>
                <FileExplorerTitleStyle>Explorer</FileExplorerTitleStyle>
                <DirectoryChanger state={props.state} changeState={props.changeState} />
            </ExplorerInfoChangerStyle>
            <FileExplorerStyle>
                <Scrollbars autoHeight={true} hideTracksWhenNotNeeded={true} style={{
                    marginLeft: "8px",
                    marginRight: "8px"
                }}>
                    {getDirectoryListing()}
                </Scrollbars>
            </FileExplorerStyle>
        </>
    )
}