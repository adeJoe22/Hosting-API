const express = require("express")
const router = express.Router();
const {
    imageUpload,
    createNewCuisine,
    getCuisines, 
    getSingleCuisine,
    updateCuisine,
    deleteCuisine
} = require("../Controller/cuisineController");

// Post 

router.post("/cuisine", imageUpload, createNewCuisine);

// Get: all and single
router.get("/cuisine", getCuisines);
router.get("/cuisine/:id", getSingleCuisine);

// Update
router.patch("/cuisine",imageUpload, updateCuisine);

// Delete
router.delete("/cuisine", deleteCuisine);

module.exports = router;