const handleSaveAsToFile = (props) => {
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

const handleSaveToFile = (props) => {
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
        handleSaveAsToFile(props)
    }
}

const displaySavePrompt = (props) => {
    // If current file has not been saved yet
    var result = undefined
    if (!props.state.isSaved) {
        result = window.api.displaySavePrompt()
        if (result === 1) {
            handleSaveToFile(props)
        }
        return result
    }
}

const Functions = {
    // Parse filepath, return filename (with extension)
    getFilenameFromFilepath: (filepath) => {
        if (filepath) { // If filename is known
            var filenameArr = filepath.replaceAll("\\", "/").split("/")
            return filenameArr[filenameArr.length - 1]
        } else { // If filename is not known
            return "*undefined"
        }
    },
    // Display save prompt function
    displaySavePrompt: (props) => {
        // If current file has not been saved yet
        var result = undefined
        if (!props.state.isSaved) {
            result = window.api.displaySavePrompt()
            if (result === 1) {
                handleSaveToFile(props)
            }
            return result
        }
    },
    // Load button handler
    handleOpenFile: (props) => {
        if (displaySavePrompt(props) !== 2) {
            var filepath_text = window.api.getFileContents()
            // If not cancelled
            if (filepath_text) {
                props.changeState({
                    isSaved: true,
                    filepath: filepath_text.filepath,
                    text: filepath_text.text
                })
                document.title = `Handsdown - ${filepath_text.filepath}`
            }
        }
    },
    // New button handler
    handleNewFile: (props) => {
        if (displaySavePrompt(props) !== 2) {
            // Reset state
            props.changeState({
                text: "",
                filepath: undefined,
                isSaved: false
            })
            document.title = "Handsdown - *undefined"
        }
    },
    // Exit button handler
    handleExit: (props) => {
        if (displaySavePrompt(props) !== 2) {
            window.api.exitApp()
        }
    },
    // Save button handler
    handleSaveToFile: (props) => {
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
            handleSaveAsToFile(props)
        }
    },
    // Save as button handler
    handleSaveAsToFile: (props) => {
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
    },
    // Show about
    handleShowAbout: (props) => {
        window.api.showAboutRequest()
    }
}

export default Functions