import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function saveSubscriberToDB(data: any) {
  console.log('Saving to DB (stub):', data);

  const filePath = join(__dirname, '../../db-mock/internal_api_format.json');
  const jsonData = JSON.stringify(data, null, 2); // Pretty-print with 2-space indentation

  try {
    await writeFile(filePath, jsonData, 'utf8');
    console.log('Data saved to internal_api_format.json');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}
