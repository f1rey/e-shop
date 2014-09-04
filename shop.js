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
                eShop.renderForm(event.target.dataset.id);
                eShop.basketHiden(event.target.dataset.id);
                eShop.renderQuant(event.target.dataset.id);
                eShop.renderSum(event.target.dataset.id);
            }
        }, false);
        var cartTable = document.getElementById('cart');
        cartTable.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Удалить') {
                eShop.dropItem(event.target.dataset.id);
                eShop.quantGoods(event.target.dataset.id);
                eShop.sumGoods(event.target.dataset.id);
                eShop.renderForm(event.target.dataset.id);
                eShop.basketHiden(event.target.dataset.id);
                eShop.renderQuant(event.target.dataset.id);
                eShop.renderSum(event.target.dataset.id);
                eShop.renderInputs(event.target);
            }
        }, false);
        cartTable.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Изменить количество') {
                eShop.changeItem(event.target.dataset.id);
                eShop.quantGoods(event.target.dataset.id);
                eShop.sumGoods(event.target.dataset.id);
                eShop.renderForm(event.target.dataset.id);
                eShop.basketHiden(event.target.dataset.id);
                eShop.renderQuant(event.target.dataset.id);
                eShop.renderSum(event.target.dataset.id);
                eShop.renderInputs(event.target);
            }
        }, false);
        var form = document.getElementById('form');
        form.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Оформить') {
                eShop.renderInputs(event.target);
            }
        }, false);
        var inputs = document.getElementById('inputs');
        inputs.addEventListener('click', function (event) {
            if (event.target.innerHTML === 'Подтвердить') {
                eShop.check(event.target)
            };
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
    },
    //    Функция которая выводит элемент с кол-вом товаров в корзине
    renderQuant: function (id) {
        var renderQuant = document.getElementById('quant');
        renderQuant.innerHTML = 'Количество товаров в корзине' + '<br>' + eShop.quant;
        if (eShop.quant === 1) {
            renderQuant.classList.add('block');
        }
        if (eShop.quant === 0) {
            renderQuant.classList.remove('block');
            renderQuant.classList.add('hiden')
        }
    },
    sum: 0,
    //    Функция подсчета суммы товаров
    sumGoods: function (id) {
        this.sum = 0;
        for (var k in eShop.basket.cart) {
            this.sum += eShop.basket.cart[k].price * eShop.basket.cart[k].quantity;
        }
    },
    //    Функция которая показывает чек
    check: function (event) {
        var name = document.getElementById('name');
        var sermane = document.getElementById('sername');
        var adress = document.getElementById('adress');
        if (name.value === '' || sername.value === '' || adress.value === '') {
            alert('Заполните все поля');
        } else {
            var check = document.getElementById('check');
            check.classList.add('apear');
            var checkUl = document.getElementById('data')
            for (var k in this.basket.cart) {
                var checkLi = document.createElement('li');
                checkLi.innerHTML = this.basket.cart[k].title;
                checkUl.appendChild(checkLi);
            }
        }
    },
    //    Функция, которая выводит элемент с суммой товаров в корзине
    renderSum: function (id) {
        var renderSum = document.getElementById('sum');
        renderSum.innerHTML = 'Стоимость товаров' + '<br>' + eShop.sum;
        if (eShop.sum >= 1) {
            renderSum.classList.add('block');
        }
        if (eShop.sum === 0) {
            renderSum.classList.remove('block');
            renderSum.classList.add('hiden')
        }
    },
    renderInputs: function (event) {
        var inputs = document.getElementById('inputs');
        if (eShop.sum >= 1) {
            inputs.classList.add('apear');
        }
        if (eShop.sum === 0) {
            inputs.classList.toggle('apear');
        }
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
    },
    //    Функция, которая создает кнопку Оформить
    renderForm: function (id) {
        var form = document.getElementById('form');
        if (eShop.quant === 1) {
            form.classList.add('apear');
        }
        if (eShop.quant === 0) {
            form.classList.toggle('apear');
        }
    },
    //    Функция прячет корзину, если там нет товаров
    basketHiden: function (id) {
        var cart = document.getElementById('cart');
        if (eShop.quant === 1) {
            cart.classList.add('apear');
        }
        if (eShop.quant === 0) {
            cart.classList.toggle('apear');
        }
    }

}
eShop.renderGoodsTable();
eShop.handler();