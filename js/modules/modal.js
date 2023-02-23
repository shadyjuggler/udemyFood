function modal (modalSelector, modalOpenBtnSlector, modalCloseBtnSelector) {
    
    const btns = [...document.querySelectorAll(modalOpenBtnSlector)],
          modal = document.querySelector(modalSelector),
          modalTimer = setTimeout(modalAppears, 10000);

    btns.map(btn => btn.addEventListener("click", e => {
        const target = e.target;

        if(target && target.tagName === "BUTTON") {
            modalAppears()
        }

    }))
    
    modal.addEventListener("click", e => {

        const target = e.target;

        if (target.classList.contains(modalCloseBtnSelector) || target === modal) {
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
}

export default modal;