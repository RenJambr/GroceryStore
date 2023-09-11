const food = [
    {
        id : "1",
        img_src : "banana.png",
        title : "Banana",
        price : "10$",
    },
    {
        id : "2",
        img_src : "broccoli.png",
        title : "Broccoli",
        price : "15$",
    },
    {
        id : "3",
        img_src : "carrot.png",
        title : "Carrot",
        price : "20$",
    },
    {
        id : "4",
        img_src : "watermelon.png",
        title : "Watermelon",
        price : "25$",
    },
    {
        id : "5",
        img_src : "apple.png",
        title : "Apple",
        price : "30$",
    },
];

window.addEventListener('DOMContentLoaded', () => {
    let itemList = document.querySelector('.listOfItems');

    food.forEach(fruit => {
        itemList.innerHTML += `
            <article>
                <img src = "${fruit.img_src}">
                <h3 id = "title">${fruit.title}</h3>
                <input type = "number" placeholder = "Input quantity" min = "1" id = "quantity">
                <p id = "price">${fruit.price}</p>
                <button id = "addButton" onclick = "addToCart(this)">Add to cart</button>
            </article>
        `
    })
})

let allTotal = 0;

function addToCart(e){

    let parentElement = e.parentElement;
    let title = parentElement.querySelector('#title').innerText;
    let price = parentElement.querySelector('#price').innerText;
    let quantity = parentElement.querySelector('#quantity').value;

    if(quantity == undefined || quantity == null || quantity <= 0){
        alert('Enter valid quantity');
        return false;
    } else{

        e.setAttribute('disabled', true)

        price = price.split("$");
        price = parseInt(price);

        let realPrice = price * quantity;

        let basket = document.querySelector('.listOfBasket');

        basket.innerHTML += `
        <div class = "articleInBasket">
            <p>${title} x${quantity}  | ${realPrice}$</p>
            <button id = "deleteBtn" onclick = "deleteFromCart(this)">DELETE</button>
        </div>`;

        allTotal += realPrice;
        document.querySelector('.totalDiv p span').innerText = `${allTotal}$`;
    }
    
}

function deleteFromCart(e){

    let parentElement = e.parentElement;
    let title = parentElement.querySelector('p').innerText;
    title = title.split(" ");

    let price = title[3];
    price = price.split('$');
    price = parseInt(price[0])

    title = title[0];

    let itemsList = document.querySelectorAll('article');

    itemsList.forEach(item => {

        let itemTitle = item.querySelector('#title').innerText;

        if(itemTitle === title){
            item.querySelector('button').removeAttribute('disabled');
            item.querySelector('#quantity').value = "";
        }
    })

    parentElement.remove();

    allTotal -= price;

    document.querySelector('.totalDiv p span').innerText = `${allTotal}$`;
}
