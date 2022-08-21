let productos=[]; //var se usaba en ECMAScript 5 y LET que es una variable que aparecio en ECMAScript 6 y esta solo vive dentro de la funcion que ha sido declarada

let catalogo= document.getElementById("catalogo");


//Cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')
//abre el carrito
cartIcon.onclick = () =>{
    cart.classList.add("active");
};
//cierra el carrito
closeCart.onclick = () =>{
    cart.classList.remove("active");
};


//carrito working js
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

//making function
function ready(){
    //remover items del carrito
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++ ){
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++ ){
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++ ){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    //buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}
//buy button
function buyButtonClicked(){
    alert("Tu Pedido esta listo")
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}


//quantity changes
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

//remover items del carrito
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//add to cart
function addCartClicked(event){
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}
function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++ ) {
        if (cartItemsNames[i].innerText == title){
            alert("Ya Agregaste Este Producto A Carrito");
            return;
        }
  }
  

var cartBoxContent = `
                        <img src=${productImg} alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        
                    
                        <!--Remove cart-->
                        <i class='bx bxs-trash cart-remove'></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click" , removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change" , quantityChanged);
}






//Update Total
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$","")); //revisar despues con parse int
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        // if price contain some cents some
    total = Math.round(total * 100) / 100;

    document.getElementsByClassName("total-price")[0].innerText = "$" + total;
    
}









function cargaInicial(){
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            localStorage.setItem("catalogo",xhr.responseText);
        }
    }

    xhr.open("get","js/productos.json");
    xhr.send();
}

function leerDatos(){
    let resultado = localStorage.getItem("catalogo");
    productos = JSON.parse(resultado).productos;
    console.log(productos);
    dibujar(productos);
}







var ufS = localStorage.getItem('unidadFomento');
ufS = JSON.parse(ufS);
var ufx = (ufS[0]);
console.log(ufS);


apturarUF();
let unidadFomento = [];
function obtenerUF(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState===4 && xhr.status===200){
            var respuesta= xhr.responseText;
            var json = JSON.parse(respuesta);
            var valorUF= json.UFs[0].Valor;
            console.log(valorUF);
            console.log(typeof valorUF)
            let output = parseInt(valorUF.replace(/\./g,''));
            unidadFomento.push(output);
            localStorage.setItem("unidadFomento", JSON.stringify(unidadFomento));
        }
    }



xhr.open("get","https://api.sbif.cl/api-sbifv3/recursos_api/uf?apikey=a6073621b6b49dffb8bcd2fe83dc304888a6766b&formato=json");//get,post,put,delete
xhr.send();

}




console.log(unidadFomento);