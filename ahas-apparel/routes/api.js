const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const categories = require('../data/categories.json');

const SUBMISSIONS_DIR = path.join(__dirname, '..', 'data', 'submissions');
const CONTACT_FILE = path.join(SUBMISSIONS_DIR, 'contact.json');
const SAMPLE_FILE = path.join(SUBMISSIONS_DIR, 'sample-requests.json');

function readJsonArray(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return []; // file doesn't exist yet, or is empty
  }
}

function appendEntry(filePath, entry) {
  const list = readJsonArray(filePath);
  list.push(entry);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
}

// ---- Read-only catalog data (handy if you later build a separate frontend, app, etc.) ----
router.get('/categories', (req, res) => {
  res.json(categories);
});

router.get('/categories/:subSlug', (req, res) => {
  const all = categories.flatMap((c) => c.subcategories.map((s) => ({ ...s, parent: c.slug })));
  const found = all.find((s) => s.slug === req.params.subSlug);
  if (!found) return res.status(404).json({ error: 'Subcategory not found' });
  res.json(found);
});

// ---- Contact form ----
router.post('/contact', (req, res) => {
  const { name, company, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email and message are required.' });
  }

  appendEntry(CONTACT_FILE, {
    name,
    company: company || '',
    email,
    phone: phone || '',
    message,
    receivedAt: new Date().toISOString()
  });

  // See README.md "Step 6" for how to wire this up to real email delivery.
  res.json({ ok: true, message: 'Thanks — your message has been received. We reply within one business day.' });
});

// ---- Sample request form ----
router.post('/sample-request', (req, res) => {
  const { name, company, email, phone, country, subcategory, notes } = req.body;

  if (!name || !email || !subcategory) {
    return res.status(400).json({ ok: false, error: 'Name, email and product category are required.' });
  }

  appendEntry(SAMPLE_FILE, {
    name,
    company: company || '',
    email,
    phone: phone || '',
    country: country || '',
    subcategory,
    notes: notes || '',
    receivedAt: new Date().toISOString()
  });

  res.json({ ok: true, message: 'Sample request received — our team will confirm shipping details by email.' });
});

module.exports = router;
