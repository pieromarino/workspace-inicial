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

document.addEventListener("DOMContentLoaded", function (e) {
  let productName = document.getElementById("productName");
  let productCost = document.getElementById("productCost");
  let productDescription = document.getElementById("productDescription");
  let productSoldCount = document.getElementById("productSoldCount");

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
});
