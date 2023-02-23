function tabs () {
    
    const tabsParent = document.querySelector(".tabheader__items"),
          tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent");


    function hideTabsContent () {
        tabsContent.forEach(content => {
            content.classList.add("hide");
            content.classList.remove("tabheader__item_active");
        })

        tabs.forEach(tab => {
            tab.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add("show", "fade")
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    tabsParent.addEventListener("click", e => {

        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((tab, i) => {
                if (tab === target) {
                    hideTabsContent();
                    showTabContent(i);
                }
            })
        }

    });

    hideTabsContent();
    showTabContent();
}


export default tabs;