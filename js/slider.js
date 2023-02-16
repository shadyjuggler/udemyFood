// Slider

const wrapper = document.querySelector(".offer__slider-wrapper"),
      inner = document.querySelector(".offer__slider-inner"),
      prev = document.querySelector(".offer__slider-prev"),
      next = document.querySelector(".offer__slider-next"),
      totalAmount = document.querySelector(".offer__slider #total"),
      currentId = document.querySelector(".offer__slider #current"),
      width = window.getComputedStyle(wrapper).width.slice(0, -2),
      imgs = ["pepper.jpg", "food-12.jpg", "olive-oil.jpg", "paprika.jpg"];

console.log(inner)

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
    }) 































// let id = 0;

// function showSlide (id, img) {

//     wrapper.innerHTML = ""; // clears wrapper

//     displayCurrentSlideId();

//     const slide = document.createElement("div");

//     slide.innerHTML = `
//         <div class="offer__slide" id="${id}">
//             <img src="img/slider/${img}" alt="pepper">
//         </div>
//     `;
    
//     wrapper.append(slide);
// }



// function displayCurrentSlideId () {
//     if (imgs.length >= 10) {
//         currentId.textContent = `${id + 1}`;
//         totalAmount.textContent = `${imgs.length}`;
//     } else {
//         currentId.textContent = `0${id + 1}`;
//         totalAmount.textContent = `0${imgs.length}`;
//     }
    
// }

// prev.addEventListener("click", (e) => {
//     e.preventDefault();

//     id--;
//     checkId()

//     showSlide(id, imgs[id]);
// })

// next.addEventListener("click", (e) => {
//     e.preventDefault();

//     id++
//     checkId()

//     showSlide(id, imgs[id]);
// })

// showSlide(0, imgs[0])