
fetch("http://localhost:3000/menu")
    .then(response => {
        return response.json()
    })
    .then(response => console.log(response))
    .catch(() => {
        console.error("Cannot access db.json")
    })