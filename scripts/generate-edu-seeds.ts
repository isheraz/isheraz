import { EDU_ALL, EDU_BODIES } from '../lib/data';

function generateHtml(bodyObj: any[]) {
  if (!bodyObj) return '';
  return bodyObj.map(block => {
    if (block.type === 'lede') return `<p class="lede">${block.text}</p>`;
    if (block.type === 'h2') return `<h2>${block.text}</h2>`;
    if (block.type === 'p') return `<p>${block.text}</p>`;
    if (block.type === 'pull') return `<blockquote>${block.text}</blockquote>`;
    if (block.type === 'ul') {
      const items = block.items.map((i: string) => `<li>${i}</li>`).join('');
      return `<ul>${items}</ul>`;
    }
    return '';
  }).join('');
}

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const sql = EDU_ALL.map((item, index) => {
  const typeMap: Record<string, string> = {
    'Tutorials': 'tutorial',
    'Talks': 'talk',
    'Resources': 'resource'
  };
  const type = typeMap[item.category] || 'resource';
  const slug = slugify(item.title);
  const html = generateHtml(EDU_BODIES[index]).replace(/'/g, "''"); // escape single quotes for SQL
  const meta = JSON.stringify(item.meta).replace(/'/g, "''");
  
  return `INSERT INTO education (slug, type, title, description, meta_tags, sort_order) VALUES ('${slug}', '${type}', '${item.title.replace(/'/g, "''")}', '${html}', '${meta}'::jsonb, ${index});`;
}).join('\n');

console.log(sql);
