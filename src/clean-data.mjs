import fs from 'fs-extra';
import {
    join
} from 'path';
import {
    writeToFile
} from './write-to-file.mjs';

const uncleanCityDataPath = join(process.cwd(), 'data', 'city-clean.json');
const outputPath = join(process.cwd(), 'data', 'city-structured-and-cleaned-data.json');
const cleanedDataPath = outputPath;


async function readInfo(path) {
    try {
        const data = await fs.readFile(path);
        return JSON.parse(data.toString('utf8'));
    } catch (error) {
        console.error(`e: `, e);
    }
}

async function cityBasedData() {
    try {
        const data = await readInfo(uncleanCityDataPath);
        // console.log(data[0], data[1]);
        let map = new Map();
        data.forEach(cityRecord => {
            const {
                city_ascii
            } = cityRecord;

            const key = city_ascii && city_ascii.toLowerCase()
            if (!map.has(key)) {
                map.set(key, []);
            }

            map.get(key).push(cityRecord);

        });
        // console.log(map.get('manchester'))
        return map;
    } catch (e) {
        console.log(`error`, e);
    }
}

function sortAndDelete(cityArray, count = 2) {
    if (cityArray) {
        const output = cityArray.sort((a, b) => {
            return b.population - a.population;
        })

        return output.slice(0, count);
    }
}

async function writeCleanDataToFile(outPath, content) {
    try {
        writeToFile(outPath, JSON.stringify(content));
    } catch (e) {
        console.log(`error `, e);
    }
}

async function cleanDataBasedOnPopulation(no = 2) {
    try {
        const dataMap = await cityBasedData();
        const outputMap = new Map();
        dataMap.forEach((value, key, map) => {
            outputMap.set(key, sortAndDelete(value, no));
        })
        await writeCleanDataToFile(outputPath, Object.fromEntries(outputMap))
        return outputMap;
    } catch (e) {
        console.log(`error`, e);
    }
}

export async function getCityInfo(cityName) {
    try {
        const cityObj = await readInfo(cleanedDataPath);
        if (cityName) {
            console.log(cityObj[cityName.toLowerCase()])
        }
    } catch (e) {
        console.log(`error`, e);
    }
}

// Step - 1:
// get-data-in-json
// Step - 2: Clean data based on no of max counts for attrition in cities get them based on last 2 hightest population
// cleanDataBasedOnPopulation(2);
// Step - 3: Use flexisearch get the entries for searching
// await getCityInfo('chennai')