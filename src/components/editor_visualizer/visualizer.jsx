import styled from "styled-components"
import Colors from "../../Colors"
import marked from "marked"
import DOMPurify from "dompurify"
import Filename from "./filename"

const VisualizerScreenStyle = styled.div`
    background-color: ${Colors.VisualizerScreenBackground};
    width: 50%;
    height: 100%;
    resize: none;
    color: ${Colors.VisualizerScreenTextColor}
`

const VisualizerTextArea = styled.div`
    height:100%;
    border: none;
    word-break: break-word;
    overflow: auto;
    resize: none;
    margin: 8px;
    overflow-x: hidden;
`

const FilenameVisualizerStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    background-color: transparent;
    code {
        white-space: pre-wrap;
    },
`

export default function VisualizerScreen(props, state) {

    return (
        <VisualizerScreenStyle>
            <FilenameVisualizerStyle>
                <Filename prepend="Visualizer"/>
                <VisualizerTextArea dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked(props.text), { USE_PROFILES: { html: true } })
                }} />
            </FilenameVisualizerStyle>
        </VisualizerScreenStyle>
    )
}