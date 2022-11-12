const {
    formatInTimeZone
} = require('date-fns-tz');

function getShortName(timeZoneAbbrevation) {
    if( timeZoneAbbrevation && timeZoneAbbrevation.includes(' ')) {
        return timeZoneAbbrevation.split(' ').reduce((a,c) => {
            return a+c.charAt(0);
        },'').toUpperCase();
    }
}

/**
 * Convert a specific date to a particular timezone.
 * @param {*} timeZoneArrList = ["Europe/London", "America/New_York", ...]
 * @param {*} print = Should we print the result set
 * @param {*} date = Provide date in case server based timezone
 * @returns 
 */
function convertToTimeZone(timeZoneArrList, print=true, date = new Date()) {
    const zones = [...timeZoneArrList];
    const format = 'yyyy-MM-dd hh:mm:ss aaa [zzzz]';
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