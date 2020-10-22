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
const modalDiv = document.getElementById("modal-btn-div")
const modalBody = document.getElementsByClassName("modal-body")[0]
const accordion = document.getElementById("accordion")
const radio = document.getElementsByName("radios");
const form = document.getElementById("shipments")
const shipmentCost = document.getElementById("shipmentCost")
const modal = document.getElementsByClassName("modal-header")[0]
const accordionVisa = document.getElementById("accordionVisa")
const accordionMaster = document.getElementById("accordionMaster")
const accordionPaypal = document.getElementById("accordionPaypal")
const visaBody = document.getElementById("visaBody")
const masterBody = document.getElementById("masterBody")
const paypalBody = document.getElementById("paypalBody")



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
    showShipCost();
};

const changeCurrency = () => {
    let string = String(total.innerHTML)
    let arr = string.split(" ")
    let num = arr[0]
    let curr = arr[1]
    let shipCost = String(shipmentCost.innerHTML)
    let shipArr = shipCost.split(" ")
    let shipNum = shipArr[0]
    let subtCost = String(subtotal.innerHTML)
    let subtArr = subtCost.split(" ")
    let subtNum = subtArr[0]

    if (curr === "USD") {
        num = num * 40;
        curr = "UYU"
        shipNum = shipNum * 40
        subtNum = subtNum * 40
        btn.innerHTML = "Ver en USD"
    } else if (curr === "UYU") {
        num = num / 40;
        curr = "USD"
        shipNum = shipNum / 40;
        subtNum = subtNum / 40;
        btn.innerHTML = "Ver en UYU"
    }
    shipmentCost.innerHTML = `${shipNum} ${curr}`
    subtotal.innerHTML = `${subtNum} ${curr}`
    total.innerHTML = `${num} ${curr}`
}

const btn = document.createElement("button")
btn.type = "button";
btn.className = "currency-button"
btn.onclick = changeCurrency
btn.innerHTML = "Ver en UYU"
btnDiv.append(btn)

const checkOutBtn = document.createElement("button")
checkOutBtn.type = "button"
checkOutBtn.className = "modal-button"
checkOutBtn.innerHTML = "Métodos de pago"
checkOutBtn.setAttribute("data-toggle", "modal")
checkOutBtn.setAttribute("data-target", "#paymentModal")
modalDiv.append(checkOutBtn)

const makePayment = () => {
    accordion.style.display = "none"
    modalBody.innerHTML = `
    <div class="alert-success rounded" role="alert">
  <h4 class="alert-heading p-2">Su pago se ha realizado con exito</h4>
  <p class="p-2">Se ha enviado un correo electronico a su cuenta con la informacion de su compra</p>
</div>`
document.getElementById("cartBody").style.display = "none"
document.getElementsByClassName("container p-5")[0].innerHTML = `

<h1 class="display-4">Parece que no hay nada en tu carrito :(</h1>
<p class="lead">
  <a class="btn btn-primary btn-lg mt-8" href="./cart.html" role="button">Actualizar la pagina</a>
</p>
`
}

const payBtn = document.createElement("button")
payBtn.type = "button"
payBtn.className = "btn btn-primary btn-lg btn-block mt-3"
payBtn.innerHTML = "Pagar"
payBtn.onclick = makePayment



const appendBtnVisa = () => {
    visaBody.append(payBtn)
}

const appendBtnMaster = () => {
    masterBody.append(payBtn)
}

const appendBtnPaypal = () => {
    paypalBody.append(payBtn)

}

accordionVisa.onclick = appendBtnVisa
accordionMaster.onclick = appendBtnMaster
accordionPaypal.onclick = appendBtnPaypal


const getValue = () => {
    for (i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return Number(radio[i].value)
        }
    }
}

const showShipCost = () => {
    let value = getValue()
    let arr = subtotal.innerHTML.split(" ")
    let number = Number(arr[0])
    let curr = arr[1]
    let result = Number((number * value).toFixed(2));
    shipmentCost.innerHTML = `${result} ${curr}`
    total.innerHTML = `${number + result} ${curr}`
}

form.onchange = showShipCost;

const removeItem = (e) => {
    let string = String(e.target.id)
    let arr = string.split("-")
    let index = arr[1]
    let curr = total.innerHTML.split(" ")[1]
    let idToDelete = `wholeRow-${index}`
    document.getElementById(idToDelete).remove()
    let cartItems = Array.from(document.getElementsByClassName("cartRow"))
    console.log(cartItems)
    if (cartItems.length == 0) {
        document.getElementById("cartBody").style.display = "none"
        document.getElementsByClassName("container p-5")[0].innerHTML = `
        
        <h1 class="display-4">Parece que no hay nada en tu carrito :(</h1>
        <p class="lead">
          <a class="btn btn-primary btn-lg mt-8" href="./cart.html" role="button">Actualizar la pagina</a>
        </p>
      `
    } else {
        showTotal()
        showShipCost()
    }
}

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
                const remove = row.insertCell(5);

                const removeBtn = document.createElement("button")
                removeBtn.type = "button"
                removeBtn.innerHTML = "X"
                removeBtn.id = `remove-${index}`
                removeBtn.className = "btn btn-outline-danger"
                removeBtn.onclick = removeItem;
                //creo el input que va a llevar una cantidad editable
                const input = document.createElement("input");
                input.type = "number";
                input.className = "form-control";
                input.value = article.count;
                input.id = `row-${index}`;
                input.onchange = () => { showSubtotal(index) };

                //assigno valores/propiedades para cada uno de los elementos
                row.id = `wholeRow-${index}`
                row.className = "cartRow"
                img.innerHTML = `<img src="${article.src}" width="100px">`;
                name.innerHTML = article.name;
                cost.innerHTML = `${article.unitCost} ${article.currency}`;
                cost.id = `cost-${index}`
                count.append(input);
                subtotal.innerHTML = `${article.unitCost * article.count} ${article.currency}`;
                subtotal.id = `subtotal-${index}`;
                subtotal.className = "subt"
                count.style.width = "38px";
                remove.append(removeBtn)
                showTotal();
                showShipCost();
            });
        });
    total.style.width = "200px"
    tr.style.background = "linear-gradient(90deg, rgba(232,102,131,1) 0%, rgba(221,47,86,1) 100%)"
    tr.style.color = "white"

});
