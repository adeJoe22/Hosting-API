
const multer = require("multer")
const cuisineModel = require("../Model/cuisineModel");


const storage = multer.diskStorage({
    destination: (req, file, callback)=> {
        callback(null, "uploads")
    },

    fileName: (req, file, callback)=> {
        callback(null, file.originalname)
    }
})

// creating filter
const fileFilter = (req, file, callback)=> {
    if(
        file.mimetype === ".jpeg"||
        file.mimetype === ".jpg" ||
        file.mimetype === ".png"
    ){
        callback(null, true)
    }else{
        callback(null, "file not supported")
    }
}

const imageUpload = multer({
    storage,
    fileFilter,
    limit: {
        fileSize: 1024 * 1024 * 2
    }

}).single("image")

// Post Method

const createNewCuisine = async (req, res)=> {
    try {
        const newCuisine = await cuisineModel.create({
            cuisineTypes: {
                african: req.body.cuisineTypes.african,
                japanese: req.body.cuisineTypes.japanese,
                european: req.body.cuisineTypes.european,
                chinese: req.body.cuisineTypes.chinese,
                indian: req.body.cuisineTypes.indian,
            },
            chineseCuisine: [
                {cantonese: req.body.chineseCuisine.cantonese},
                {shandong: req.body.chineseCuisine.shandong},
                {sichuan: req.body.chineseCuisine.sichuan},
            ],
            order: req.body.order,
        })
        res.status(200).json({message: "New cuisines were created successfully", data: newCuisine})
    } catch (error) {
        console.log("There was an error creating while cuisines")        
    }
};

//Get Method

//Get all cuisines
const getCuisines = async (req, res)=> {
    try {
        const cuisineLists = await cuisineModel.find();
        if(!cuisineLists){
            res.send(" There is no cuisine in the database")
        }
        res.status(200).json({message: "Here are the lists of all cuisines", data: cuisineLists});
    } catch (error) {
        console.log({message: error.message})
    }
};
//Get single cuisine

const getSingleCuisine = async (req, res)=> {
    try {
        const cuisineID = req.params.id;
        if(!cuisineID){
            res.status(404).json(`There is no cuisne with this ID: ${cuisineID}`)
        }
        const myCuisine = await cuisineModel.findById(cuisineID);
        res.status(200).json({message: "My Cuisine details", data: myCuisine});
    } catch (error) {
        console.log({message: error.message})
    }
}

// update
const updateCuisine = async (req, res)=> {
    try {
        const cuisineID = req.params.id;
        if(!cuisineID){
            res.status(404).json({message: "Incorrect ID"})

        }
        const updatedCuisine = await cuisineID.updateOne({
            cuisineTypes: {
                african: req.body.cuisineTypes.african,
                japanese: req.body.cuisineTypes.japanese,
                european: req.body.cuisineTypes.european,
                chinese: req.body.cuisineTypes.chinese,
                indian: req.body.cuisineTypes.indian,
            },
            chineseCuisine: [
                {cantonese: req.body.chineseCuisine.cantonese},
                {shandong: req.body.chineseCuisine.shandong},
                {sichuan: req.body.chineseCuisine.sichuan},
            ],
            order: req.body.order,
        });
        res.status(200).json({message: `Cuisine of this ID: ${cuisineID}, was updated successfully`});
    } catch (error) {
        res.send({message: error.message})
    }
}

// Delete Method
const deleteCuisine = async (req, res)=> {
    try {
        const cuisineID = req.params.id;
        if(!cuisineID){
            res.status(404).json({message: `The cuisine of this ID: ${cuisineID}, was not found`});
        }
        const deletedCuisine = await cuisineModel.findByIdAndDelete(cuisineID);
        res.status(200).json({message: `The cuisine of this ID: ${cuisineID}, is deleted`, data: deletedCuisine})
    } catch (error) {
        console.log({message: error.message})
    }
};
module.exports = {
    imageUpload,
    createNewCuisine,
    getCuisines, 
    getSingleCuisine,
    updateCuisine,
    deleteCuisine
}