// Ahas Apparel — main server entry point.
// Loads .env (if present), wires up EJS views, static files, page routes and the API.

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const app = express();

const pageRoutes = require('./routes/pages');
const apiRoutes = require('./routes/api');
const categories = require('./data/categories.json');

// ---- View engine ----
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---- Global site settings available to every EJS view ----
app.locals.site = {
  name: process.env.COMPANY_NAME || 'Ahas Apparel',
  email: process.env.COMPANY_EMAIL || 'info@ahasapparel.com',
  phone: process.env.COMPANY_PHONE || '+92 300 0000000',
  whatsapp: process.env.COMPANY_WHATSAPP || '923000000000',
  address: process.env.COMPANY_ADDRESS || 'Industrial Area, Lahore, Pakistan',
  year: new Date().getFullYear()
};

// Available in every view automatically (used by the header mega-menu and footer links)
app.locals.navCategories = categories;

// ---- Middleware ----
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ---- Routes ----
app.use('/api', apiRoutes);
app.use('/', pageRoutes);

// ---- 404 ----
app.use((req, res) => {
  res.status(404).render('404', { title: 'Page not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ahas Apparel running → http://localhost:${PORT}`);
});
