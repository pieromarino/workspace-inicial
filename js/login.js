//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const logAsGuestBtn = document.getElementById("logAsGuest")

const logAsGuest = () => {
  localStorage.removeItem("username");
  window.location.href = "index.html"
}

let userObj = JSON.parse(localStorage.getItem("userObj"))

logAsGuestBtn.onclick = logAsGuest

document.addEventListener("DOMContentLoaded", function (e) {
  const checkValues = () => {
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    if (!user || !password) {
      alert("Ingrese los datos correctamente");
    } else if (userObj){
      if (user == userObj.userName || user == userObj.email) {
        localStorage.setItem("username", user)
        localStorage.setItem("isLoggedIn", "true")
        window.location.href = "index.html"
      } else {
        alert("Datos incorrectos")
      }
    } else if(!userObj){
      alert("No hay usuarios registrados")
    }
  };

  let button = (document.getElementById("login").onclick = function () {
    checkValues();
  });
});
