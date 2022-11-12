#! /usr/bin/env node

const chalk = require('chalk');

const {
    program
} = require('commander');


// const {
//     getCityInfo
// } = require('./clean-data.js');


const { convertToTimeZone } = require('./convert-to-timezone.js');
const { searchCity, getCountryByTz } = require('./search-data.js');
const { isTerminal } = require('./util.js');



async function citySearch(city) {

    if( isTerminal() ) { 
        const chalkCity = chalk.bgRed.bold(`${city}`)
        console.log(`${chalk.bgWhiteBright.bold('City we are searching for : ')}[${chalkCity}]`);
    }
    
    console.time(`search-time`);
    /**
        Search Result Shape :
        =====================
        [{ 
            location: 'Casablanca', 
            tz: [ 'Africa/Casablanca', '...etc' ],
            isCity: boolean,
            isCountry: boolean,
            err: boolean 
        }]
     */
    const searchResults = searchCity(city, 5);
    if( searchResults?.length ) {
        const tzConvertedResults = searchResults
        .filter( searchObj => !searchObj.err )
        .map( searchObj => {
            /**
                {     
                    stz : <short time zone - IST|PDT|PST|EST... >, 
                    time : <converted time based on tz info>, 
                    zone : <conversion tz name>
                }
             */ 
            const conversionResults = convertToTimeZone(searchObj.tz, false);
            return conversionResults.map( ({stz, time, zone}) => {
                const location = searchObj?.location;
                const tzShort = stz ?? 'TZ NOT FOUND';
                const tzFull = zone;
                const tzTime = time; 
                const { id, name } = getCountryByTz(tzFull)

                if( isTerminal() ) {
                    const locationChalk = chalk.magenta.bold.underline(`${location}`);
                    const tzShortChalk = chalk.green.bold(`${tzShort}`);
                    const tzFullChalk = chalk.cyan.bold.italic.underline(`${tzFull}`);
                    const tzTimeChalk = chalk.whiteBright.bgGrey(`${tzTime}`);
                    const tzCountryChalk = chalk.red.bold.italic.underline(`${name}(${id})`);
                    console.log(`${locationChalk} : [${tzShortChalk}] : ${tzCountryChalk} => ${tzFullChalk} : ${tzTimeChalk}`);
                }
                
                return {
                    location,
                    tzShort,
                    tzFull,
                    tzTime,
                    countryCode: id,
                    isCity: searchObj.isCity,
                    isCountry: searchObj.isCountry
                }
            });
        });

        console.timeEnd(`search-time`);
        return tzConvertedResults;
    }
    
}

program
    .command('city <task>')
    .description('Enter a City name to find closest timezone')
    .action(citySearch)

program.parse();