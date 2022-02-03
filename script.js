document.addEventListener("DOMContentLoaded", function (){
    //selecting the card body
    const content = document.querySelector(".content")

    //url to fetch
    const URL = "https://api.disneyapi.dev/characters" 
    

    //if fetching data for one character
    document.querySelector('.input_id').addEventListener("submit", function(e) {
        e.preventDefault();

        //getting the id from input box
        const id = document.querySelector(".id_in").value  
        let new_url = URL+"/"+id
 
        fetch_url(new_url,false)
    })

    //getting all the characters
    document.querySelector('.input_id').addEventListener("reset", function (e) {
        //fetching data'
        fetch_url(URL,true)
        
    })

    
    //generating card for character
    function card_generator(char){
        
        //random color cards
        const colors = [ "primary", "secondary", "success", "danger", "warning", "info", "light", "white"]
        let clr= "bg-"+colors[Math.floor(Math.random() * colors.length)];
        
        //appending the cards
        content.innerHTML += `
            <div class="card ${clr}" style="width: 15rem">
                <img class="image" src="${char.imageUrl}" alt="Card image cap">
                <div class="card-body">
                    <h3 class="card-title">${char.name}</h3>
                    <p class="card-text"><i>Id :- ${char._id}</i></p>
                    <hr/>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><b>FILMS :</b> ${char.films}</li>
                        <li class="list-group-item"><b>SHORT FILMS :</b> ${char.shortFilms}</li>
                        <li class="list-group-item"><b>TV SHOWS :</b> ${char.tvShows}</li>
                        <li class="list-group-item"><b>ALLIES :</b> ${char.allies}</li>
                        <li class="list-group-item"><b>ENEMIES :</b> ${char.enemies}</li>
                    </ul>
                </div>
            </div>
        `
    }

    //fetching data according to url & need
    function fetch_url(new_url,all){
        content.innerHTML = ``
        fetch(new_url)
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result.data);

                //adding background image
                content.style.backgroundImage = "url('https://wallpaperaccess.com/full/1235929.jpg')"

                //getting all the characters
                if(all){
                    result.data.forEach((character) => {
                    console.log(character);
                    
                    //sending character as parameter to generate card
                    card_generator(character);
                    })
                } 
                //if fetching data for one character
                else {
                    card_generator(result);
                }
            })
        }).catch((error) => {console.error(error)})
    }

})
