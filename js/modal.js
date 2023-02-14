document.addEventListener("DOMContentLoaded", () => {

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
        clearInterval(modalTimer)
    }

    function modalHides () {
        modal.classList.add("hide")
        modal.classList.remove("show");
    }
})