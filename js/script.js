window.addEventListener("DOMContentLoaded", () => {
    const calc = require("./modules/calc"),
        formDataSend = require("./modules/formDataSend"),
        modal = require("./modules/modal"),
        slider = require("./modules/slider"),
        tabs = require("./modules/tabs"),
        timer = require("./modules/timer");

    calc();
    formDataSend();
    modal();
    slider();
    tabs();
    timer();
})
