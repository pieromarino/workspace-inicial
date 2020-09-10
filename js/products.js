let list = [];
let filteredList = list;

rangePriceMinimum = document.getElementById("rangePriceMin");
rangePriceMaximum = document.getElementById("rangePriceMax");

const sortByPriceAsc = () => {
  filteredList.sort((a, b) => a.cost - b.cost);
  showProductsList();
};

const sortByPriceDesc = () => {
  filteredList.sort((a, b) => b.cost - a.cost);
  showProductsList();
};

const sortBySoldCount = () => {
  list.sort((a, b) => b.soldCount - a.soldCount);
  showProductsList();
};

const sortByDefinedPrice = (minPrice, maxPrice) => {
  const filterPrices = list.filter((product) => {
    if (product.cost >= minPrice && product.cost <= maxPrice) {
      return product;
    } else if (product.cost >= minPrice && maxPrice === "") {
      return product;
    } else if (product.cost <= maxPrice && minPrice === "") {
      return product;
    }
  });
  filteredList = filterPrices;
  showProductsList();
};

function showProductsList() {
  let htmlContentToAppend = "";
  document.getElementsByClassName(
    "container p-5"
  )[0].innerHTML = htmlContentToAppend;
  for (let i = 0; i < filteredList.length; i++) {
    let category = filteredList[i];
    if (filteredList) {
      htmlContentToAppend +=
        `
      <a href="product-info.html" class="list-group-item list-group-item-action">
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
        <p><strong>` +
        category.soldCount +
        ` vendidos </strong></p>
              </div>
          </div>
      </a>
      `;
    }
  }

  document.getElementsByClassName(
    "container p-5"
  )[0].innerHTML = htmlContentToAppend;
}

// cambia las fotos del celerio y peugeot que estan mal
function changePics() {
  let celerio = document.getElementsByClassName("img-thumbnail")[2];
  let peugeot = document.getElementsByClassName("img-thumbnail")[3];

  celerio.src = "img/prod4.jpg";
  peugeot.src = "img/prod3.jpg";
}

document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementsByClassName("alert alert-danger")[0].style.display =
    "none";

  fetch(PRODUCTS_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      for (i = 0; i < myJson.length; i++) {
        list.push(myJson[i]);
      }
      showProductsList();
    });
});
