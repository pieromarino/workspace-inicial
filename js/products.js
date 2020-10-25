const productsRow = document.getElementById("productsRow")


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
  if (!filteredList.length) {
    filteredList = list;
  }
  let htmlContentToAppend = "";
  document.getElementsByClassName(
    "container p-5"
  )[0].innerHTML = htmlContentToAppend;
  for (let i = 0; i < filteredList.length; i++) {
    let category = filteredList[i];
    if (filteredList) {
      htmlContentToAppend +=
        `
        <div class="card m-4">
        <div class="card" style="width: 330px;">
          <img class="card-img-top" src="${category.imgSrc}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${category.name} <b>$${category.cost}</b></h5>
            <p class="card-text">${category.description}</p>
            <p class="footer">${category.soldCount} vendidos</p>
            <a href="product-info.html" class="btn btn-primary">Ir al producto</a>
          </div>
        </div>
        </div>
        `;
    }
  }

  productsRow.innerHTML = htmlContentToAppend;

}

document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementsByClassName("alert alert-danger")[0].style.display =
    "none";
  document.getElementsByClassName("container p-5")[0].style.display = "none";

  fetch(PRODUCTS_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      list = myJson;
      showProductsList();
    });
});
