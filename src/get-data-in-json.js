import csv from 'csvtojson';
import {
    join
} from 'path';
import {
    writeToFile
} from './write-to-file.mjs';

async function convertToJson(path, outPath) {
    try {
        const output = await csv().fromFile(path);
        writeToFile(outPath, JSON.stringify(output));
    } catch (e) {
        console.log(`error `, e);
    }
}

const path = join(process.cwd(), 'data', 'city.csv');
const out = join(process.cwd(), 'data', 'city-clean.json');

convertToJson(path, out)