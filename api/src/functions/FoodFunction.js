const axios = require('axios');
const { Recipe, Diet, /*Op*/ } = require('../db');
const {API_KEY} = process.env;


const getApiInfo = async () => {
     const ApiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        const ApiInfo  = await ApiURL.data.results.map( result => {
                return {
                    id: result.id,
                    name: result.title,
                    vegetarian: result.vegetarian,
                    vegan: result.vegan, 
                    glutenFree: result.glutenFree,
                    dairyFree: result.dairyFree,  
                    image: result.image, 
                    score: result.spoonacularScore,
                    healthScore: result.healthScore,
                    types: result.dishTypes.map(element => element),  
                    diets: result.diets.map(element => element), 
                    summary:result.summary, 
                    steps: (result.analyzedInstructions[0] && result.analyzedInstructions[0].steps?result.analyzedInstructions[0].steps.map(item=>item.step).join(""):'')
                }        
            })
            //  console.log(ApiURL)
        return ApiInfo;
}

   
const getDBInfo = async () => {
    
        const dataDB =  await Recipe.findAll({ 
            include:{
                model: Diet,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
        
        return dataDB;
}
const getAllInfo = async () => {
    try{
        const apiInfo = await getApiInfo();
        const bdInfo = await getDBInfo();
        // console.log(bdInfo) 
        const infoTotal = apiInfo.concat(bdInfo);
        return infoTotal;
    }catch (error) {
        console.error(error);
    }
 };

 module.exports = {
   getApiInfo,getAllInfo,getDBInfo
};


