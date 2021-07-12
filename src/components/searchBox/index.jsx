import styled from "styled-components"
import TransitEnterexitIcon from '@material-ui/icons/TransitEnterexit'
import Colors from "../../Colors"
import IconButton from "@material-ui/core/Button"
import {useMergeState} from "use-merge-state"

const SearchboxContainerStyle = styled.div`
    background-color: transparent;
    height: 5%;
    min-height: 36px;
    max-height: 52px;
    width: 25%;
    position: fixed;
    top: 0em;
    right: 0em;
    margin: 12px;
    border-radius: 2px;
    transition: background-color 0.3s;
    &:hover {
        background-color: ${Colors.SearchButtonHoverBackgroundColor};
    },
    visibility: hidden;
`

const SearchboxInnerContainerStyle = styled.div`
    display: flex;
    align-contents: center;
    flex-direction: row;
    height: 100%;
`

const Textbox = styled.input`
    width: 70%;
    height: 100%;
    resize: none;
    border: none;
    padding: 0px;
    border-radius: 2px;
    outline: none;
`

export default function SearchBox() {
    const [searchItem, changeSearchItemState] = useMergeState("")

    function handleSearchTextChange(event){
        changeSearchItemState(event.target.value)
    }

    function handleSearchClick(event){        
        window.find(searchItem,false,false,true,false,false,false)
    }

    function handleSearchEnter(event){
        if(event.keyCode === 13){
            handleSearchClick(event)
        }
    }
    return (
        <SearchboxContainerStyle id="searchboxContainer">
            <SearchboxInnerContainerStyle>
                <Textbox id="searchbox" onKeyDown={handleSearchEnter} onChange={handleSearchTextChange} style={{ backgroundColor: Colors.SearchboxBackground }} placeholder="Search..."></Textbox>
                <IconButton id="searchIcon" onClick={handleSearchClick} style={{
                    "width": "30%",
                    "height": "100%",
                    "alignContents": "center",
                    "color": Colors.SearchButtonColor,
                    "background-color": Colors.SearchButtonBackgroundColor
                }}>
                    <TransitEnterexitIcon />
                </IconButton>
            </SearchboxInnerContainerStyle>
        </SearchboxContainerStyle>
    )
}