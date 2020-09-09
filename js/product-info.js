//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let alert = document.getElementsByClassName("alert alert-danger")[0];

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` +
      imageSrc +
      `" alt="">
            </div>
        </div>
        `;

    document.getElementById(
      "productImagesGallery"
    ).innerHTML = htmlContentToAppend;
  }
}

function displayComment() {
  let commentInfoBody = document.getElementById("commentValue").value;
  let commentInfoRating = document.getElementById("ratingValue").value;
  let estrellaChecked = '<span class="fa fa-star checked"></span>';
  let estrella = '<span class="fa fa-star"></span>';
  let d = new Date();
  console.log(commentInfoBody);
  console.log(commentInfoRating);
  console.log(d.getMonth());
  let content = `<div class="list-group-item list-group-item-action">
  <div class="row">
      <div class="col">
          <div class="d-flex w-100 justify-content-between">
              <h4 class="mb-1" id="username">${localStorage.getItem(
                "username"
              )}</h4>
              <small class="text-muted" id="date">${
                d.getFullYear() +
                "-" +
                (d.getMonth() + 1) +
                "-" +
                d.getDay() +
                " " +
                d.getHours() +
                ":" +
                d.getMinutes() +
                ":" +
                d.getSeconds()
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

document.addEventListener("DOMContentLoaded", function (e) {
  alert.style.display = "none";
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
    });
  fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (product) {
      let content = "";
      console.log(product);
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
                    <small class="text-muted" id="date">${
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
