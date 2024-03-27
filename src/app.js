const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
 app.get('/musicians', async (req, res, next) => {
    try{
        const getMusician = await Musician.findAll();
        if (!getMusician) {
            throw new Error ('error');
        }
        res.json(getMusician);
    } catch (error) {
        next(error)
    }
})


// get a specific musician 
app.get('/musicians/:id', async (req, res, next) => {
    try{
        const num = req.params.id
        const getMusician = await Musician.findByPk(num);
        if (!getMusician) {
            throw new Error ('error');
        }
        res.json(getMusician);
    } catch (error) {
        next(error)
    }
})

// post musicians (create new musician) 
app.use(express.json());
app.use(express.urlencoded());
app.post('/musicians/:id', async(req, res, next) => {
    try{
        const {name, instrument} = req.body;
        const newMuscian = await Musician.create({name, instrument});
        res.json(newMuscian);
    } catch (error){
        next(error)
    }   
})

// put (update musician and repsond w updated musician)
app.put('/musicians/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {name, instrument} = req.body; 
        const updateMusician = await Musician.findByPk(id);
        // update musician 
        updateMusician.name = name
        updateMusician.instrument = instrument;
        // sequelize to udpate database
        await updateMusician.save();
        // send back updated musician 
        res.json(updateMusician);
    } catch (error) {
        next(error);
    }
});

// delete musician 
app.delete('/musician/:id', async () => {
    try{
    const id = req.params.id;
    const deleteMusician = await Musician.findByPk(id);
    await deleteMusician.destroy();
    res.json(Musician);
    } catch(error) {
        next(error);
    }
})


module.exports = app;