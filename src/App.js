import styled from "styled-components"
import LoaderScreen from "./components/loader/index"
import EditorAndVisualizer from "./components/editor_visualizer/index"
import Image from "./assets/images/LoaderScreenBackground.jpg"
import { useMergeState } from "use-merge-state"
import Functions from "./utility-functions/index"
import SearchBox from "./components/searchBox/index"

const MainScreenStyle = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  padding:0px;
  margin:0px;
  overflow:hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${Image});
`

export default function App() {
  // State consists of: Current filepath, Current text, and save status
  const [state, changeState] = useMergeState(
    {
      filepath: undefined,
      text: "",
      isSaved: true,
      currentDirectory: window.api.getCurrentDirectory()
    },
    {
      merge: true
    })

  // Function to handle keyboard shortcuts
  const handleKeypress = (event) => {
    // Get keypress
    var charPressed = String.fromCharCode(event.keyCode).toLowerCase();
    // Handle Ctrl/Cmd + S (Save)
    if ((event.ctrlKey && charPressed === "s") || (event.metaKey && charPressed === "s")) {
      Functions.handleSaveToFile({ "state": state, "changeState": changeState })
    } else if ((event.ctrlKey && charPressed === "n") || (event.metaKey && charPressed === "n")) {
      // Handle Ctrl/Cmd + N (New)
      Functions.handleNewFile({ "state": state, "changeState": changeState })
    } else if ((event.ctrlKey && charPressed === "o") || (event.metaKey && charPressed === "o")) {
      // Handle Ctrl/Cmd + O (Open)
      Functions.handleOpenFile({ "state": state, "changeState": changeState })
    } else if ((event.ctrlKey && charPressed === "q") || (event.metaKey && charPressed === "q")) {
      // Handle Ctrl/Cmd + Q (Quit)
      Functions.handleExit({ "state": state, "changeState": changeState })
    }else if ((event.ctrlKey && charPressed === "f") || (event.metaKey && charPressed === "f")) {
      // Handle Ctrl/Cmd + F (Find)
      var searchBox = document.getElementById("searchboxContainer")
      if(searchBox.style.visibility === "visible"){
        searchBox.style.visibility = "hidden"
      }else{
        searchBox.style.visibility = "visible"
        document.getElementById("searchbox").focus()
      }
    }
  }
  return (
    <div onKeyDown={handleKeypress}>
      <SearchBox />
      <MainScreenStyle >
        <LoaderScreen state={state} changeState={changeState} />
        <EditorAndVisualizer state={state} changeState={changeState} />
      </MainScreenStyle>
    </div>
  )
}