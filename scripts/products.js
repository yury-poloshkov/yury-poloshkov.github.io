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

console.log(productsDB);

const products = document.querySelector('.products');

console.log(products);

productsDB.forEach(element => {
    console.log(element);
});

productsDB.forEach(product => {
    products.insertAdjacentHTML('beforeend', `
        <article class="product">
            <div class="product_photo">
                <img src="${product.img}" alt="${product.name}" />
                <button class="add_to_bascket">
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

