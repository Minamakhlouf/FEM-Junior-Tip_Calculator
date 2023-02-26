const inputDollar = document.querySelector("#input-dollar")
const errorMsg = document.querySelectorAll(".input__error")
const tipCheckbox = document.querySelectorAll(".tip__checkbox"); 
const inputTip = document.querySelector(".input__tip")
const inputPeople = document.querySelector("#people"); 
const resultNumbers = document.querySelectorAll(".result__number"); 
const resultsReset = document.querySelector(".results__reset"); 
/*To solve my issue with the last verification I should probably put the true or false in an object*/ 
const inputValidation = {
    inputDollar: false, 
    inputTip: false, 
    inputPeople: false
}

inputDollar.addEventListener("blur", function() {
    if (inputDollar.value > 0) {
        let inputDollarString = String(inputDollar.value); 
        let inputArr = inputDollarString.split("."); 
        if (inputArr.length === 1 && inputArr[0].length > 6) {
            errorMsg[0].textContent = "Input cannot exceed 999999"; 
            errorMsg[0].classList.add("input__error--shown"); 
            inputValidation.inputDollar = false; 
            checkInputs(); 
            return; 
        }
        if (inputArr.length === 2 && inputArr[1].length > 2) {
            errorMsg[0].textContent = "Input cannot have more than 2 decimals"; 
            errorMsg[0].classList.add("input__error--shown"); 
            inputValidation.inputDollar = false; 
            checkInputs(); 
            return; 
        }
        else {
            errorMsg[0].textContent = ""; 
            errorMsg[0].classList.remove("input__error--shown")
            inputValidation.inputDollar = true; 
            checkInputs(); 
        }
    } else {
        errorMsg[0].textContent = "Cannot be 0 or blank"; 
        errorMsg[0].classList.add("input__error--shown")
        inputValidation.inputDollar = false; 
        checkInputs(); 
    }
}); 

tipCheckbox.forEach(checkbox => {
    checkbox.addEventListener("click", function() {
        let checked = document.querySelector(".checked");
        if (checked) {
            checked.classList.remove("checked"); 
            checkbox.classList.add("checked"); 
            inputTip.value = ""; 
        } 
        if (!checked) {
            checkbox.classList.add("checked"); 
            inputTip.value = ""; 
        }
        inputValidation.inputTip = true; 
        checkInputs(); 
    })
}); 

inputTip.addEventListener("blur", function() {
    let inputTipNumber = Number(inputTip.value); 
    if (inputTip.value > 0) {
        if (inputTip.value > 99) {
            errorMsg[1].textContent = "Input cannot exceeed 100"; 
            errorMsg[1].classList.add("input__error--shown"); 
            inputValidation.inputTip = false; 
            checkInputs(); 
            return; 
        }
        if (!Number.isInteger(inputTipNumber)) {
            errorMsg[1].textContent = "Must be an integer"; 
            errorMsg[1].classList.add("input__error--shown"); 
            inputValidation.inputTip = false; 
            checkInputs(); 
            return; 
        }
    }
    if (inputTip.value > 0 && document.querySelector(".checked")) {
        let checked = document.querySelector(".checked"); 
        checked.classList.remove("checked"); 
        errorMsg[1].classList.remove("input__error--shown"); 
        inputValidation.inputTip = true; 
        checkInputs()
        return; 
    } else {
        errorMsg[1].classList.remove("input__error--shown"); 
        inputValidation.inputTip = true; 
        checkInputs()
    }
})

inputPeople.addEventListener("blur", function() {
    let inputPeopleDollar = Number(inputPeople.value); 
    if (inputPeople.value > 0) {
        if (!Number.isInteger(inputPeopleDollar)) {
            errorMsg[2].textContent = "Must be integer"; 
            errorMsg[2].classList.add("input__error--shown"); 
            inputValidation.inputPeople = false; 
            checkInputs(); 
            return; 
        }
        errorMsg[2].classList.remove("input__error--shown"); 
        inputValidation.inputPeople = true; 
    } else {
        errorMsg[2].classList.add("input__error--shown")
    }
    checkInputs(); 
}); 

function checkInputs() {
    let tipValue = 0; 
    if (document.querySelector(".input__error--shown")) {
        resultNumbers[0].textContent = "Error"; 
        resultNumbers[1].textContent = "Error";   
        resultsReset.classList.remove("disable"); 
        return; 
    }

    if (document.querySelector(".checked") || inputTip.value) {
        if (document.querySelector(".checked")) {
            tipValue = Number(document.querySelector(".checked").getAttribute("data-tip"))
        }
        else {
            tipValue = Number((inputTip.value / 100) + 1); 
        }
    }
    if (inputValidation.inputDollar && inputValidation.inputTip && inputValidation.inputPeople) {
        resultNumbers[0].textContent = ((Number(tipValue-1)*inputDollar.value).toFixed(2)/Number(inputPeople.value)).toFixed(2); 
        resultNumbers[1].textContent = ((Number(tipValue)*inputDollar.value).toFixed(2) / Number(inputPeople.value)).toFixed(2);  
        resultsReset.classList.remove("disable")
    }
}

resultsReset.addEventListener("click", function() {
    if (resultsReset.classList.contains("disable")) {
        return; 
    }
    if (document.querySelector(".checked")) {
        let checked = document.querySelector(".checked"); 
        checked.classList.remove("checked"); 
    }
    inputDollar.value = ""; 
    inputTip.value = ""; 
    inputPeople.value = ""; 
    resultNumbers[0].textContent = "0.00"; 
    resultNumbers[1].textContent = "0.00"; 
    resultsReset.classList.add("disable"); 
})
