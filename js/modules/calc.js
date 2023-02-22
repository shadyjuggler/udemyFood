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