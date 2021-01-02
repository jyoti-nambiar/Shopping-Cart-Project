
/*
const checkOutBtn = document.querySelector("#checkout");


checkOutBtn.addEventListener("click", ()=>{

let productInCart = JSON.parse(localStorage.getItem("productInCart"))

window.document.location="./checkout.html";

})
*/


// hämtar värden från localStorage med key = "productInCart" samt gör om till en array
var productInCart = JSON.parse(localStorage.getItem("productInCart"))

// loopar igenom prodcutInCart arrayen
for (var i = 0; i < productInCart.length; i++) {
    var newElement = document.createElement("div");
    // skapar en ny div som vi ger namnet newElement

    // skapar en struktur för html
    newElement.innerHTML = `
    <div class="checkout-card">
    <div class="checkout-title">${productInCart[i].name}</div>
    <div class="checkout-price"> Price:  &#36;${productInCart[i].price}</div>
    <div class="checkout-quantity"> Quantity: ${productInCart[i].quantity && productInCart[i].quantity > 1 ? productInCart[i].quantity + " pieces" : productInCart[i].quantity + " piece"}</div>
    <div class="checkout-total">Total Price:  &#36;${productInCart[i].price * productInCart[i].quantity}</div>
    </div>
    `;
    let checkoutDiv = document.querySelector(".checkout");
    let cartTotal = document.querySelector(".cart-total-container");


    checkoutDiv.insertBefore(newElement, cartTotal);


}

//calculate the total for receipt
const total = [];
const showTotal = JSON.parse(localStorage.getItem("productInCart"));
showTotal.map(data => {

    total.push(parseFloat(((data.price) * data.quantity)));

    const totalMoney = total.reduce(function (total, item) {
        total += item;
        return total;

    }, 0);


    const FinalTotal = totalMoney.toFixed(2);
    const cartTotal = document.querySelector("#cart-total");
    cartTotal.textContent = FinalTotal;

});



var downloadPDFButton = document.getElementById("download-pdf")
downloadPDFButton.addEventListener("click", downloadPDF)

function downloadPDF() {
    let checkout = document.getElementById("checkoutContainer")
    // html2pdf är en function som vi hämtar från en annan javscript fil, se checkout.html: <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.js"></script>
    html2pdf().from(checkout).save()
}