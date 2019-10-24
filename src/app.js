const getValues = require("./utils/yieldgetter");

const path = require("path");

const express = require("express");
const hbs = require("hbs");
const request = require("request");

const app = express();
const port = process.env.PORT || 5000;

// defining the paths for express configuration
const public = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
// setting the view engine that we installed with npm.
app.set('views', viewsPath);
// setting the path from which the views will come

hbs.registerPartials(partialsPath);
// registering the path the the partials will come from

// Setup static directory to serve
app.use(express.static(public));

app.get("", (req, res)=>{
    res.render("index", {
        title: "PokeYield",
        header: "Pokemon Yield Catcher - Enter a Pokemon name and find out what Effort Values they yield!"
    })
});

app.get("/pokemon", (req, res)=>{
    const requestedPokemon = req.query.q
    // req.query.q is created when the user looks up a pokemon, and is variable

    if(requestedPokemon){
        getValues(requestedPokemon, (yields, error)=>{
            if(error){
                console.log("error")
                res.send({error})
            } else {
                res.send({yields})
            }
        });
    } else if (!requestedPokemon){
        getValues(requestedPokemon, (error)=>{
            res.send({error})
        })
    }
});

app.listen(port, ()=>{
    console.log("Server is listening on port", port);
});