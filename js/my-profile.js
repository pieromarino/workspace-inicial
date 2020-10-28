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

    localStorage.setItem("name", newName)
    localStorage.setItem("lastName", newLastName)
    localStorage.setItem("email", newEmail)
    localStorage.setItem("bday", newBday)
    localStorage.setItem("username",newUserName)
    localStorage.setItem("userName", newUserName)
    localStorage.setItem("password", newPassword)
    
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
    document.getElementById('name').value = localStorage.getItem('name')
    document.getElementById('lastName').value = localStorage.getItem('lastName')
    document.getElementById('email').value = localStorage.getItem('email')
    document.getElementById('birthday').value = localStorage.getItem('bday')
    document.getElementById('userName').value = localStorage.getItem('userName')
    document.getElementById('password').value = localStorage.getItem('password')

    name.setAttribute("disabled","")
    lastName.setAttribute("disabled","")
    email.setAttribute("disabled","")
    bday.setAttribute("disabled","")
    userName.setAttribute("disabled","")
    password.setAttribute("disabled","")

    editBtn.onclick = editValues

});