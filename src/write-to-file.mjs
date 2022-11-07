import { outputFile } from 'fs-extra';

export async function writeToFile(path, content ) {
    try {
        await outputFile(path, content)
    } catch (error) {
        console.log(`Error in writing a file `, e, path);
    }
}