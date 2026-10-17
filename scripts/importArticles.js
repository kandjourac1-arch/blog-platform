const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const ArticleSchema = new mongoose.Schema({
  title: String,
  slug: String,
  date: Date,
  author: String,
  tags: [String],
  summary: String,
  content: String
});
const Article = mongoose.model('Article', ArticleSchema);

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('Veuillez définir MONGODB_URI dans .env');
    process.exit(1);
  }
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connecté à MongoDB');

  const index = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'content', 'index.json')));
  for (const meta of index) {
    const mdPath = path.join(__dirname, '..', meta.path);
    if (!fs.existsSync(mdPath)) {
      console.warn('Fichier manquant', mdPath);
      continue;
    }
    const raw = fs.readFileSync(mdPath, 'utf8');
    // naive front-matter parse
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    let metaData = {};
    let content = raw;
    if (fmMatch) {
      const fm = fmMatch[1];
      content = fmMatch[2];
      fm.split(/\n/).forEach(line => {
        const idx = line.indexOf(':');
        if (idx > -1) {
          const key = line.slice(0, idx).trim();
          const value = line.slice(idx+1).trim();
          if (value.startsWith('[')) {
            try { metaData[key] = JSON.parse(value.replace(/'/g, '"')); } catch(e) { metaData[key] = []; }
          } else {
            metaData[key] = value.replace(/^"|"$/g, '');
          }
        }
      });
    }
    const doc = new Article({
      title: metaData.title || meta.title,
      slug: metaData.slug || meta.slug,
      date: metaData.date || meta.date,
      author: metaData.author || 'Rédaction analytique',
      tags: metaData.tags || meta.tags || [],
      summary: metaData.summary || meta.summary || '',
      content: content.trim()
    });
    await Article.create(doc);
    console.log('Importé:', doc.title);
  }
  console.log('Import terminé');
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
