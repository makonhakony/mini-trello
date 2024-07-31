const express = require('express');
const router = express.Router();
const firebaseAdmin = require('firebase-admin');
const cors = require('cors');

router.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Create a New Board
router.post('/', async (req, res) => {
  const { 
    title, 
    owner, 
    cards 
  } = req.body;
  const newBoard = { title, owner, cards: cards || [] };
  const boardRef = await firebaseAdmin.firestore().collection('boards').add(newBoard);
  res.status(201).json({ id: boardRef.id, ...newBoard });
});

// Retrieve All Boards
router.get('/', async (req, res) => {
  
  const boardsSnapshot = await firebaseAdmin.firestore().collection('boards').get();
  const boards = boardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.status(200).json(boards);
});

// Retrieve Board Details
router.get('/:id', async (req, res) => {
  const boardRef = firebaseAdmin.firestore().collection('boards').doc(req.params.id);
  const boardDoc = await boardRef.get();
  if (!boardDoc.exists) return res.sendStatus(404);
  res.status(200).json({ id: boardDoc.id, ...boardDoc.data() });
});

// Update Board Details
router.put('/:id', async (req, res) => {
  const { title, owner, cards } = req.body;
  const boardRef = firebaseAdmin.firestore().collection('boards').doc(req.params.id);
  await boardRef.update({ title, owner, cards });
  res.status(200).json({ id: req.params.id, title, owner, cards });
});

// Delete Board
router.delete('/:id', async (req, res) => {
  const boardRef = firebaseAdmin.firestore().collection('boards').doc(req.params.id);
  await boardRef.delete();
  res.sendStatus(204);
});

module.exports = router;
