async function fetchData(url) {
    try {
        const responce = await fetch(url);
        const data = await responce.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const url = '../data/products.json';
const productsDB = await fetchData(url);

const products = document.querySelector('.products');

productsDB.forEach(product => {
    products.insertAdjacentHTML('beforeend', `
        <article class="product">
            <div class="product_photo">
                <img src="${product.img}" alt="${product.name}" />
                <button class="add_to_bascket" value="${product.id}">
                    <img
                        class="bascket_logo"
                        src="./img/basket.svg"
                        alt="bascket"
                    />
                    Add to Cart
                </button>
            </div>
            <div class="product_card">
                <h3 class="product_name">${product.name}</h3>
                <p class="product_description">${product.description}</p>
                <p class="product_price">$${product.price}</p>
            </div>
        </article>
    `)
});

const cart = document.querySelector('.cart');

products.addEventListener('click', (e) => {
    let productID = null;
    if ((e.target.matches(".add_to_bascket"))) {
        productID = e.target.value;
    } else if ((e.target.matches(".bascket_logo"))) {
        productID = e.target.parentElement.value;
    }
    if (productID != null) {
        cart.style.display = "flex";
        const productInCart = document.querySelector(`.productID-${productID}`);
        if (!productInCart) {
            cart.insertAdjacentHTML('beforeend', `
                <div class="cart__product-card productID-${productID}">
                    <div class="cart__product-image">
                        <img class="cart__product-img" src="${productsDB[productID].img}" alt="" srcset=""/>
                    </div>
                    <article class="cart_product-description product_card">
                        <h2 class="cart__product-name">${productsDB[productID].name}</h2>
                        <p class="cart__product-parametr">
                            Price: <span class="cart__product-price">$${productsDB[productID].price}</span>
                        </p>
                        <p class="cart__product-parametr">
                            Color: <span class="cart__product-color">${productsDB[productID].color}</span>
                        </p>
                        <p class="cart__product-parametr">
                            Size: <span class="cart__product-size">${productsDB[productID].size}</span>
                        </p>
                        <p class="cart__product-parametr">
                            Quantity: 
                            <input class="cart__product-quantity" type="number" name="" id="" min="1" value="1"/>
                        </p>
                    </article>
                    <button class="cart__product-delete">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                            />
                        </svg>
                    </button>
                </div>
            `)
        } else {
            ++productInCart.querySelector('.cart__product-quantity').value;
        }
    };
});
