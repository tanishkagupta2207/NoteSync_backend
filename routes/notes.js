const router = require("express").Router();
const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 fetch all notes for a user. Login Required
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  let success = false;
  try {
    const notes = await Notes.find({ user: req.user.id });
    success = true;
    res.json({success, notes});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({success, msg: "Internal error"});
  }
});

//Route 2 ADD a note for a user. Login Required
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savedNote = await note.save();
      success = true;
      res.json({success, note: savedNote});
    } catch (error) {
      console.log(error.message);
      res.status(500).json({success,msg: "Internal error"});
    }
  }
);

//Route 3 Update a note for a user. Login Required
router.put(
  "/updateNote/:id",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json( {success, errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //find the note to update
      let note = await Notes.findById(req.params.id);

      if (!note) {
        return res.status(404).json({success,msg: "Note not Found !"});
      }

      if (note.user.toString() !== req.user.id) {
        return res.status(401).json({success,msg: "Action not allowed"});
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      success = true;
      res.json({success, note });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({success,msg: "Internal error"});
    }
  }
);

//Route 4 Delete a note for a user. Login Required
router.delete(
    "/deleteNote/:id",
    fetchUser,
    async (req, res) => {
      let success = false;
      try {
        
        //find the note to delete
        let note = await Notes.findById(req.params.id);
  
        if (!note) {
          return res.status(404).json({success,msg: "Note not Found !"});
        }

        // User is not the owner of the note
        if (note.user.toString() !== req.user.id) {
          return res.status(401).json({success,msg: "Action not allowed"});
        }
  
        note = await Notes.findByIdAndDelete(
          req.params.id
        );
        success = true;
        res.json({success,msg: "Note deleted successfully"});
      } catch (error) {
        console.log(error.message);
        res.status(500).json({success,msg: "Internal error"});
      }
    }
  );

module.exports = router;
