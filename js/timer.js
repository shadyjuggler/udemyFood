document.addEventListener("DOMContentLoaded", () => {

    const timer = document.querySelector(".timer"),
          timerContents = timer.querySelectorAll("span");

    const deadline = new Date("2023-01-01T00:00:00"),
          timerInterval = setInterval(setTimer, 1000)


    function setTimer () {
        
        let currentDate = new Date(),
            difference = deadline.getTime() - currentDate.getTime();
        
        if (difference <= 0) { // check for past date
            clearInterval(timerInterval);
            resetTimer();
        } else {

            timerContents.forEach((span, i) => {
                switch (i) {
                    case 0 : span.textContent = `${Math.floor(difference / 1000 / 60 / 60 / 24)}` // days
                        break;
                    case 1 : span.textContent = `${Math.floor(difference / 1000 / 60 / 60) % 24}` // hours
                        break;
                    case 2 : span.textContent = `${Math.floor(difference / 1000 / 60) % 60}` // min
                        break;
                    case 3 : span.textContent = `${Math.floor(difference / 1000) % 60}` // sec
                        break;
                }

            })

        }
    }

    function resetTimer (value = "00") { 
        timerContents.forEach(span => {
            span.textContent = value;
        }) 
    }

    // resetTimer()
    setTimer()
})

