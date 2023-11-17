function handleButtonClick() {
    const inputString = document.getElementById('userInput').value
    const inputArray = getInputArray(inputString)
    console.log(getParsedInputArray(inputArray))
}

function getInputArray(inputString){
    const splittedInputs = inputString.split('\n')
    const inputArray = filterEmptyEntries(splittedInputs)
    return inputArray
}

function filterEmptyEntries(splittedInputs){
    const nonEmptyInputsArray = splittedInputs.filter(entry => entry.length !== 0)
    return nonEmptyInputsArray
}

function getParsedInputArray(inputArray){
    const parsedInputArray = inputArray.map(inputLine => {
        const entry = {
            type: inputLine.substring(0,1),
            date: inputLine.substring(1,26),
            product: inputLine.substring(26,56),
            value: inputLine.substring(56,66),
            vendor: inputLine.substring(66, 86)
        }
        return entry
    });
    return parsedInputArray
}