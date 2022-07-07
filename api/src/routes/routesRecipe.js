const express = require('express');
const router = express.Router();
const { Recipe,Diet} = require('../db');
const {getApiInfo,getAllInfo,getDBInfo} = require('../functions/FoodFunction')
const { default: axios } = require('axios');

router.use(express.json());

router.get('/recipe', async (req, res) => {
    const name = req.query.name;
    try {
        let recipeTotal = await getAllInfo();
        if (name) { /* Si entra un query */
            let recipeName = await recipeTotal.filter(
                recipe => recipe.name.toLowerCase().includes(name.toLowerCase())
            );
            recipeName.length ?
                res.status(200).send(recipeName) :
                res.status(404).send("Cann't find the recipe with the name you are looking for")
        } else { /* Si no hay query en la URL */
            res.status(200).json(recipeTotal)
        }
    } catch (error) {
        res.status(404).json("There is no recipe's with this name")
    }

}); 

router.post('/recipe', async (req, res,) => {
    
        const { name, summary, score, healthScore, steps, diets,image } = req.body;
        // if(!image)

        if(name && summary && score && healthScore && steps && diets){
        const newRecipe = await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            steps,
            image
        }) 
        diets.map(async el => {
            const findDiets = await Diet.findAll({
                where: {name: el}
            })
            newRecipe.addDiet(findDiets)
        })

        res.status(200).send('RECIPE CREADO bichon') 
    } else {
        res.status(405).send('Data needed to proceed is missing');
    }
  
});


// router.get('/recipe/:idRecipe', async (req, res) => {
//     try {
//         const { idRecipe } = req.params;
//         console.log(idRecipe)
//         const allRecipes = await getAllInfo();
//         if (!idRecipe) {
//             res.status(404).json("Couldn't find the name on DBase")
//         } else {
//             const recipe = allRecipes.find(recipe => recipe.id.toString() === idRecipe);
//             res.status(200).json(recipe)
//         }
//     } catch (error) {
//         res.status(404).send('no se encuentra capo')
//     }
// })
router.get('/recipe/:idRecipe', async (req, res) => {
    const idRecipe = req.params.idRecipe
    const allRecipes = await getAllInfo();
    if(idRecipe){
        let recipe = await allRecipes.filter(el => el.id == idRecipe)
        recipepe = recipe[0] 
        recipe.length?
        res.status(200).json(recipepe) :
        res.status(400).send('no se encontro perro')
        // console.log(recipepe)
    }
})


// dogs.get('/dogs/:idRaza', async (req, res) => {
//     try {
//         const { idRaza } = req.params;
//         const allDogs = await getAllDogs();
//         if (!idRaza) {
//             res.status(404).json("Couldn't find the name on DBase")
//         } else {
//             const dog = allDogs.find(dogui => dogui.id.toString() === idRaza);
//             res.status(200).json(dog)
//         }
//     } catch (error) {
//         res.status(404).send(error)
//     }
// })

module.exports = router;