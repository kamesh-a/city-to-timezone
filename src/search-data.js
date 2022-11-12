// Working on flexisearch

const {
    Index
} = require('flexsearch');

const { getCountryForTimezone } = require('countries-and-timezones');

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

// Contains cityNames & countryNames in array.
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

// City Map to get timezone in an array.
function getTimeZoneForCity(city) {
    if (cityToTimezone.has(city)) {
        return {
            tz: cityToTimezone.get(city),
            isCity: true,
            isCountry: false
        }
    }
}

// Country Map to get timezone in an array.
function getTimeZoneForCountry(city) {
    if (countryToTimeZone.has(city)) {
        return {
            tz: countryToTimeZone.get(city),
            isCity: false,
            isCountry: true
        }
    }
    return {
        err: true,
        isCity: false,
        isCountry: false,
        tz: 'not found'
    }
}

/**
 * 
 * @param {*} city : string
 * @param {*} limit : number
 * @returns { tz: [],
        location: string,
        isCity: boolean,
        isCountry: boolean,
        err: boolean
    }
 */
function searchCity(city, limit = 3) {
    try {
        const records = flex.search(city, {
            limit
        });
        const slicedRecords = records.slice(0, limit);
        if (slicedRecords) {
            const results = slicedRecords.map((v) => {
                const city = cityArray[v];
                const tzInfo = getTimeZoneForCity(city) || getTimeZoneForCountry(city)
                return {
                    location: city,
                    ...tzInfo
                }
            });
            return results;
        }
    } catch (e) {
        console.log(`Error in indexing documents : ${e.message}`)
    }
}

function getCountryByTz( tzName , deprecated = false ) {
    if( tzName ) {
        return getCountryForTimezone(tzName, {
            deprecated
        });
    }
}

indexDocuments();
console.timeEnd(`city-data-indexing`);

// console.time(`search-time`);
// console.log(searchCity('Australia'))
// console.log(searchCity('Turkey'))
// console.log(searchCity('Morocco'))
// console.log(searchCity('Cyprus'))
// console.log(searchCity('manchester'))
// console.timeEnd(`search-time`);

module.exports = {
    searchCity,
    getCountryByTz
}