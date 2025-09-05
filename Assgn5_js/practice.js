// i)
function calculate(){
    const a = Number(document.getElementById("first").value)
    const b = Number(document.getElementById("second").value)
    document.getElementById("first_ans").textContent =`Sum: ${a+b} Difference: ${a-b} Product: ${a*b} Quotient: ${a/b}`
}

// ii)
let arr = [1,100,4,10,60]
let max = 0, min = 500
for(let i=0;i<5;i++){
    if(arr[i] > max) max = arr[i]
    if(arr[i] < min) min = arr[i]
}
console.log("Max: ", max)
console.log("Min: ",min)

arr.sort(function(a,b) { return a-b })
console.log("Ascending: ", arr)
arr.sort(function(a,b){ return b-a })
console.log("Descending: ", arr)

// iii)
function validateForm(){
    const name = document.getElementById("name").value
    const mail = document.getElementById("email").value
    const age = parseInt(document.getElementById("age").value, 10)

    let text = ""
    if(name === "") text += "Name is required. "

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailPattern.test(mail)) text += "Email is not valid. "

    if(isNaN(age) || age<18 || age>100) text += "Invalid age. "
    document.getElementById("third_ans").textContent = text
}

// iv)
function createObject(){
    const name = document.getElementById("name4").value
    const grade = document.getElementById("grade").value
    const age = parseInt(document.getElementById("age4").value, 10)

    let student = {Name : name, Age: age, Grade: grade}
    student.class = "2"
    student.Grade = 78
    document.getElementById("fourth_ans").textContent = `Name : ${student.Name} Age: ${student.Age} Grade: ${student.Grade} Class: ${student.class}`
}

// v)
function arrayMethods(){
    const input = document.getElementById("array").value
    const arr = input.split(',').map(n => Number(n.trim()))
    const no_odd = arr.filter(n => n%2 === 0)
    const by2 = no_odd.map(n => n*2)
    const sum = by2.reduce((sum, num) => sum+num, 0)
    
    document.getElementById("fifth_ans").textContent = `No odd: ${no_odd}, Doubled: ${by2}, Sum: ${sum}`
}
