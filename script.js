window.onload = init();

function init(){ 
    let elements = {
        card: document.querySelector('.card'),
        cardContent: document.querySelector('.card__content'),
        price: document.querySelectorAll('.price'),
        weight: document.querySelectorAll('.weight'),
        totalPrice: document.querySelectorAll('.result__price'),
        buttonClear: document.querySelector('.clear'),
        buttonAdd: document.querySelector('.button__plus'),
        buttonClose: document.querySelectorAll('.button__close'),
        app: document.querySelector('.app'),
        calculate: document.querySelector('.calculate'),
        rightside: document.querySelectorAll('.rightside'),
        money: document.querySelectorAll('.money'),
    }

    let display = {
        cards: elements.app.childElementCount + 1,
        addCard: function(){
            let card  = document.createElement('div')
            card.classList.add('card');
            
            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card__header');

            const cardContent = document.createElement('div');
            cardContent.classList.add('card__content');

            const cardTitle = document.createElement('span')
            cardTitle.textContent = 'Продукт '+ display.cards;

            const buttonClose = document.createElement('button');
            buttonClose.classList.add('button__close');

            const icon  = document.createElement('i');
            icon.classList.add('fas','fa-times','close');

            buttonClose.insertAdjacentElement('beforeend',icon);
            buttonClose.addEventListener('click',display.removeCard);
            
            cardContent.innerHTML = '<div class="leftside"><div class="price__wrapper"><span class="label">Цена: </span><input type="text" inputmode="numeric" pattern="[0-9]*" class="price"></div><div class="weight__wrapper"><span class="label">Вес: </span><input type="text" inputmode="numeric" pattern="[0-9]*" class="weight"></div></div><div class="rightside"><div class="total__price"><span class="result__price">0 </span> <span class="money">копеек</span></div><div class="total__weight">за единицу</div></div>';

            cardHeader.insertAdjacentElement('beforeend',cardTitle);
            cardHeader.insertAdjacentElement('beforeend',buttonClose);
            
            card.insertAdjacentElement('beforeend',cardHeader);
            card.insertAdjacentElement('beforeend',cardContent);

            elements.app.insertAdjacentElement('beforeend',card);
        },
        elementsUpdate: function(){
            elements.totalPrice = document.querySelectorAll('.result__price');
            elements.price = document.querySelectorAll('.price');
            elements.weight = document.querySelectorAll('.weight');
            elements.rightside = document.querySelectorAll('.rightside');
            elements.money = document.querySelectorAll('.money');
            elements.buttonClose = document.querySelectorAll('.button__close');
            display.cards = elements.app.childElementCount + 1;
        },
        clear: function(){
            let clear = [elements.price,elements.weight];
            for (item of clear){
                for(item2 of item){
                    item2.value = '';
                }
            }
            for (item of elements.totalPrice){
                item.textContent = 0;
            }
            for (item of elements.money){
                item.textContent = 'копеек'
            }
            for (item of elements.rightside){
                if(item.classList.contains('right')){
                    item.classList.remove('right')
                }
            }
        },
        removeCard: function(event){
            event.currentTarget.parentElement.parentElement.remove();
        }
    }

    let logic = {
        calculate: function(){
            for(let i = 0; i<elements.price.length; i++){
                if(!elements.price[i].value == "" && !elements.weight[i].value =="") {
                    let result = (elements.price[i].value/elements.weight[i].value).toFixed(2)*100;
                    if(result>=100){
                        result = result/100;
                        if(result == 1){
                            elements.money[i].textContent = 'рубль';
                        } else if(1 < result && result <= 4){
                            elements.money[i].textContent = 'рубля';
                        } else{
                            elements.money[i].textContent = 'рублей';
                        }
                    } else {
                        if(result == 1){
                            elements.money[i].textContent = 'копейка';
                        } else if(2 <= result && result <= 4){
                            elements.money[i].textContent = 'копейки';
                        } else{
                            elements.money[i].textContent = 'копеек';
                        }
                    }
                    elements.totalPrice[i].textContent = result.toFixed(0);
                }
            }
            logic.best();  
        },
        best: function(){
            for(item of elements.rightside){
                if(item.classList.contains('right')){
                    item.classList.remove('right');
                }
            }

            let array = [];
            for(item of elements.totalPrice){
                let money = item.nextElementSibling.innerText
                let value = +item.textContent;
                if(money == 'рубль'|| money == 'рубля' || money == 'рублей'){
                    value = value*100;
                } else{
                    value = value;
                }
                array.push(value);
            }
            min = array[0];
            let index = 0;
            for(let i = 1; i< array.length; i++){
                if(array[i] < min){
                    min = array[i];
                    index = i;
                }
            }

            elements.rightside[index].classList.add('right');
        }
    }

    elements.buttonAdd.addEventListener('click',display.addCard);
    elements.buttonAdd.addEventListener('click',display.elementsUpdate);
    elements.app.addEventListener('change',logic.calculate);
    for(item of elements.buttonClose){
        item.addEventListener('click',display.removeCard);
    }
    elements.buttonClear.addEventListener('click',display.clear);
};
