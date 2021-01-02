window.onload = function () {

    const chooseImgBtn = document.querySelector("#chooseImg");
    chooseImgBtn.addEventListener("click", apiImageFunc);




    //function to call images from API

    async function apiImageFunc(e) {
        e.preventDefault();

        let apiImgDiv = document.querySelector(".apiImageDiv");
        apiImgDiv.classList.add("show-apiImageDiv");

        const closeBtn = document.querySelector(".fa-times-circle");
        closeBtn.addEventListener("click", function () {
            apiImgDiv.classList.remove("show-apiImageDiv");
        });

        const url = "https://api.unsplash.com/search/photos?query=cupcakes&per_page=20&client_id=3JCiE4B5MmNqBKSapU83_51udslQFpkOw_ObgTDTXO8";

        await fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {

                for (let i = 0; i < data.results.length; i++) {


                    let imageElement = document.createElement('img');
                    imageElement.setAttribute("class", "apiImg");
                    imageElement.src = data.results[i].urls.thumb;
                    apiImgDiv.append(imageElement);

                }
            });

        //To select the image chosen and view the source in a div
        let fullPath = document.getElementsByClassName("apiImg");

        for (let i = 0; i < fullPath.length; i++) {

            fullPath[i].addEventListener("click", () => {
                let imgClicked = fullPath[i].currentSrc;
                alert("image chosen");
                let newdivElement = document.createElement("div");
                newdivElement.setAttribute("class", "imgSource");
                newdivElement.textContent = imgClicked;
                let formelement = document.querySelector("form");
                formelement.append(newdivElement);

            });
        }



    }




    const addItembtn = document.querySelector("#addBtn");

    addItembtn.addEventListener("click", loadImg);



    //adding new prodcuts to product.html from addProduct.html
    function loadImg(e) {
        e.preventDefault();

        if (JSON.parse(localStorage.getItem("ProductsCount")) == null) {
            let incrementCount = 4;

            localStorage.setItem("ProductsCount", incrementCount);

        }

        let id = JSON.parse(localStorage.getItem("ProductsCount"));
        let dataFromLocalStorage = JSON.parse(localStorage.getItem("ourProducts"));
        (function addNewProductToLocalStorage() {

            //pushing the new product object to the existing data in local storage
            let item = {
            };
            let itemName = document.querySelector("#itemName").value;
            let price = document.querySelector("#itemPrice").value;
            let imgSourceElement = document.querySelector(".imgSource").textContent;


            item.id = id;
            item.itemName = itemName;
            item.price = price;
            item.imgSrc = imgSourceElement;
            dataFromLocalStorage.push(item);


        })();
        id++;

        // updating the id to next increment value
        //updating the new value to localstorage
        localStorage.setItem("ourProducts", JSON.stringify(dataFromLocalStorage));
        //updating the new increment of id to localstorage
        localStorage.setItem("ProductsCount", id);

        alert("item added");
        window.location.reload();

    }
}

if (JSON.parse(localStorage.getItem("ourProducts")) == null) {
    localStorage.setItem("ourProducts", JSON.stringify(products));

}
else {
    //if localstorage has data creating those products dynamically in product.html
    let currentProducts = JSON.parse(localStorage.getItem("ourProducts"));

    for (let i = 0; i < currentProducts.length; i++) {

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
               <button id= ${currentProducts[i].id} class="link-button" onclick="updateItem(this)">Edit</button>
               <button id= ${currentProducts[i].id} class="remove-item-button" onclick= "deleteItem(this)">Remove</button>
           </div>
           </div>
           `;
        let cardContainersDiv = document.querySelector(".card-containers");
        cardContainersDiv.appendChild(newDiv);
    }

}
//Delete item function
function deleteItem(product) {

    const item = JSON.parse(localStorage.getItem("ourProducts"))

    for (let i = 0; i < item.length; i++) {
        if (product.id == item[i].id) {
            item.splice(i, 1);

            localStorage.setItem("ourProducts", JSON.stringify(item));
        }
        location.reload();

    }
}

//update item function
function updateItem(product) {
    (product.parentElement.parentElement.parentElement).classList.add("card-highlight");
    const item = JSON.parse(localStorage.getItem("ourProducts"));

    for (let i = 0; i < item.length; i++) {
        if (product.id == item[i].id) {
            document.getElementById("addBtn").style.display = 'none';
            document.getElementById("updateBtn").style.display = 'block';
            document.getElementById("itemid").value = item[i].id;
            document.getElementById("itemName").value = item[i].itemName;
            document.getElementById("itemPrice").value = item[i].price;
            document.querySelector(".imgSource").textContent = item[i].imgSrc;
        }
    }
}

let updateBtn = document.getElementById("updateBtn");
updateBtn.addEventListener("click", saveUpdate);


//function that saves the new changes to local storage
function saveUpdate() {
    const item = JSON.parse(localStorage.getItem("ourProducts"))
    let idChange = document.getElementById("itemid").value;
    for (let i = 0; i < item.length; i++) {
        if (idChange == item[i].id) {
            item[i].itemName = document.getElementById("itemName").value;
            item[i].price = document.getElementById("itemPrice").value;
            item[i].imgSrc = document.querySelector(".imgSource").textContent;
            localStorage.setItem("ourProducts", JSON.stringify(item));
            location.reload();

        }
    }
}

