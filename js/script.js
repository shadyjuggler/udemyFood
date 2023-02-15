
fetch("http://localhost:3000/menu")
    .then(response => {
        return response.json()
    })
    .then(response => console.log(response))
    .catch(() => {
        console.error("Cannot access db.json")
    })

fetch("http://localhost:3000/menu")
    .then(r => r.json())
    .then(r => console.log(r[1].descr))