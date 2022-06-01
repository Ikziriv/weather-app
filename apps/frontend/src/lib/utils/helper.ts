import { conditions } from "$utils/condition";
import { getHoursFromTime } from "$utils/date";

// go through all possible conditions and get the fitting according to the weather code
export function getSymbol (code, hours, astro) {
    for (const condition in conditions) {
        if (conditions[condition].includes(code)) {
            if (hours < parseInt(getHoursFromTime(astro.sunrise)) || hours > parseInt(getHoursFromTime(astro.sunset)) + 12) { // return available night icons if it's night
                switch (condition) {
                    case "sun":
                        return "night sun"
                    case "partly cloudy":
                        return "night partly cloudy"
                    case "cloudy":
                        return "night cloudy"
                    default:
                        return condition;
                }
            }
            return condition;
        }
    }
}
