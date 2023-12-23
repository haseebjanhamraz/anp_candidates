// routes/index.js
const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const { upload } = require("../config/multer"); // Adjusted import
const user = require("../models/User");
const isAuthenticated = require("./protected"); // Update this line

// Index route
router.get("/", async (req, res) => {
  const user = req.user;
  const items = await Item.find();
  res.render("index", { items, user: req.user });
});

router.get('/item/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    const user = req.user;
    res.render('item', { item, user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle form submission
router.post(
  "/add",
  isAuthenticated,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      // Extract data from the form submission
      const {
        name,
        fathername,
        contactNumber,
        district,
        constituencyType,
        constituency,
        cnic,
        currentAddress,
        permanentAddress,
        suggesterName,
        suggesterFatherName,
        suggesterContactNum,
        suggesterCNIC,
        suggesterCurrentAddress,
        suggConstTyp,
        suggesterConstituency,
        vindicatorName,
        vindicatorFatherName,
        vindicatorContactNum,
        vindicatorCNIC,
        vindicatorCurrentAddress,
        vindConstTyp,
        vindicatorConstituency,
        cadidateSign,
        suggesterSign,
        vindicatorSign,
        ucPresidentSign,
        tehsilPresidentSign,
        districtPresidentSign,
      } = req.body;

      // Get the uploaded image file
      const profileImage = req.file;

      // Create a new item instance
      const newItem = new Item({
        name,
        fathername,
        contactNumber,
        district,
        constituencyType,
        constituency,
        cnic,
        currentAddress,
        permanentAddress,
        suggesterName,
        suggesterFatherName,
        suggesterContactNum,
        suggesterCNIC,
        suggesterCurrentAddress,
        suggConstTyp,
        suggesterConstituency,
        vindicatorName,
        vindicatorFatherName,
        vindicatorContactNum,
        vindicatorCNIC,
        vindicatorCurrentAddress,
        vindConstTyp,
        vindicatorConstituency,
        cadidateSign,
        suggesterSign,
        vindicatorSign,
        ucPresidentSign,
        tehsilPresidentSign,
        districtPresidentSign,
        profileImage: profileImage.filename, // Save the filename to the database
      });

      // Save the item to the database
      await newItem.save();

      // Redirect to the home page or wherever you want
      res.redirect("/");
    } catch (error) {
      // Handle errors (e.g., validation errors)
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Edit route
router.get("/edit/:id", isAuthenticated, async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    res.render("edit", { item, user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/edit/:id", upload.single("profileImage"), async (req, res) => {
  try {
    const itemId = req.params.id;

    // Find the existing item
    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).send("Item not found");
    }

    // Update fields from the form
    item.name = req.body.name;
    item.fathername = req.body.fathername;
    item.contactNumber = req.body.contactNumber;
    item.district = req.body.district;
    item.constituencyType = req.body.constituencyType;
    item.constituency = req.body.constituency;
    item.cnic = req.body.cnic;
    item.currentAddress = req.body.currentAddress;
    item.permanentAddress = req.body.permanentAddress;
    item.suggesterName= req.body.suggesterName;
    item.suggesterFatherName= req.body.suggesterFatherName;
    item.suggesterContactNum= req.body.suggesterContactNum;
    item.suggesterCNIC= req.body.suggesterCNIC;
    item.suggesterCurrentAddress= req.body.suggesterCurrentAddress;
    item.suggConstTyp= req.body.suggConstTyp;
    item.suggesterConstituency= req.body.suggesterConstituency;
    item.vindicatorName= req.body.vindicatorName;
    item.vindicatorFatherName= req.body.vindicatorFatherName;
    item.vindicatorContactNum= req.body.vindicatorContactNum;
    item.vindicatorCNIC= req.body.vindicatorCNIC;
    item.vindicatorCurrentAddress= req.body.vindicatorCurrentAddress;
    item.vindConstTyp= req.body.vindConstTyp;
    item.vindicatorConstituency= req.body.vindicatorConstituency;
    item.candidateSign= req.body.candidateSign;
    item.suggesterSign= req.body.suggesterSign;
    item.vindicatorSign= req.body.vindicatorSign;
    item.ucPresidentSign= req.body.ucPresidentSign;
    item.tehsilPresidentSign= req.body.tehsilPresidentSign;
    item.districtPresidentSign= req.body.districtPresidentSign;
    
    // If a new image is provided, update the imagePath
    if (req.file) {
      // Set both profileImage and imagePath to the new file name
      // Log the existing and new file names

      item.profileImage = req.file.filename;
      // item.imagePath = req.file.filename;
      item.imagePath = "uploads/" + req.file.filename; // Ensure the correct path
    }

    // Save the updated item
    await item.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete route
router.get("/delete/:id", isAuthenticated, async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
