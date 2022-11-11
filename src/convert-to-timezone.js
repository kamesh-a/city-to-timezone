const {
    format,
    formatInTimeZone,
    getTimezoneOffset,
    toDate,
    zonedTimeToUtc,
    utcToZonedTime
} = require('date-fns-tz');

function getShortName(timeZoneAbbrevation) {
    if( timeZoneAbbrevation && timeZoneAbbrevation.includes(' ')) {
        return timeZoneAbbrevation.split(' ').reduce((a,c) => {
            return a+c.charAt(0);
        },'').toUpperCase();
    }
}

function convertToTimeZone(timeZoneArrList, print=true) {
    const zones = [...timeZoneArrList];
    const date = new Date();
    const format = 'HH:mm:ss [zzzz]';
    const results = zones.map(zone => {
        return {
            zone,
            time: formatInTimeZone(date, zone, format),
            stz: getShortName(formatInTimeZone(date, zone, 'zzzz'))
        }
    });

    if( print ) {
        results.forEach( tzObj => {
            console.log(`Zone : [${tzObj.zone}] => [${tzObj?.stz ?? 'Not Found'}] ${tzObj.time}`);
        });
    }
    return results;
}

// convertToTimeZone([
//     "Europe/London", 
//     "America/New_York", 
//     "America/Los_Angeles", 
//     "Pacific/Auckland",
//     "Australia/Lord_Howe",
//     "Asia/Barnaul",
//     "Africa/Casablanca"
// ]);

module.exports = {
    convertToTimeZone
}