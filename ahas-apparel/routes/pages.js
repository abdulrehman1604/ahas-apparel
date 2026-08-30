const express = require('express');
const router = express.Router();
const categories = require('../data/categories.json');

// Flatten helper: every subcategory with a reference back to its parent category
function allSubcategories() {
  return categories.flatMap((cat) =>
    cat.subcategories.map((sub) => {
      const firstWithImage = sub.products.find((p) => p.image);
      return {
        ...sub,
        parent: { slug: cat.slug, name: cat.name },
        image: firstWithImage ? firstWithImage.image : null
      };
    })
  );
}

// ---- Home ----
router.get('/', (req, res) => {
  const all = allSubcategories();
  // Prioritize lines that already have real photography, then fill the rest.
  const withImages = all.filter((s) => s.image);
  const withoutImages = all.filter((s) => !s.image);
  const featured = [...withImages, ...withoutImages].slice(0, 8);
  res.render('home', {
    title: 'Ahas Apparel — Premium B2B Apparel Manufacturing',
    categories,
    featured
  });
});

// ---- Full catalog overview (all categories + subcategories) ----
router.get('/catalog', (req, res) => {
  res.render('catalog', {
    title: 'Catalog — Ahas Apparel',
    categories
  });
});

// ---- One landing page per subcategory ----
// e.g. /catalog/leather-jackets
router.get('/catalog/:subSlug', (req, res, next) => {
  const sub = allSubcategories().find((s) => s.slug === req.params.subSlug);
  if (!sub) return next(); // falls through to 404
  res.render('category', {
    title: `${sub.name} — Ahas Apparel`,
    sub,
    categories
  });
});

// ---- Static-ish pages ----
router.get('/about', (req, res) => {
  res.render('about', { title: 'About — Ahas Apparel' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact — Ahas Apparel', sent: false });
});

router.get('/sample-request', (req, res) => {
  const subs = allSubcategories();
  res.render('sample-request', { title: 'Request Free Samples — Ahas Apparel', subs, sent: false });
});

module.exports = router;
