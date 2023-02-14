document.addEventListener("DOMContentLoaded", () => {
    

    const forms = document.querySelectorAll("form"),
          modal = document.querySelector(".modal");
    
    forms.forEach(item => {
        postData(item);
    })

    const messages = {
        loading: "loading...",
        ready: "Done!",
        failure: "Something goes wrong try again later."
    }

    function postData (form) {

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const  message = document.createElement("div");

            message.classList.add("message");

            const formData = new FormData(form);

            let temp = {};

            formData.forEach((v, k) => {
                temp[k] = v;
            });



            fetch("server.php", {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify(temp)

            })
            .then(response => {
                console.log(response)
                return response.text();
            })
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

})