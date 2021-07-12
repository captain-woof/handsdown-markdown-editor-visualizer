import styled from "styled-components"

const FilenameContainerStyle = styled.div`
    background-color: transparent;
    max-width: 100%; 
    max-height: 40px;
    width: 100%;
    height: 40px;
    overflow: ellipsis;
    padding: 0px;
    margin: 0px;
`

const FilenameStyle = styled.div`
    margin: 8px;
    display: flex;
    flex-direction: row;
    align-items: baseline;
`

const SubwindowNameStyle = styled.div`
    font-size: 2em;
    font-weight: bold;
`

const FilenameInnerStyle = styled.div`
    font-size: large;
    margin-left: 2px;
    word-break: break-all;
`

export default function Filename(props, state) {
    return (
        <FilenameContainerStyle>
            <FilenameStyle>
                <SubwindowNameStyle>{props.prepend}</SubwindowNameStyle>
                <FilenameInnerStyle>{props.filename ? "(" + props.filename + ")" : ""}</FilenameInnerStyle>
            </FilenameStyle>
        </FilenameContainerStyle>
    )
}