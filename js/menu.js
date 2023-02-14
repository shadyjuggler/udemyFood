let Menu = class {
    constructor (img, title, descr, price, currency, parrent) {
        this.img = img;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.currency = currency;
        this.parrent = parrent;
    }

    appear() {
        const body = `
            <img src=${this.img} alt="vegy">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> ${this.currency}</div>
            </div>
        `;

        const menu__item = document.createElement("div");
        menu__item.classList.add("menu__item");
        menu__item.innerHTML = body;

        const parrent = document.querySelector(`.${this.parrent} .container`);
        parrent.append(menu__item);
    }
}

const firstMenu = new Menu("img/tabs/vegy.jpg", `Меню "Фитнес"`, `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`, "229", "грн/день", "menu__field"),
      secondMenu = new Menu("img/tabs/elite.jpg", `Меню “Премиум”`, `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`, "550", "грн/день", "menu__field"),
      thirdMenu = new Menu("img/tabs/vegy.jpg", `Меню "Постное"`, `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`, "430", "грн/день", "menu__field");
      

firstMenu.appear();
secondMenu.appear();
thirdMenu.appear();

// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "POST",
//     body: JSON.stringify({name: "Lox"}),
//     headers: {
//         "Content-type" : "application/json"
//     }
// })
//       .then(response => response.json())
//       .then(json => console.log(json))