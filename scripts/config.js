function openPlayerConfig(event) { //event.target gives access to the element for which the event occured
    editedPlayer = +event.target.dataset.playerid // +'1' => 1
    // ----dataset is an object that will be populated with all the data attributes added to your elements
    // ----dataset['player-id'] --> if your property uses a dash (dash is not allowed with a dot notation)
    playerOverlay.style.display = 'block'
    backdropElement.style.display = 'block'
}

function closePlayerConfig() {
    playerOverlay.style.display = 'none'
    backdropElement.style.display = 'none'
    formElement.firstElementChild.classList.remove('error')
    errorElement.textContent = ''
    //formElement.firstElementChild.lastElementChild.value = ''
    document.getElementById('playername').value = ''
}

function savePlayerConfig(event) {
    event.preventDefault() //method => prevents the browser default behavior
    //const formData = {} //this const should hold an object
    // ----- new FormData() ----- instantiating an object based on an object blueprint
    // ----- a built in blueprint(function) that generate objects that have a certain shape
    // takes a form and automatically extract values entered into inputs
    const formData = new FormData(event.target) // --> OBJECT BLUEPINT THAT WE CREATE WITH THE'NEW' KEYWORD
    // the 'event' object that describes the event that occured has a 
    //"target" property that points at the HTML element that was responsible for this event (the form)
    //-----------------JS will look for inputs that have a NAME field or <select>
    const enteredPlayerName = formData.get('playername').trim() //'   Max   ' => 'Max' (delete white space in front/after the content or all white space if there is no content)

    //  enteredPlayerName === ''(empty string '' is considered falsy in JS)
    // It is considered false IF used in a place where a boolean is expected
    if (!enteredPlayerName) {
        event.target.firstElementChild.classList.add('error')
        errorElement.textContent = 'Please enter a valid name!'
        return // we usually return smthing but here we RETURN nothing
        // When we execute RETURN we stop the execution of the function in which U called it
        // So lines after will not be executed if return was executed but only if the code makes it into the IF block
    }

    const updatedPlayerData = document.getElementById('player' + editedPlayer + 'data')
    updatedPlayerData.children[1].textContent = enteredPlayerName

    /* if (editedPlayer === 1) {
        players[0].name = enteredPlayerName
    } else {
        players[1].name = enteredPlayerName
    } */
    players[editedPlayer - 1].name = enteredPlayerName

    closePlayerConfig()
}