let form2 = document.getElementById('pokeForm') //ID in the form tag

form2.addEventListener('submit',handler) //upon form submission, run handler function

async function handler(event){
    

    event.preventDefault() //prevent event from refreshing page
    let pokeName = event.target.pokeName.value //the user input
    console.log(pokeName)

    let pokeInfo = await getPoke(pokeName) 
    console.log(pokeInfo)
    buildPokeCard(pokeInfo) 

    console.log(pokeName)

    //clear input box
    event.target.pokeName.value = '';

}



async function getPoke(pokeName){
    try{
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`) //build url
        let data = await response.json()
        
        return data //return what you want to grab from the json
    }catch(err){
        console.error(err)
    }
}

//build the card to hold the weather data

//need to return temp, feels like and condition in the card

function buildPokeCard(pokeData){
    let card = document.createElement('div')
    card.className = 'pokecard h-100'
    card.Id = 'cardid'

    let cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    let title = document.createElement('h4')
    title.innerHTML = pokeData.name 
    title.className = 'city-card-title'

    let weight = document.createElement('p')
    weight.innerHTML = `Weight: ${pokeData.weight}`
    weight.className = 'weight-data'

    let height = document.createElement('p')
    height.innerHTML = `Height: ${pokeData.height}`
    height.className = 'height-data'

    let image = document.createElement('img');
    image.className = 'card-img-top';
    image.src = pokeData.sprites.front_default;
          


    cardBody.append(title);
    cardBody.append(weight)
    cardBody.append(height)
    card.append(image);


    card.append(cardBody)

    let pokeDisplay = document.getElementById('poke-display')
    pokeDisplay.prepend(card)    


}