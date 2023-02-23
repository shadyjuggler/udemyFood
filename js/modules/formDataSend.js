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
        
        let thanksWindowTimeout = setTimeout(() => {
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

export default formDataSend;
