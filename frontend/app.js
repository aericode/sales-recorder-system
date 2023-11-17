function handleButtonClick() {
    const inputString = document.getElementById('userInput').value
    const inputArray = getArrayFromInput(inputString)
    console.log(inputArray)
}

function getArrayFromInput(userInput){
    const inputArray = userInput.split('\n')
    return inputArray
}