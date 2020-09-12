//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let alert1 = document.getElementsByClassName("alert alert-danger")[0];
let relatedList = [];

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
        <div class="gallery">
            
                <img class="img-gallery" src="` +
      imageSrc +
      `" alt="">
            
        </div>
        `;

    document.getElementById(
      "productImagesGallery"
    ).innerHTML = htmlContentToAppend;
  }
}

function displayComment() {
  let userino = localStorage.getItem("username");
  let userDiv = document.getElementById("userProfile");
  if (userino === null || userDiv.innerHTML === "null") {
    alert("Inicia sesion para poder comentar");
  } else {
    let commentInfoBody = document.getElementById("commentValue").value;
    let commentInfoRating = document.getElementById("ratingValue").value;
    let estrellaChecked = '<span class="fa fa-star checked"></span>';
    let estrella = '<span class="fa fa-star"></span>';
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDay();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    if (commentInfoBody === "" || commentInfoRating === "") {
      alert("Ingrese un comentario y calificacion");
    } else {
      if (month < 10) {
        month = `0${d.getMonth()}`;
      }

      if (day < 10) {
        day = `0${d.getDay()}`;
      }

      if (hours < 10) {
        hours = `0${d.getHours()}`;
      }

      if (minutes < 10) {
        minutes = `0${d.getMinutes()}`;
      }

      if (seconds < 10) {
        seconds = `0${d.getSeconds()}`;
      }

      let content = `<div class="list-group-item list-group-item-action">
  <div class="row">
      <div class="col">
          <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1" id="username">${localStorage.getItem(
                "username"
              )}</h4>
              <small class="commentDate" id="date">${
                year +
                "-" +
                month +
                "-" +
                day +
                " " +
                hours +
                ":" +
                minutes +
                ":" +
                seconds
              }</small>
          </div>
          <p class="mb-1" id="review ">${commentInfoBody}</p>
          <div class="productRating" id="commentRating">Calificacion: ${estrellaChecked.repeat(
            commentInfoRating
          )}${estrella.repeat(5 - commentInfoRating)}</div>
      </div>
  </div>
</div>`;
      document.getElementById("comments").innerHTML += content;
    }
  }
}

function showRelatedProducts(array) {
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productsList = resultObj.data;

      let htmlProducts = "";

      for (let i = 0; i < array.length; i++) {
        let currentRelatedProduct = array[i];
        let relatedProduct = productsList[currentRelatedProduct];

        htmlProducts +=
          `
              <div class= "col-lg-3 col-md-4 col-6 border" id="relatedCard">
                  <div id="relatedProductImg" class= "row">
                      <img class="img-fluid p-2" src="` +
          relatedProduct.imgSrc +
          `">                                              
                  </div>                   
                  <div "relatedProductInfo" class= "row p-2">
                  <p>` +
          relatedProduct.name +
          `</p> 
                  <p>` +
          relatedProduct.description +
          `</p>
                  </div>
                  <div class= "row p-2">
                  <a href=""><strong>Ir al producto</strong></a>
                  </div>                     
              </div>`;
      }
      document.getElementById("relatedProducts").innerHTML = htmlProducts;
    }
  });
}

document.addEventListener("DOMContentLoaded", function (e) {
  alert1.style.display = "none";
  fetch(PRODUCT_INFO_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (product) {
      let productName = document.getElementById("productName");
      let productCost = document.getElementById("productCost");
      let productDescription = document.getElementById("productDescription");
      let productSoldCount = document.getElementById("productSoldCount");
      productName.innerHTML = `${product.name}`;
      productCost.innerHTML = `$ ${product.cost}`;
      productDescription.innerHTML = `${product.description}`;
      productSoldCount.innerHTML = `${product.soldCount} vendidos`;
      showImagesGallery(product.images);
      showRelatedProducts(product.relatedProducts);
    });
  fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (product) {
      let content = "";
      for (i = 0; i < product.length; i++) {
        let currentComment = product[i];
        let currentRating = product[i].score;
        let estrellaChecked = '<span class="fa fa-star checked"></span>';
        let estrella = '<span class="fa fa-star"></span>';
        content += `<div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1" id="username">${currentComment.user}</h4>
                    <small class="commentDate" id="date">${
                      currentComment.dateTime
                    }</small>
                </div>
                <p class="mb-1" id="review ">${currentComment.description}</p>
                <div class="productRating" id="commentRating">Calificacion: ${estrellaChecked.repeat(
                  currentRating
                )}${estrella.repeat(5 - currentRating)}</div>
            </div>
        </div>
    </div>`;
      }
      document.getElementById("comments").innerHTML += content;
    });
});
