function handleButtonClick() {
    const inputString = document.getElementById('userInput').value
    const inputArray = getInputArray(inputString)
    console.log(getParsedInputArray(inputArray))
}

function getInputArray(inputString){
    const inputArray = inputString.split('\n')
    return inputArray
}

function getParsedInputArray(inputArray){
    const parsedInputArray = inputArray.map(inputLine => {
        const entry = {
            type: inputLine.substring(0,1),
            date: inputLine.substring(2,26),
            product: inputLine.substring(26,56),
            value: inputLine.substring(57,66),
            vendor: inputLine.substring(67, 86)
        }
        return entry
    });
    return parsedInputArray
}