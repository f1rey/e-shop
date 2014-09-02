var eShop = {
    basket: {
        //        Массив товаров в корзине
        cart: {},
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
    handler: function () {
        var table = document.getElementById('main-table');
        table.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Купить') {
                eShop.addItem(event.target.dataset.id);
                eShop.quantGoods(event.target.dataset.id);
                eShop.sumGoods(event.target.dataset.id);
                document.getElementById('cart').classList.remove('none') && document.getElementById('cart').classList.add('apear');
            }
        }, false);
        var cartTable = document.getElementById('cart');
        cartTable.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Удалить') {
                eShop.dropItem(event.target.dataset.id);
                eShop.quantGoods(event.target.dataset.id);
                eShop.sumGoods(event.target.dataset.id);
            }
        }, false);
        cartTable.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Изменить количество') {
                eShop.changeItem(event.target.dataset.id);
                eShop.quantGoods(event.target.dataset.id);
                eShop.sumGoods(event.target.dataset.id);
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
        } else if (eShop.basket.cart[id].quantity >= eShop.basket.goods[id].quantity) {
            eShop.basket.cart[id].quantity = eShop.basket.goods[id].quantity;
        } else {
            eShop.basket.cart[id].quantity++;
        }
        eShop.renderCart();
    },
    //    Функция убирает товар из корзины
    dropItem: function (id) {
        if (eShop.basket.cart[id] !== undefined) {
            delete eShop.basket.cart[id];
        }
        eShop.renderCart();
    },
    //    Функция изменения количества товаров
    changeItem: function (id) {
        var value = prompt('Введите нужное количество товаров');
        if (value === null || value === '') {
            value = eShop.basket.cart[id].quantity;
        } else if (isNaN(parseInt(value))) {
            alert('Введите число');
        } else if (value == 0 || value <= 0) {
            delete eShop.basket.cart[id];
        } else if (parseInt(value) == 0) {
            alert('Введите целое число');
        } else if (value <= eShop.basket.goods[id].quantity) {
            eShop.basket.cart[id].quantity = parseInt(value);
        } else if (value > eShop.basket.goods[id].quantity) {
            eShop.basket.cart[id].quantity = eShop.basket.goods[id].quantity;
        }
        eShop.renderCart();
    },
    quant: 0,
    //    Функция, которая ведет подсчет кол-ва товаров в корзине
    quantGoods: function (id) {
        this.quant = 0;
        for (var k in eShop.basket.cart) {
            this.quant += eShop.basket.cart[k].quantity;
        }
        //        eShop.quantDiv();
    },
    quantDiv: function () {
        var div = document.createElement('div');
        var p = document.createElement('p');
        p.innerHTML = 'Количество товаров в корзине' + '<br>' + this.quant;
        div.appendChild(p);
        document.body.appendChild(div);
    },
    sum: 0,
    //    Функция подсчета суммы товаров
    sumGoods: function (id) {
        this.sum = 0;
        for (var k in eShop.basket.cart) {
            this.sum += eShop.basket.cart[k].price * eShop.basket.cart[k].quantity;
        }
        console.log(this.sum);
    },
    dropDiv: function () {
        var div = document.getElementById('div');
        document.body.removeChild(div);
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
        var div = document.createElement('div');
        div.dataset.id = 'div';
        var button = document.createElement('button');
        button.dataset.id = 'form';
        button.innerHTML = 'Оформить';
        div.appendChild(button);
        document.body.appendChild(div);
    }
}
eShop.renderGoodsTable();
eShop.handler();