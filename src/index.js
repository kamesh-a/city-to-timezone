import cas from 'country-state-city';
import {
    writeToFile
} from './write-to-file.mjs';
import {
    join
} from 'path';


/**
 * 
 * Implement flex Search
 * Create a local module with cli to search and give experience to users
 * Logic to figure city -> state -> getting map info.
 */

const filePath = join(process.cwd(), 'files')

function getTimeZoneOfCountry(country) {
    const content = cas.Country.getCountryByCode(country);
    const path = join(filePath, `timezones-of-${country}.json`);
    writeToFile(path, JSON.stringify(content))
}

function getCities(country) {
    const content = cas.City.getCitiesOfCountry(country);
    const path = join(filePath, `cities-of-${country}.json`);
    writeToFile(path, JSON.stringify(content))
}

function getStates(country) {
    const content = cas.State.getStatesOfCountry(country);
    const path = join(filePath, `states-of-${country}.json`);
    writeToFile(path, JSON.stringify(content))
}

function getAllCities() {
    const content = cas.City.getAllCities();
    const path = join(filePath, `all-cities-of-world.json`);
    writeToFile(path, JSON.stringify(content))
}

function getAllStates(country) {
    const content = cas.State.getAllStates(country);
    const path = join(filePath, `all-states-of-world.json`);
    writeToFile(path, JSON.stringify(content))
}

function getAllCountriesWithTimeZones(country) {
    const content = cas.Country.getAllCountries();
    const path = join(filePath, `all-countries-of-world.json`);
    writeToFile(path, JSON.stringify(content))
}



// getCities('US');
// getTimeZoneOfCountry('US');
// getStates('US');
// getAllStates()
// getAllCountriesWithTimeZones()
// getAllCities()