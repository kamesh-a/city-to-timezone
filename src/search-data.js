// Working on flexisearch

const {
    Index
} = require('flexsearch');

const workerOptions = {
    preset: 'performance',
    tokenize: 'forward',
    cache: 50,
    encode: false
}

const flex = new Index(workerOptions);

const {
    cityToTimezone,
    countryToTimeZone
} = require('./cron-data');

console.time(`city-data-indexing`);
const cityArray = [...cityToTimezone.keys(), ...countryToTimeZone.keys()];

function indexDocuments() {
    try {
        cityArray.forEach((city, index) => {
            flex.add(index, city);
        });
    } catch (e) {
        console.log(`Error in indexing documents : ${e.message}`)
    }
}

function getTimeZoneForCity(city) {
    if(cityToTimezone.has(city)) {
        return cityToTimezone.get(city);
    }
}

function getTimeZoneForCountry(city) {
    if(countryToTimeZone.has(city)) {
        return countryToTimeZone.get(city);
    }
    return "not found"
}

function searchCity(city, limit = 3) {
    try {
        const records = flex.search(city, { limit });
        const slicedRecords = records.slice(0,limit);
        if( slicedRecords ) {
            const results = slicedRecords.map((v) => {
                const city = cityArray[v];
                return {
                    city,
                    tz: getTimeZoneForCity(city) || getTimeZoneForCountry(city)
                }
            });
            return results;
        }
    } catch (e) {
        console.log(`Error in indexing documents : ${e.message}`)
    }
}

indexDocuments();
console.timeEnd(`city-data-indexing`);

// console.time(`search-time`);
// console.log(searchCity('chen'))
// console.log(searchCity('Turkey'))
// console.log(searchCity('Morocco'))
// console.log(searchCity('Cyprus'))
// console.log(searchCity('manchester'))
// console.timeEnd(`search-time`);

module.exports = {
    searchCity
}