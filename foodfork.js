/*
Example of a "static server implemented with the express framework.

PREREQUISITES:
install express module using the package.json file with command:
>npm install

TO TEST:
Use browser to view pages at http://localhost:3000/index.html.
*/
const express = require('express');
const app = express();
const logger = require('morgan'); // request logger
const requestModule = require('request'); // used for npm modules

const PORT = process.env.PORT || 3000
const ROOT_DIR = '/public'; //root directory for our static pages


// Our API_KEY key
const API_KEY = '31bc2311421abe09f5e1584ed093a292';
function getRecipes(ingredient, res){
console.log("I ran getRecipes");
const url =`http://food2fork.com/api/search?q=${ingredient}&key=${API_KEY}`
requestModule.get(url, (err, res, data)=>{
  return response.contentType('application/json').json(JSON.parse(data))
})
}


function parseData(recipeResponse, res) {
  let recipeData = ''
  recipeResponse.on('data', function (chunk) {
    recipeData += chunk
  })
  recipeResponse.on('end', function () {
	  console.log("recipeData: ", recipeData);
    sendResponse(recipeData, res)
  })
}

//Middleware
app.use(function(req, res, next){
  console.log('-------------------------------');
  console.log('req.path: ', req.path);
  console.log('serving:' + __dirname + ROOT_DIR + req.path);
  next(); //allow next route or middleware to run
});
// use morgan logger to keep request log files
app.use(logger('dev'));

//Middleware
app.use(express.static(__dirname + ROOT_DIR)); //provide static server


//Routes
//catch all requests an log them using app.all route

app.get('/recipes', (req,res)=>{
  let ingredients = req.query.ingredients;
  console.log("querParams", ingredients);
  if(!ingredients){ // if their no ingredients then return no ingredients

    let message ={message:"Please enter a ingredient "}
    return res.json(message.message);
    next()

  }
  if(ingredients.indexOf(",")!=1){
    let ingredientArray= ingredients.split(",");
    console.log("ingredientrray", ingredientArray);
    for(let i =0; i<ingredientArray.length; i++){
        const url =`http://food2fork.com/api/search?q=${ingredientArray[i]}&key=${API_KEY}`
        receipesFromAPI = '';
        requestModule.get(url, (err, response, data)=>{
          console.log("data first");
          console.log(data);
          console.log(ingredientArray[i]);
          receipesFromAPI =data
          console.log(data);
          console.log("Data addded ");


           receipesFromAPI = JSON.parse(receipesFromAPI);
           let receipesArray =[];
           console.log(receipesFromAPI);
          if (receipesFromAPI.count>0)
           for (let i= 0; i<5; i++ ){
             receipesArray.push({title:receipesFromAPI.recipes[i].title,
              food2fork_url:receipesFromAPI.recipes[i].f2f_url,
              image:receipesFromAPI.recipes[i].image_url})



          }
          var page = '<html><head><title>API Example</title></head>' +
            '<body>' +
            '<form method="post">' +
            'ingredient: <input name="ingredient"><br>' +
            '<input type="submit" value="Get Receipes">' +
            '</form>'
          if(receipesFromAPI){
            page += '<h1>Receipe</h1><p>' + '<image'cu+receipesArray[0].title+'</div>' +'</p>'
          }
          page += '</body></html>'
          console.log(page);
        //  page =JSON.stringify(page);
          res.send(page);
        //  return res.contentType('text/html').json(page)




      })
    }

  }

})

function render(receipeData){
  numberOfReceipes= 10; // im gonna let ten receipes be loaded

  //for (let i = 0; i<numberOfReceipes; i++){
    return receipeData;
//  }

}




//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {console.log(`Server listening on port: ${PORT}`)}
})
