#! /usr/bin/env node

import chalk from 'chalk';
import {
    program
} from 'commander';


import {
    getCityInfo
} from './clean-data.mjs'


async function citySearch(city) {
    console.log(chalk.red.bold(`City we are searching for ${city}`))
    return await getCityInfo(city);
}

program
    .command('city <task>')
    .description('Enter a City name to find closest timezone')
    .action(citySearch)

program.parse();