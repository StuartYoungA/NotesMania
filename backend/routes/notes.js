const express = require("express");
const router = express.Router(); //app.use ka path then ye apna path add krega(router.use) (app.get keval jo likha hi wo path consider krta)
const fetchDataMiddleWare = require("../middlewares/fetchdataMiddleware");
const { body, validationResult } = require("express-validator");
const notes = require("../models/notesSchema");

//router to fetch the notes. this will only work if user is already logged in.. by using its token we got id and that id will be used to fetch all data
router.get("/fetchnotes", fetchDataMiddleWare, async (req, res) => {
  try {
    userId = req.user.id;
    // console.log(userId)
    const findNotes = await notes.find({Fuser: userId });  //user is like foreign key in notes schema 
    // console.log(findNotes)
  if(!findNotes)res.send("Empty")
    else{res.send(findNotes);}
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//router to create notes . need to be logined first

router.post("/createnotes",fetchDataMiddleWare,[
    body('title', 'So small title').isLength({min:3}),
    body('description', 'Please give atleast a sentence about title').isLength({min:8}), 
],async(req,res)=>{
    

    // If there are errors, return Bad request and the errors
    try {
      // const { title, description, tag } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const note = new notes({
          title:req.body.title,
          description:req.body.description,
          tag:req.body.tag,
          Fuser: req.user.id 
            //title des and tag from post request and Fuser is storing user schema id which will give all data of that table
      })
      const savedNote = await note.save()

      res.json(savedNote)

  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

//Route 3: updating the existing  note of a user 

router.put("/updatenotes/:id",fetchDataMiddleWare,async(req,res)=>{

  try {
    
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };  //title diya gya ho to update krdo and similarly below
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    //now search for notes corresponding to giver user (kya koi notes exist bhi krte hain)
    let note = await notes.findById(req.params.id);//routing parameter angela  

    if (!note) { return res.status(404).send("Not Found") }  //if exist nhi krte

    if (note.Fuser.toString() !== req.user.id) {     //further if exist then check of id(user)
        return res.status(401).send("Not Allowed");
    }
    //all is well and fine, so update
    note = await notes.findByIdAndUpdate(req.params.id,  newNote , { new: true })
    res.json({ note });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;

//NOTE: CONST VARIABLES KO HUM AWAIT NHI KRAA SKTE .. SEE LINE 68 WE HAVE GIVEL LET TYPE .. OTHERWISE LINE 76 WOULD HAVE GIVEN ERROR

//ROUTE 4 deleting a note of an existing user and existing notes

router.delete("/deletenotes/:id",fetchDataMiddleWare,async(req,res)=>{
  try {
    

    //now search for notes corresponding to giver user (kya koi notes exist bhi krte hain)
    let note = await notes.findById(req.params.id);//routing parameter angela  

    if (!note) { return res.status(404).send("Not Found") }  //if exist nhi krte

    if (note.Fuser.toString() !== req.user.id) {     //further if exist then check of id(user)
        return res.status(401).send("Not Allowed");
    }
    //all is well and fine, so update
    note = await notes.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been deleted", note: note });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})
