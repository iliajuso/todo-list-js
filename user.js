const user = {
    "id": null,
    "username": "jusoevi",
    "email": "iliajuso@gmail.com",
   "fname": "ilia"
}

// POST
fetch("http://24api.ru/rest-user", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
})
    .then(data => data.json())
    .then(data => console.log(data))
    