import styled from "styled-components"
import EditorScreen from "./editor"
import VisualizerScreen from "./visualizer"
import Functions from "../../utility-functions/index"

const EditorAndVisualizerStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: "transparent";
`

export default function EditorAndVisualizer(props, state) {
    // Handler to handle text changes
    function handleTextChange(newText) {
        // Change state   
        props.changeState({
            isSaved: false,
            text: newText
        })

        // Change title
        document.title = `Handsdown - *${props.state.filepath}`
    }

    return (
        <EditorAndVisualizerStyle>
            <EditorScreen filename={Functions.getFilenameFromFilepath(props.state.filepath)} text={props.state.text} changeTextFunc={handleTextChange} />
            <VisualizerScreen filename={Functions.getFilenameFromFilepath(props.state.filepath)} text={props.state.text} />
        </EditorAndVisualizerStyle>
    )
}