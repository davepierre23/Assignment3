function getIngredient() {

    let ingredientName = document.getElementById('ingredient').value;
    document.getElementById('ingredient').value = ""
    if(ingredientName === '') {
        return alert('Please enter a ingredient')
    }


    let ingredientDiv= document.getElementById('ingredientreceipes');
    ingredientDiv.innerHTML = '';
    //Create a new elemement then add to he id inneringredent s
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 404 && xhr.status == 200) {
        console.log(xhr.responseText);

        let response = JSON.parse(xhr.responseText);

 			ingredientDiv.innerHTML = ingredientDiv.innerHTML+ "DAve"; /*`
			<h1>Ingredient for ${response.count} </h1>
			<ul>
			<li>Location: LON:${response.coord.lon}, LAT:${response.coord.lat}</li>
			<li>Main: ${response.weather[0].main}</li>
			<li>Desc: ${response.weather[0].description}</li>
			</ul>
			`*/
        }
    }
    xhr.open('POST', `/receipes?ingredients=${ingredientName}`, true)
    xhr.send()
}

//Attach Enter-key Handler
const ENTER=13
document.getElementById("ingredient")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});
