console.log("loaded");

// create function to fetch data from the JSON endpoint
const form = document.querySelector("#pokeform");
const query = document.querySelector("#search");
const button = document.querySelector("#button");

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const pokemon = query.value;

    fetch(`http://localhost:5000/pokemon?q=${pokemon}`).then((res)=>{
        res.json().then((data)=>{
            console.log(data);
        })
    })
})

