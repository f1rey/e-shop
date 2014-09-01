//    addTable: function () {
//
//        table.addEventListener('click', function firstEvent(event) {
//            if (event.target.tagName === 'BUTTON') {
//                var index = event.target.dataset.id;
//                var good = eShop.basket.goods[index];
//
//                if (eShop.basket.cart[index] == undefined) {
//                    //    
//                }
//
//
//
//                console.log(good);
//
//                var trs = document.getElementById(index);
//
//                var tdQuant = document.createElement('td');
//                tdQuant.innerHTML = 1;
//
//                var newTitle = document.createElement('td');
//                newTitle.innerHTML = good.title;
//                console.log(newTitle);
//                newTitle.setAttribute('data-id', index);
//
//                var newPrice = document.createElement('td');
//                newPrice.innerHTML = trs.children[1].innerHTML;
//                newPrice.setAttribute('data-id', index);
//
//                var basketTable = document.getElementById('basket');
//
//                var basketTr = document.createElement('tr');
//                basketTr.setAttribute('data-id', index);
//
//                var trButtonNew = document.createElement('tr');
//
//                var remove = document.createElement('button');
//                remove.innerHTML = 'Удалить';
//                remove.setAttribute('data-id', index);
//
//                var changeQuant = document.createElement('button');
//                changeQuant.innerHTML = 'Изменить количество';
//                changeQuant.setAttribute('data-id', index);
//
//                var get = document.createElement('button');
//                get.innerHTML = 'Оформить';
//                document.body.appendChild(get);
//
//                basketTr.appendChild(newTitle);
//                basketTr.appendChild(newPrice);
//                basketTr.appendChild(tdQuant);
//                trButtonNew.appendChild(remove);
//                trButtonNew.appendChild(changeQuant);
//                basketTr.appendChild(trButtonNew);
//                basketTable.appendChild(basketTr);
//
//                var total = document.createElement('div');
//                total.innerHTML = 'Товаров в корзине ' + '<br>' + tdQuant.innerHTML;
//                document.body.appendChild(total);
//            }
//        }, false);
//
//
//
//    },