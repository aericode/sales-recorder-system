function handleButtonClick() {
    const inputString = document.getElementById('userInput').value
    const inputArray = getInputArray(inputString)
    const parsedInputArray = getParsedInputArray(inputArray)
    submitDataToBackend(parsedInputArray)
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

function submitDataToBackend(parsedInputArray){
    const requestBody = JSON.stringify({ data: parsedInputArray });

    fetch('http://localhost:3000', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('network error response:');
        }
        return response.json();
    })
    .then(data => {
        console.log('backend response:', data);
    })
    .catch(error => {
        console.error('backend error response:', error);
    });
}