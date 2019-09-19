const request = require("request");

const getValues = (pokemon,callback) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}/`;
    let values;

    request({url:url, json:true}, (error, res)=>{
        if(error){
            console.log("unable to connect");
        } else if (res.body === "Not Found"){
            console.log("Pokemon not Found. Try another search?")
        } else {
            pokeinfo = res.body;

            const { stats } = pokeinfo;

            const yields = stats.filter((stat)=>{
                return stat.effort > 0;
            });

            // if the request is successful and has a pokemon, then the callback will run, which is defined in the 
            // function call
            
            callback(yields);
        }
    });
}

module.exports = getValues;