// Slider

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

const dots = dotWrapper.children;
console.log(dots)

function addActiveDot (i) {
    

    for (const dot of dots) {
        dot.classList.remove("dot-active");
    }

    dots[i].classList.add("dot-active");
}

addActiveDot (id - 1)


































