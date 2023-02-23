import calculator from  "./modules/calc";
import formDataSend from  "./modules/formDataSend";
import modal from  "./modules/modal";
import slider from  "./modules/slider";
import tabs from "./modules/tabs";
import timer from  "./modules/timer";

window.addEventListener("DOMContentLoaded", () => {
    calculator();
    formDataSend();
    modal(".modal", "[data-modal]", "modal__close");
    slider();
    tabs();
    timer();
})
