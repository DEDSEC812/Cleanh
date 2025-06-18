// api/save.js import { writeFile, readFile } from 'fs/promises'; import path from 'path';

export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).send('Metòd pa otorize'); }

const filePath = path.join(process.cwd(), 'contacts.json');

try { let existing = []; try { const content = await readFile(filePath, 'utf-8'); existing = JSON.parse(content); } catch (e) { // fichye pa egziste, pa gen pwoblèm }

const newEntry = req.body;
existing.push(newEntry);

await writeFile(filePath, JSON.stringify(existing, null, 2));
res.status(200).send('Done anrejistre avèk siksè!');

} catch (error) { console.error(error); res.status(500).send('Erè pandan anrejistreman'); } }

