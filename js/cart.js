//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const CART_LINK = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

const table = document.getElementById("tableBody");
const total = document.getElementById("total-price")
const subtotal = document.getElementById("subtotal-price");
const tr = document.getElementById("tr");
const btnDiv = document.getElementById("btnDiv")
const currencyBtn = document.getElementById("currencyBtn")

//funcion para mostrar el total
const showTotal = () => {
  let costs = Array.from(document.getElementsByClassName("subt"));
  //loopeo sobre los el array costs 
  let arr = costs.map((x) => {
    x.style.width = "150px"
    //defino los valores para hacer los calculos y me aseguro de que todo se pase como USD
    let str = String(x.innerHTML);
    let subArr = str.split(" ")
    let num = parseInt(subArr[0]);
    let curr = String(subArr[1])
    curr != "USD" ? num = num / 40 : num = num;
    return num
  })
  //sumo los todos los elementos en el array creado anteriormente
  let result = arr.reduce((a, b) => a + b)
  //actualizo el contenido de los elementos
  subtotal.innerHTML = `${result} USD`;
  total.innerHTML = `${result} USD`;
}

const showSubtotal = (index) => {
  const count = document.getElementById(`row-${index}`).value
  let costInner = document.getElementById(`cost-${index}`).innerHTML
  //divido el string y separo los numeros de la currency
  let arr = costInner.split(" ")
  let cost = arr[0]
  let currency = costInner.split(" ")[1];
  //calculo el costo subtotal y añado la currency
  document.getElementById(`subtotal-${index}`).innerHTML = `${cost * count} ${currency}`;
  btn.innerHTML = "Ver en UYU"
  showTotal();
};

const changeCurrency = () => {
  let string = String(total.innerHTML)
  let arr = string.split(" ")
  let num = arr[0]
  let curr = arr[1]
  if (curr === "USD") {
    num = num * 40;
    curr = "UYU"
    btn.innerHTML = "Ver en USD"
  } else if (curr === "UYU") {
    num = num / 40;
    curr = "USD"
    btn.innerHTML = "Ver en UYU"
  }
  subtotal.innerHTML = `${num} ${curr}`
  total.innerHTML = `${num} ${curr}`
}

const btn = document.createElement("button")
btn.type = "button";
btn.className = "currency-button"
btn.onclick = changeCurrency
btn.innerHTML = "Ver en UYU"
btnDiv.append(btn)

document.addEventListener("DOMContentLoaded", (e) => {

  fetch(CART_LINK)
    .then((res) => res.json())
    .then((obj) => {
      const articles = obj.articles;
      articles.map((article, index) => {

        // creo elementos de forma dinamica para mas facil acceso a los mismos
        const row = table.insertRow(0);
        const img = row.insertCell(0);
        const name = row.insertCell(1);
        const cost = row.insertCell(2);
        const count = row.insertCell(3);
        const subtotal = row.insertCell(4);

        //creo el input que va a llevar una cantidad editable
        const input = document.createElement("input");
        input.type = "number";
        input.className = "form-control";
        input.value = article.count;
        input.id = `row-${index}`;
        input.onchange = () => { showSubtotal(index) };

        //assigno valores/propiedades para cada uno de los elementos
        img.innerHTML = `<img src="${article.src}" width="100px">`;
        name.innerHTML = article.name;
        cost.innerHTML = `${article.unitCost} ${article.currency}`;
        cost.id = `cost-${index}`
        count.append(input);
        subtotal.innerHTML = `${article.unitCost * article.count} ${article.currency}`;
        subtotal.id = `subtotal-${index}`;
        subtotal.className = "subt"
        count.style.width = "38px";
        showTotal();
      });
    });
  total.style.width = "200px"
  tr.style.background = "linear-gradient(90deg, rgba(232,102,131,1) 0%, rgba(221,47,86,1) 100%)"
  tr.style.color = "white"

});
