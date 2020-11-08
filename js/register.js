const button = document.getElementById('button')
const fileInput = document.getElementById('customFile')
const profilePicDataUrl = localStorage.getItem("profilePic")
const reader = new FileReader();

fileInput.addEventListener("change", function () {
    
    reader.addEventListener("load" , () => {
        let currentPic = reader.result
        document.getElementById('profileImg').src = currentPic;
    })

    reader.readAsDataURL(this.files[0])
    
})

const saveValues = () => {
    const inputArr = Array.from(document.getElementsByTagName('input'))
    const inputValues = inputArr.map((x) => {return x.value})
    const name = document.getElementById('name').value
    const lastName = document.getElementById('lastName').value
    const email = document.getElementById('email').value
    const bday = document.getElementById('bday').value
    const userName = document.getElementById('userName').value
    const password = document.getElementById('password').value

    

    let obj = {
        name: name,
        lastName: lastName,
        email: email,
        bday: bday,
        userName: userName,
        password: password,
    }

    let objString = JSON.stringify(obj)

    if(inputValues.includes("")){
        alert('Ingrese TODOS los datos')
    } else {
    localStorage.setItem("userObj", objString)
    localStorage.setItem("profilePic", reader.result)
    console.log(localStorage.getItem("userObj"))
    window.location.href = "login.html"
    }
}



document.addEventListener("DOMContentLoaded", (e) => {

button.onclick = saveValues

})