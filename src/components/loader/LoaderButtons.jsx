import Button from "@material-ui/core/Button"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import CreateIcon from '@material-ui/icons/Create';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SaveIcon from '@material-ui/icons/Save';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InfoIcon from '@material-ui/icons/Info';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Colors from "../../Colors"
import Functions from "../../utility-functions/index"

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: Colors.AffirmativeButtonBackgroundColor,
            dark: Colors.AffirmativeButtonHoverBackgroundColor
        },
        secondary: {
            main: Colors.ExitButtonBackgroundColor,
            dark: Colors.ExitButtonHoverBackgroundColor
        }
    }
});

export default function LoaderButtons(props, state) {
    // Load button handler
    const handleOpenFile = () => {
        Functions.handleOpenFile(props)
    }

    // New button handler
    const handleNewFile = () => {
        Functions.handleNewFile(props)
    }

    // Exit button handler
    const handleExit = () => {
        Functions.handleExit(props)
    }

    // Save button handler
    const handleSaveToFile = () => {
        Functions.handleSaveToFile(props)
    }

    // Save as button handler
    const handleSaveAsToFile = () => {
        Functions.handleSaveAsToFile(props)
    }

    // Show about
    const handleShowAbout = () => {
        Functions.handleShowAbout(props)
    }

    // Render buttons
    return (
        <ThemeProvider theme={buttonTheme}>
            <ButtonGroup orientation="vertical" size="small" style={{
                "alignItems": "baseline",
                "alignSelf": "center"
            }}>
                <Button variant="contained" onClick={handleNewFile} color="primary" startIcon={<CreateIcon />}><u>N</u>ew</Button>
                <Button variant="contained" onClick={handleOpenFile} color="primary" startIcon={<FolderOpenIcon />}><u>O</u>pen</Button>
                <Button variant="contained" onClick={handleSaveToFile} color="primary" startIcon={<SaveIcon />}><u>S</u>ave</Button>
                <Button variant="contained" onClick={handleSaveAsToFile} color="primary" startIcon={<SaveOutlinedIcon />}>Save as</Button>
                <Button variant="contained" onClick={handleShowAbout} color="primary" startIcon={<InfoIcon />}>About</Button>
                <Button variant="contained" onClick={handleExit} color="secondary" startIcon={<ExitToAppIcon />}><u>Q</u>uit</Button>
            </ButtonGroup>
        </ThemeProvider>
    )
}