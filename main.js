//login function

function validate() {
   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;

   if (!username || !password) return;
   if (username == "admin" && password == "123") {
      alert("Login succesful as admin");
      window.location.replace('addProduct.html');
   }
   else if (username == "user" && password == "1212") {
      alert("Login succesful as user");
      window.location.replace('products.html');
   }


   else {
      alert("Login failed");
      return false;
   }
};

//------------ LOGIN SECTION END -------------------------

//-------------Product card add to product.html------------
//plus

window.onload = function cardAddFunction() {

   //Setting up localstorage with products array
   let products = [{
      id: 1,
      itemName: "Christmas cupcakes",
      price: 2,
      imgSrc: "images/jul-muffin.jpg"
   },
   {

      id: 2,
      itemName: "Blueberry cupcakes",
      price: 3,
      imgSrc: "images/blåbärsmuffin.jpg"

   },
   {
      id: 3,
      itemName: "Cardemom cupcakes",
      price: 3,
      imgSrc: "images/kardemummamuffin.jpg"


   }

   ];

   //------------------------setting up localstorage---------------
   if (JSON.parse(localStorage.getItem("ourProducts")) == null) {
      localStorage.setItem("ourProducts", JSON.stringify(products));
      //window.location.reload();
   }
   else {
      //if localstorage has data creating those products dynamically in product.html
      let currentProducts = JSON.parse(localStorage.getItem("ourProducts"));

      for (let i = 0; i < currentProducts.length; i++) {
         let cardContainersDiv = document.querySelector(".card-containers");
         let newDiv = document.createElement("div");
         newDiv.classList.add("card");
         newDiv.innerHTML += `
         <img class="img-style" src="${currentProducts[i].imgSrc}" alt="Julmuffin">
         <div class="card-body">
             <div class="card-title">
                 <div class="product-name-style">${currentProducts[i].itemName}</div>
             </div>
             <div class="card-desc">
                 <div class="product-price-style">$ <span> ${currentProducts[i].price}</span> </div>
                 <button class="link-button" onclick= "addCartFunc(${currentProducts[i].id})">Add To Cart</button>
             </div>`;

         cardContainersDiv.append(newDiv);

      }
   };


   //-------------------------------cart adding function---------------------------
   /*cart display function*/

   (function cartFunction() {

      const cartInfo = document.querySelector("#cart-info");
      const cart = document.querySelector("#cart");
      const closeBtn = document.querySelector(".fa-times-circle");
      cartInfo.addEventListener("click", function () {
         cart.classList.add("show-cart");

      });

      closeBtn.addEventListener("click", function () {
         cart.classList.remove("show-cart");
      });

      /*the function for adding cart item is in product.html, and setting "productIncart" in localstorage*/


      let currentDataIn = JSON.parse(localStorage.getItem("productInCart"));

      const headerQuantityIcon = document.querySelector(".item-total");
      let quantity = 0;

      currentDataIn.map(data => {
         quantity = quantity + data.quantity;

      });
      headerQuantityIcon.textContent = quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      if (JSON.parse(localStorage.getItem("productInCart")) == null) {
         cartItem.innerHTML += "No items in cart";

      } else {
         var dataInLocalStorage = JSON.parse(localStorage.getItem("productInCart"));

         var i = 0;
         dataInLocalStorage.map(data => {

            cartItem.innerHTML += `
         <img src="${data.imgSrc}" class="img-fluid"  alt="muffin" id="item-img">
             <div class="item-text">
             <span style="display:none;" id="dataId"> ${data.id}</span>
                 <p id="cart-item-title" class="font-weight-bold mb-0">${data.name}</p>
                 <span id="cart-item-price" class="cart-item-price">
                 <span>$</span>
                 ${data.price}</span>
                 <label for="number">quantity</label>
                 <input id="quantity_input_`+ i + `" onchange="upQuantity(${data.id})" class="cart_input_quantity" type="number" name="" value=${data.quantity} min="0" max="20">
                 <a href="#" onclick="Delete(this)"><i class="fa fa-trash" aria-hidden="true"></i></a>
             </div>
          `;

            i++;

         });



         const cartDiv = document.querySelector(".cart");
         const totalDiv = document.querySelector(".cart-total-container");
         cartDiv.insertBefore(cartItem, totalDiv);


      };


      showTotal();


   })();



   //total function for items added to cart
   function showTotal() {

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

         const navCartTotal = document.querySelector(".cart-total");
         navCartTotal.textContent = "$" + FinalTotal;


      });
      //clear cart function, which clears the localstorage
      (function clearCartFunc() {

         let clearCartBtn = document.querySelector("#clear-cart");

         clearCartBtn.addEventListener("click", () => {

            localStorage.removeItem("productInCart");
            window.location.reload();

         });


      })();

      //checkout function
      (function checkout() {
         let checkOutBtn = document.querySelector("#checkout");
         checkOutBtn.addEventListener("click", () => {
            window.location.replace("checkout.html");


         })


      })();


   };

}