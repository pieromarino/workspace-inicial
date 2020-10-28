const button = document.getElementById('button')

const saveValues = () => {
    const inputArr = Array.from(document.getElementsByTagName('input'))
    const inputIds = inputArr.map((x) => {return x.id})
    const inputValues = inputArr.map((x) => {return x.value})
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const bday = document.getElementById('bday').value
    const userName = document.getElementById('userName').value
    const password = document.getElementById('password').value
    if(inputValues.includes("")){
        alert('Ingrese TODOS los datos')
    } else {
    localStorage.setItem("name", name)
    localStorage.setItem("lastName", lastName)
    localStorage.setItem("email", email)
    localStorage.setItem("bday", bday)
    localStorage.setItem("userName", userName)
    localStorage.setItem("password", password)
    window.location.href = "login.html"
    }
}

document.addEventListener("DOMContentLoaded", (e) => {

button.onclick = saveValues

})