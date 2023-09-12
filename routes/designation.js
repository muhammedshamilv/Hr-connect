const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// POST /api/designations
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    const designation = await prisma.designation.create({
      data: {
        title,
        description
      }
    });

    res.status(201).json(designation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/designations
router.get('/', async (req, res) => {
  try {
    const designations = await prisma.designation.findMany();
    res.status(200).json(designations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/designations/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await prisma.designation.findUnique({
      where: { id: parseInt(id) }
    });

    if (!designation) {
      return res.status(404).json({ error: 'Designation not found.' });
    }

    res.status(200).json(designation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PUT /api/designations/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const designation = await prisma.designation.update({
      where: { id: parseInt(id) },
      data: { title, description }
    });

    res.status(200).json(designation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// DELETE /api/designations/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.designation.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
