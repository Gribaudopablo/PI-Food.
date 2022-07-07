const { Router } = require('express');
const { dietTypesDb } = require('../functions/DietDB')
const db = require("../db");
const { Recipe, Diet } = require('../db');

const router = Router();

router.get('/type', async (req, res, next) => {
    
    try {
        dietTypesDb.forEach(e => {
            Diet.findOrCreate({
                where: { name: e}
            })
        });
        const dietTypes = await Diet.findAll();
        res.send(dietTypes)
    } catch (error) {
        next(error)
    }
})



module.exports = router;