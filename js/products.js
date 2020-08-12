//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  fetch("https://japdevdep.github.io/ecommerce-api/product/all.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      let arr = [];
      for (i = 0; i < myJson.length; i++) {
        currentProductsArray.push(myJson[i]);
      }
      console.log(currentProductsArray);
      showProductsList();
    });
});

let currentProductsArray = [];

function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let category = currentProductsArray[i];
    if (1 < 2) {
      htmlContentToAppend +=
        `
      <a href="" class="list-group-item list-group-item-action">
          <div class="row">
              <div class="col-3">
                  <img src="` +
        category.imgSrc +
        `" alt="` +
        category.description +
        `" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">` +
        category.name +
        `</h4>
                      <small class="text-muted">` +
        category.cost +
        ` dolares</small>
                  </div>
                  <p class="mb-1">` +
        category.description +
        `</p>
              </div>
          </div>
      </a>
      `;
    }
  }

  document.getElementsByClassName("alert alert-danger")[0].style.display =
    "none";
  document.getElementsByClassName(
    "container p-5"
  )[0].innerHTML = htmlContentToAppend;
  console.log(htmlContentToAppend);
  changePics();
}

// cambia las fotos del celerio y peugeot que estan mal
function changePics() {
  let celerio = document.getElementsByClassName("img-thumbnail")[2];
  let peugeot = document.getElementsByClassName("img-thumbnail")[3];

  celerio.src = "img/prod4.jpg";
  peugeot.src = "img/prod3.jpg";
}
