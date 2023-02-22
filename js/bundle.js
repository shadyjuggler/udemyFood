/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calculator () {
    
    let gender , height, weight, age, ratio;


    if(localStorage.getItem("gender")) {
        gender = localStorage.getItem("gender");
    } else {
        gender = "women";
        localStorage.setItem("gender", "women")
    }

    if(localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio", 1.375)
    }

    function setDefaultAcitveClasses (buttons, activeClass) {

        buttons.forEach(item => {
            item.classList.remove(activeClass)

            if(item.getAttribute("data-ratio")) {

                if (localStorage.getItem("ratio") === item.getAttribute("data-ratio")) {
                    item.classList.add(activeClass);
                }

            } else {

                if (localStorage.getItem("gender") === item.id) {
                    item.classList.add(activeClass);
                }

            }
        })

    }

    function calculate() {

        const res = document.querySelector(".calculating__result span");

        if (!gender || !height || !weight || !age || !ratio) {
            res.textContent = "#####"
            return;
        }


        if (gender === "men") {
            res.textContent =  Math.round((447.6 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }

        if (gender === "women") {
            res.textContent =  Math.round((88.36 + (9.2 * weight) + (3.1 * height) - (4.3 * age))* ratio);
        }

    }

    function getStaticInfo (parent, activeClass) {

        parent.forEach(button => {
            button.addEventListener("click", e => {
                
                parent.forEach(item => {
                    item.classList.remove(activeClass);
                })
                e.target.classList.add(activeClass)
                
                const id = e.target.id;
                const value = +e.target.getAttribute("data-ratio")
                
                switch(id) {
                    case "women": gender = id;
                        localStorage.setItem("gender", id);
                        break;
                    case "men": gender = id;
                        localStorage.setItem("gender", id);
                        break;
                    case "low": ratio = value;
                        localStorage.setItem("ratio", value);
                        break;
                    case "small": ratio = value;
                        localStorage.setItem("ratio", value);
                        break; 
                    case "medium": ratio = value;
                        localStorage.setItem("ratio", value);
                        break; 
                    case "high": ratio = value;
                        localStorage.setItem("ratio", value);
                        break;
                        
                }

                calculate()
            })
        })

    }

    function getInputsValue (parent) {
        parent.forEach(input => {
            input.addEventListener("input", e => {
                
                if (e.target.value.match(/\D/g)) {
                    input.style.border = "1px solid red";
                } else {
                    input.style.border = "none";
                }

                switch(e.target.id) {
                    case "height": height = +e.target.value;
                        break;
                    case "weight": weight = +e.target.value;
                        break;
                    case "age": age = +e.target.value;
                        break;
                        
                }

                
                calculate()
            })
        })
    }

    getStaticInfo(document.querySelectorAll("#gender div"), "calculating__choose-item_active")
    getStaticInfo(document.querySelectorAll("#ratio div"), "calculating__choose-item_active")
    getInputsValue(document.querySelectorAll(".calculating__choose input"))

    setDefaultAcitveClasses(document.querySelectorAll("#gender div"), "calculating__choose-item_active")
    setDefaultAcitveClasses(document.querySelectorAll("#ratio div"), "calculating__choose-item_active")

    calculate()     
}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/formDataSend.js":
/*!************************************!*\
  !*** ./js/modules/formDataSend.js ***!
  \************************************/
/***/ ((module) => {

function formDataSend () {

    const forms = document.querySelectorAll("form"),
          modal = document.querySelector(".modal");
    
    forms.forEach(item => {
        bindPostData(item);
    })

    const messages = {
        loading: "loading...",
        ready: "Done!",
        failure: "Something goes wrong try again later."
    }

    const getData = async (url) => {
        const res = await fetch(url)

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status} .`)
        }

        return await res.json();
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-type" : "application/json"
            },
            body: data
        })

        return await res.json();
    }

    getData("http://localhost:3000/menu")
        .then(data => createCard(data))

    function createCard(data) {
        data.forEach((data) => {
            const card = document.createElement("div");
            card.classList.add("menu__item")

            card.innerHTML = `
                <img src=${data.img} alt="vegy">
                <h3 class="menu__item-subtitle">${data.title}</h3>
                <div class="menu__item-descr">${data.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${data.price}</span> ${data.currency}</div>
                </div>
            `

            document.querySelector(".menu .menu__field .container").append(card)
        })
    }

    function bindPostData (form) {

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const  message = document.createElement("div");

            message.classList.add("message");

            const formData = new FormData(form);

            let json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)

            .then(response => {
                console.log(response);
                ShowthanksModal(messages.ready)
                message.textContent = messages.ready;
                removeMessage(message);
            })
            .catch(() => {
                console.log("Not Found");

                ShowthanksModal(messages.failure)

                message.textContent = messages.failure;
                removeMessage(message);
            })
            .finally(() =>{
                form.reset();
            })

            message.textContent = messages.loading;
            form.append(message);

        })
    }

    function ShowthanksModal (message) {

        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.add("hide");

        const thanksWindow = document.createElement("div");
        thanksWindow.classList.add("modal__dialog");

        let body = `
            <div class="modal__content">
                <div class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `
        thanksWindow.innerHTML = body;

        modal.classList.add("show")
        modal.classList.remove("hide");


        modal.append(thanksWindow);
        
        const thanksWindowTimeout = setTimeout(() => {
            thanksWindow.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");

            modal.classList.add("hide")
            modal.classList.remove("show");
        }, 4000)

    }


    function removeMessage (message) {
        setTimeout(() => {
            message.remove();
        }, 2000)
    }

}

module.exports = formDataSend;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal () {
    
    const btns = [...document.querySelectorAll("[data-modal]")],
          modal = document.querySelector(".modal"),
          closeBtn = modal.querySelector(".modal__close"),
          form = modal.querySelector("form"),
          inputs = [...modal.querySelectorAll("input")];
        //   modalTimer = setTimeout(modalAppears, 10000);

    btns.map(btn => btn.addEventListener("click", e => {
        const target = e.target;

        if(target && target.tagName === "BUTTON") {
            modalAppears()
        }

    }))
    
    modal.addEventListener("click", e => {

        const target = e.target;

        if (target.classList.contains("modal__close") || target === modal) {
            modalHides()
            thanksWindowTimeout.clearInterval();
        }

    })

    function modalAppears () {
        modal.classList.add("show")
        modal.classList.remove("hide");
        // clearInterval(modalTimer)
    }

    function modalHides () {
        modal.classList.add("hide")
        modal.classList.remove("show");
    }
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider () {
    const slider = document.querySelector(".offer__slider"),
      wrapper = document.querySelector(".offer__slider-wrapper"),
      inner = document.querySelector(".offer__slider-inner"),
      prev = document.querySelector(".offer__slider-prev"),
      next = document.querySelector(".offer__slider-next"),
      totalAmount = document.querySelector(".offer__slider #total"),
      currentId = document.querySelector(".offer__slider #current"),
      width = window.getComputedStyle(wrapper).width.slice(0, -2),
      imgs = ["pepper.jpg", "food-12.jpg", "olive-oil.jpg", "paprika.jpg"];

    let offset = 0;
    let id = 1;

    inner.style.display = "flex"
    inner.style.width = `${100 * imgs.length}%`
    wrapper.style.overflow = "hidden";
    inner.style.transition = "0.5s"

    
    
    function displayCurrentSlideId () {
        if (id > imgs.length) {
            id = 1;
        }

        if(id == 0) {
            id = imgs.length
        }

        if (imgs.length >= 10) {
            currentId.textContent = `${id}`
            totalAmount.textContent = `${imgs.length}`

        } else {
            currentId.textContent = `0${id}`
            totalAmount.textContent = `0${imgs.length}`
        }
        
    }

    next.addEventListener("click", () => {

        if (offset == +width * (imgs.length - 1)) {
            offset = 0;
        } else {
            offset += +width;
        }

        inner.style.transform = `translateX(-${offset}px)`
        
        id++;
        displayCurrentSlideId ()

        addActiveDot (id - 1)
    }) 


    prev.addEventListener("click", () => {

        if (offset == 0) {
            offset = +width * (imgs.length - 1);
        } else {
            offset -= +width;
        }
        

        inner.style.transform = `translateX(-${offset}px)`
        
        id--
        displayCurrentSlideId ()

        addActiveDot (id - 1)
    }) 


// Navigation

const dotWrapper = document.createElement("div");
    dotWrapper.classList.add("carousel-indicators");
    slider.style.position = "relative"

function createDot (amount) {
    
    for (let i = 0; i < amount; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        dotWrapper.append(dot);
    }

    slider.append(dotWrapper);
}

createDot(imgs.length);

const dots = [...dotWrapper.children];

function addActiveDot (i) {

    dots.forEach(dot => {
        dot.classList.remove("dot-active");
    })

    dots[i].classList.add("dot-active");
}

addActiveDot (id - 1)

}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs () {
    
    const tabsParent = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent");


    function hideTabsContent () {
        tabsContent.forEach(content => {
            content.classList.add("hide");
            content.classList.remove("tabheader__item_active");
        })

        tabs.forEach(tab => {
            tab.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add("show", "fade")
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    tabsParent.addEventListener("click", e => {

        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((tab, i) => {
                if (tab === target) {
                    hideTabsContent();
                    showTabContent(i);
                }
            })
        }

    });

    hideTabsContent();
    showTabContent();
}


module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer () {
    
    const timer = document.querySelector(".timer"),
          timerContents = timer.querySelectorAll("span");

    const deadline = new Date("2024-01-01T00:00:00"),
          timerInterval = setInterval(setTimer, 1000)


    function setTimer () {
        
        let currentDate = new Date(),
            difference = deadline.getTime() - currentDate.getTime();
        
        if (difference <= 0) { // check for past date
            clearInterval(timerInterval);
            resetTimer();
        } else {

            timerContents.forEach((span, i) => {
                switch (i) {
                    case 0 : span.textContent = `${Math.floor(difference / 1000 / 60 / 60 / 24)}` // days
                        break;
                    case 1 : span.textContent = `${Math.floor(difference / 1000 / 60 / 60) % 24}` // hours
                        break;
                    case 2 : span.textContent = `${Math.floor(difference / 1000 / 60) % 60}` // min
                        break;
                    case 3 : span.textContent = `${Math.floor(difference / 1000) % 60}` // sec
                        break;
                }

            })

        }
    }

    function resetTimer (value = "00") { 
        timerContents.forEach(span => {
            span.textContent = value;
        }) 
    }

    setTimer()

}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", () => {
    const calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        formDataSend = __webpack_require__(/*! ./modules/formDataSend */ "./js/modules/formDataSend.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");

    calc();
    formDataSend();
    modal();
    slider();
    tabs();
    timer();
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map