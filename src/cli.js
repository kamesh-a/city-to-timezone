#! /usr/bin/env node

const chalk = require('chalk');
const {
    program
} = require('commander');


const {
    getCityInfo
} = require('./clean-data.js');


const { convertToTimeZone } = require('./convert-to-timezone.js');
const { searchCity } = require('./search-data.js');

async function citySearch(city) {
    console.log(chalk.bgWhiteBright.bold(`City we are searching for : [${city}]`))
    /**
     * [ { city: 'Casablanca', tz: [ 'Africa/Casablanca' ] } ]
     */
    console.time(`search-time`);
    const results = searchCity(city, 5);
    if( results?.length ) {
        /**
            [{
                stz,
                time,
                zone
            }]
        */
        results.forEach( sObj => {
            const results = convertToTimeZone(sObj.tz, false);
            // { stz, time, zone }
            results.forEach( ({stz, time, zone}) => {
                const lCity = chalk.magenta.bold.underline(`${sObj.city}`);
                const shortZoneName = chalk.green.bold(`${stz}`);
                const fullZoneName = chalk.cyan.bold.italic.underline(`${zone}`);
                const timeInfo = chalk.yellow.bgBlack.bold(`${time}`);
                console.log(`${lCity} : [${shortZoneName}] : ${fullZoneName} : ${timeInfo}`);
            });
        });
    }
    console.timeEnd(`search-time`);
}

program
    .command('city <task>')
    .description('Enter a City name to find closest timezone')
    .action(citySearch)

program.parse();