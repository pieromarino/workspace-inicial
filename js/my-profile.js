//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const name = document.getElementById('name')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const bday = document.getElementById('birthday')
const userName = document.getElementById('userName')
const password = document.getElementById('password')
const editBtn = document.getElementById('editBtn')
const confirmDiv = document.getElementById('confirmDiv')
const cancelDiv = document.getElementById('cancelDiv')
let userObj = JSON.parse(localStorage.getItem("userObj"))
let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"))

console.log(userObj)

let isEditable = false;

const editValues = () => {
    isEditable = !isEditable;

    if(isEditable) {
        name.removeAttribute("disabled")
        lastName.removeAttribute("disabled")
        email.removeAttribute("disabled")
        bday.removeAttribute("disabled")
        userName.removeAttribute("disabled")
        password.removeAttribute("disabled")

        editBtn.setAttribute("disabled","")

        cancelDiv.append(cancelBtn)
        confirmDiv.append(confirmBtn)

    } else {
        name.setAttribute("disabled","")
        lastName.setAttribute("disabled","")
        email.setAttribute("disabled","")
        bday.setAttribute("disabled","")
        userName.setAttribute("disabled","")
        password.setAttribute("disabled","")

        editBtn.removeAttribute("disabled")

        cancelDiv.removeChild(cancelBtn)
        confirmDiv.removeChild(confirmBtn)
    }

}

const confirm = () => {
    newName = document.getElementById('name').value
    newLastName = document.getElementById('lastName').value
    newEmail = document.getElementById('email').value
    newBday = document.getElementById('birthday').value
    newUserName = document.getElementById('userName').value
    newPassword = document.getElementById('password').value

    let obj = {
        name: newName,
        lastName: newLastName,
        email: newEmail,
        bday: newBday,
        userName: newUserName,
        password: newPassword,
    }

    let objString = JSON.stringify(obj)
    localStorage.setItem("userObj", objString)
    localStorage.setItem("username", newUserName)

    alert('Tus cambios han sido guardados')

    location.reload();
}

const cancelBtn = document.createElement("button")
cancelBtn.type = "button"
cancelBtn.className = "btn btn-outline-danger mt-4 p-3"
cancelBtn.innerHTML = "Cancelar"
cancelBtn.onclick = editValues

const confirmBtn = document.createElement("button")
confirmBtn.type = "button"
confirmBtn.className = "btn btn-outline-success mt-4 p-3"
confirmBtn.innerHTML = "Confirmar"
confirmBtn.onclick = confirm


document.addEventListener("DOMContentLoaded", function (e) {

    name.setAttribute("disabled","")
    lastName.setAttribute("disabled","")
    email.setAttribute("disabled","")
    bday.setAttribute("disabled","")
    userName.setAttribute("disabled","")
    password.setAttribute("disabled","")

    if(isLoggedIn){
    document.getElementById('name').value = userObj.name
    document.getElementById('lastName').value = userObj.lastName
    document.getElementById('email').value = userObj.email
    document.getElementById('birthday').value = userObj.bday
    document.getElementById('userName').value = userObj.userName
    document.getElementById('password').value = userObj.password
    } else {
        editBtn.style.display = "none"
    }
    editBtn.onclick = editValues

});