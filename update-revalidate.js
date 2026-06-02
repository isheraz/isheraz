const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'app', 'admin');
const dirs = fs.readdirSync(adminDir).filter(f => fs.statSync(path.join(adminDir, f)).isDirectory());

dirs.forEach(dir => {
  const actionsPath = path.join(adminDir, dir, 'actions.ts');
  if (fs.existsSync(actionsPath)) {
    let content = fs.readFileSync(actionsPath, 'utf8');
    // Replace revalidatePath('/admin/xyz') with revalidatePath('/admin/xyz')\n  revalidatePath('/', 'layout')
    // but only if not already followed by revalidatePath('/', 'layout')
    content = content.replace(/(revalidatePath\('\/admin\/[^']+'\))(?![\s\S]*revalidatePath\('\/',\s*'layout'\))/g, "$1\n  revalidatePath('/', 'layout')");
    fs.writeFileSync(actionsPath, content);
  }
});
console.log('Cache tagging updated');
