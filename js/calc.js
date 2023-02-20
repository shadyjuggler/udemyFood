


let gender = "women", height, weight, age, ratio = 1.375;


function calculate() {
    console.log(gender, height, weight, age, ratio)

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
                    break;
                case "men": gender = id;
                    break;
                case "low": ratio = value;
                    break;
                case "small": ratio = value;
                    break; 
                case "medium": ratio = value;
                    break; 
                case "high": ratio = value;
                    break;
                      
            }

            calculate()
        })
    })

}

function getInputsValue (parent) {
    parent.forEach(button => {
        button.addEventListener("input", e => {
            
            const id = e.target.id;

            switch(id) {
                case "height": height = e.target.value;
                    break;
                case "weight": weight = e.target.value;
                    break;
                case "age": age = e.target.value;
                    break;
                      
            }

            
            calculate()
        })
    })
}

getStaticInfo(document.querySelectorAll("#gender div"), "calculating__choose-item_active")
getStaticInfo(document.querySelectorAll("#ratio div"), "calculating__choose-item_active")
getInputsValue(document.querySelectorAll(".calculating__choose input"))