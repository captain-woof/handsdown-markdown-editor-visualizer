import styled from "styled-components"
import Colors from "../../Colors"
import Filename from "./filename"

const EditorScreenStyle = styled.div`
    background-color: ${Colors.EditorScreenBackground};
    width: 50%;
    height: 100%;
    margin-right: 8px;
    color: ${Colors.EditorScreenTextColor}
`

const EditorTextArea = styled.textarea`
    background-color: transparent;
    max-width: 95%; 
    max-height: 100%;
    width: 95%;
    height:100%;
    resize: none;
    border: none;
    overflow: auto;
    outline: none;
    box-shadow: none;
    padding: 0px;
    margin-left: 8px;
    margin-right: 8px;
    margin-top: 32px;
    margin-bottom: 8px;
`
const FilenameEditorStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: transparent;
`

export default function EditorScreen(props, state) {
    function handleTextChange(event) {
        props.changeTextFunc(event.target.value)
    }

    return (
        <EditorScreenStyle>
            <FilenameEditorStyle>
                <Filename prepend="Editor" filename={props.filename}/>
                <EditorTextArea rows="100%" placeholder="Start typing here..." value={props.text} onInput={handleTextChange} />
            </FilenameEditorStyle>
        </EditorScreenStyle>
    )
}