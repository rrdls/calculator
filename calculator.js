const mathjs = require("mathjs")

const { ipcRenderer } = require('electron');



var arrayNumbers = []



function minimize() {
    ipcRenderer.send('minimize')
}


function quit() {
    ipcRenderer.send('close')
}


function display(event) {
    if (event.innerText == "×") {
        var number = "*"
    }
    else if (event.innerText == "√") {
        var number = "sqrt("
    }

    else if (event.innerText == "−") {
        var number = "-"
    }
    else if (event.innerText == "x²") {
        var number = "^2"
    }
    else {
        var number = event.innerText
    }


    arrayNumbers.push(number)
    document.getElementById("tela").innerText = arrayNumbers.join("")

}

function erase() {
    arrayNumbers.pop()
    document.getElementById("tela").innerText = arrayNumbers.join("")
}


function result() {
    var x = 0
    var arrayOfIndex = [];
    for (i of arrayNumbers) {
        if (i == 'sqrt(') {
            x += 1
        }
    }
    for (i in arrayNumbers) {
        if (arrayNumbers[i] == 'sqrt(') {
            arrayOfIndex.push(i)
        }
    }

    // if (arrayNumbers.indexOf('sqrt(') > -1) {
    //     var index = arrayNumbers.findIndex((i) => { return i == "sqrt(" })

    //     if (arrayNumbers[index + 2] != ')') {
    //         arrayNumbers[index + x] = arrayNumbers[index + x] + ")"
    //     }

    // }
    try {
        var operation = mathjs.eval(arrayNumbers.join(""))
    } catch{

        alert(' The expression is incorrect. \n Warning: Expressions like sqrt (x) and x² do not work without closing parentheses.')

    }
    if (operation % 1 === 0) {
        document.getElementById("tela").innerText = operation
    }
    else {
        document.getElementById("tela").innerText = operation.toFixed(12)
    }
    arrayNumbers = []


    arrayNumbers.push(operation)
}

function clearAll() {
    arrayNumbers = []
    document.getElementById("tela").innerText = ""
}



// display()
// result(['sqrt(', 'sqrt(', 'sqrt(', '4'])