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

/* function showRating(rating) {
  let ratingId = document.getElementById("commentRating");
  content = "";
  moreContent = "";
  for (i = 0; i < rating; i++) {
    content += '<span class="fa fa-star checked"></span>';
  }
  for (i = 5; i > rating; i--) {
    moreContent += '<span class="fa fa-star"></span>';
  }
  ratingId.innerHTML += content;
  ratingId.innerHTML += moreContent;
  console.log("no funca esto lpm");
}
*/

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
        let htmlcontentxD = "<strong>hola</strong>";
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
                <div class="productRating" id="commentRating">Rating: ${estrellaChecked.repeat(
                  currentRating
                )}${estrella.repeat(5 - currentRating)}</div>
            </div>
        </div>
    </div>`;
      }
      document.getElementById("comments").innerHTML += content;
    });
});
