// create function to fetch data from the JSON endpoint
const form = document.querySelector("#pokeform");
const query = document.querySelector("#search");
const button = document.querySelector("#button");
const dataWindow = document.querySelector("#yield_data");

query.value = "";

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const pokemon = query.value;

    query.value = "";

    dataWindow.innerHTML = "loading...";

    fetch(`http://localhost:5000/pokemon?q=${pokemon}`).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                dataWindow.innerHTML = data.error;
            } else if (data.yields){

                const yields = data.yields;

                yields.forEach(yield => {
                let yieldInfo = `${pokemon} yields ${yield.effort} point(s) of ${yield.stat.name}; ${yield.effort * 2} with Macho Brace; ${yield.effort * 2} with Pokerus; ${yield.effort * 4} with Pokerus and Macho Brace.`;

                console.log(yieldInfo);

                dataWindow.innerHTML = "";

                let yieldText = document.createElement("p");
                let textBody = document.createTextNode(yieldInfo);
                yieldText.appendChild(textBody);

                dataWindow.appendChild(yieldText);

            });
            }
            
        })
    })
})

