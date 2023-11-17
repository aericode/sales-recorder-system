function handleButtonClick() {
    const inputString = document.getElementById('userInput').value
    const inputArray = getInputArray(inputString)
}

function getInputArray(inputString){
    const inputArray = inputString.split('\n')
    return inputArray
}

function getParsedInputArray(inputArray){
}