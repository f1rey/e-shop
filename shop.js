var eShop = {
    basket: {
        //        Массив товаров в корзине
        cart: {},
        sum: 0,
        //        Товары которые есть в магазине
        goods: [
            {
                title: 'iMac',
                price: 15000,
                quantity: 2
            },
            {
                title: 'iPhone',
                price: 8000,
                quantity: 10
            },
            {
                title: 'iPad',
                price: 5000,
                quantity: 4
            },
            {
                title: 'MacBook Air',
                price: 18000,
                quantity: 6
            }
        ]
    },
    //    Функция, которая строит основную таблицу товаров на складе
    renderGoodsTable: function () {
        for (var i = 0; i < this.basket.goods.length; i++) {
            var table = document.getElementById('main-table');
            var tdTitle = document.createElement('td');
            var tdPrice = document.createElement('td');
            var tdButton = document.createElement('td');
            var button = document.createElement('button');
            var tr = document.createElement('tr');
            tdTitle.innerHTML = this.basket.goods[i].title;
            tdPrice.innerHTML = this.basket.goods[i].price;
            tr.appendChild(tdTitle);
            tr.appendChild(tdPrice);
            button.innerHTML = "Купить";
            button.className = 'btn btn-success';
            button.dataset.id = [i];
            tdButton.appendChild(button);
            tr.appendChild(tdButton);
            table.appendChild(tr);
            if (this.basket.goods[i].quantity === 0) {
                tdButton.removeChild(button);
            }
        }
    },
    //    Функция обработчиков событий
    hendler: function () {
        var table = document.getElementById('main-table');
        table.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Купить') {
                eShop.addItem(event.target.dataset.id);
                document.getElementById('cart').classList.remove('none') && document.getElementById('cart').classList.add('apear');
            }
        }, false);
        var cartTable = document.getElementById('cart');
        cartTable.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Удалить') {
                eShop.dropItem(event.target.dataset.id)
            }
        }, false);
        cartTable.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Изменить количество') {
                eShop.changeItem(event.target.dataset.id)
            }
        }, false)
    },
    //    Функция добавляет товар в корзину
    addItem: function (id) {
        var goods = eShop.basket.goods[id];
        if (eShop.basket.cart[id] == undefined) {
            eShop.basket.cart[id] = {
                title: goods.title,
                price: goods.price,
                quantity: 1
            }
        } else {
            eShop.basket.cart[id].quantity++;
        }
        eShop.renderCart();
    },
    //    Функция убирает товар из корзины
    dropItem: function (id) {
        if (eShop.basket.cart[id] !== undefined) {
            eShop.basket.cart.splice(id, 1);
        }
        eShop.renderCart();
        console.log(eShop.basket.cart);
    },
    //    Функция изменения количества товаров
    changeItem: function (id) {
        var value = prompt('Введите нужное количество товаров');
        if (+value === 0 || +value < 0) {
            delete eShop.basket.cart[id];
        } else if (isNaN(value)) {
            alert('Введите числовой эквивалент');
        } else if (typeof (+value) === 'number') {
            if (value > eShop.basket.goods[id].quantity) {
                value = eShop.basket.goods[id].quantity;
            }
            eShop.basket.cart[id].quantity = value;
        } else if (value === null || value === '') {
            value = eShop.basket.cart[id].quantity;
        }
        eShop.renderCart();
    },
    //    check: function (id) {
    //        for (var k in eShop.basket.cart) {
    //            eShop.basket.sum += eShop.basket.cart[k].price;
    //            console.log(eShop.basket.sum);
    ////        }
    //    },
    sumGoods: function () {
        console.log(Object.keys(eShop.basket.cart).length);
    },
    //    Функция, которая генерит HTML товаров в корзине
    renderCart: function () {
        var cartTable = document.getElementById('cart');
        var rowsArray = cartTable.rows.length;
        for (var x = rowsArray - 1; x > 0; x--) {
            cartTable.deleteRow(x);
        }
        for (var k in this.basket.cart) {
            var cartTr = document.createElement('tr');

            var cartTitleTd = document.createElement('td');
            cartTitleTd.innerHTML = this.basket.cart[k].title;

            var cartPriceTd = document.createElement('td');
            cartPriceTd.innerHTML = this.basket.cart[k].price;

            var cartQuantTd = document.createElement('td');
            cartQuantTd.innerHTML = this.basket.cart[k].quantity;

            var cartButton = document.createElement('td');

            var remove = document.createElement('button');
            remove.innerHTML = 'Удалить';
            remove.className = 'btn btn-danger';
            remove.dataset.id = [k];

            var change = document.createElement('button');
            change.innerHTML = 'Изменить количество';
            change.className = 'btn btn-info';
            change.dataset.id = [k];

            cartTr.appendChild(cartTitleTd);
            cartTr.appendChild(cartPriceTd);
            cartTr.appendChild(cartQuantTd);
            cartButton.appendChild(remove);
            cartButton.appendChild(change);
            cartTr.appendChild(cartButton);
            cartTable.appendChild(cartTr);
        }
    }
}
eShop.renderGoodsTable();
eShop.hendler();
eShop.sumGoods();