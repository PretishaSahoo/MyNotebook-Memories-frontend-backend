const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// ROUTE1: Get all Notes using GET "/api/notes/fetchallnotes" (Login required)
router.get('/fetchallnotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });

    // If you want to include the original Base64 image data in the response
    const notesWithImageData = await Promise.all(
      notes.map(async (note) => {
        const noteData = { ...note._doc };
        if (note.image) {
          noteData.image = note.image.toString('base64'); // Convert Buffer to base64 string
        }
        return noteData;
      })
    );

    res.json(notesWithImageData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE2: Add a new Note using POST "/api/notes/addNote" (Login required)
router.post(
  '/addNote',
  fetchUser,
  [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Enter a description at least 5 characters').isLength({ min: 5 }),
    body('image').optional(),
  ],
  async (req, res) => {
    const { title, description, tag, image } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
        image: image ? image: undefined,
      });

      const savedNote = await note.save();
      res.json(savedNote);

    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// ROUTE3: Update an existing Note using PUT "/api/notes/updatenote/:id" (Login required)
router.put('/updatenote/:id', fetchUser, async (req, res) => {
  try {
    const { title, description, tag, image } = req.body;
    const newNote = {};

    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    if (image) newNote.image = image;

    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send('Not Found');
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed');
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json({ note });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// ROUTE4: Deleting an existing Note using DELETE "/api/notes/deletenote/:id" (Login required)
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send('Not Found');
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send('Not allowed');
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: 'Note has been deleted', note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
