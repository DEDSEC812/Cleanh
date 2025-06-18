// api/vcf.js
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send('Metòd pa otorize');
  }
  
  const filePath = path.join(process.cwd(), 'contacts.json');
  
  try {
    const content = await readFile(filePath, 'utf-8');
    const contacts = JSON.parse(content);
    
    let vcf = '';
    for (const contact of contacts) {
      vcf += `BEGIN:VCARD\nVERSION:3.0\nFN:${contact.name}\nTEL;TYPE=CELL:+${contact.phone}\nEND:VCARD\n\n`;
    }
    
    const vcfFilePath = path.join(process.cwd(), 'public', 'contacts_clean.vcf');
    await writeFile(vcfFilePath, vcf);
    
    res.setHeader('Content-Disposition', 'attachment; filename="contacts_clean.vcf"');
    res.setHeader('Content-Type', 'text/vcard');
    res.send(vcf);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erè pandan jenerasyon VCF');
  }
}
