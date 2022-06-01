import { getTimeFromDate } from '$utils/date'
import { imageResolver } from '$utils/url-resolver'

export async function get(event: { url: { searchParams: any; }; }) {
    const { searchParams } = event.url
    const query = searchParams.get('q')

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY
        }
    };

    // const url = `http://localhost:3000/api/test`;
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${query}&days=3`
    let weather
    let response
    try {
        response = await fetch(url, options);
        weather = await response.json();
        const { location, current, forecast: { forecastday } } = weather
        const { name, region, country, localtime_epoch } = location
        const { temp_c, condition, is_day } = current
        const { text, code } = condition
        const [today, tomorrow, afterTomorrow] = forecastday
        const { day: { maxtemp_c }, day: { mintemp_c } } = today
        const body = {
            today: {
                temp: Math.round(temp_c),
                maxtemp_c: Math.round(maxtemp_c),
                mintemp_c: Math.round(mintemp_c),
                name: `${name}, ${region} - ${country}`,
                date: getTimeFromDate(localtime_epoch),
                image_src: imageResolver(code, is_day),
                condition: text,
            },
            tomorrow: {
                date: getTimeFromDate(tomorrow.date_epoch),
                image_src: imageResolver(
                    tomorrow.day.condition.code,
                    true
                ),
                condition: tomorrow.day.condition.text,
                temp: Math.round(tomorrow.day.avgtemp_c)
            },
            afterTomorrow: {
                date: getTimeFromDate(afterTomorrow.date_epoch),
                image_src: imageResolver(
                    afterTomorrow.day.condition.code,
                    true
                ),
                condition: afterTomorrow.day.condition.text,
                temp: Math.round(afterTomorrow.day.avgtemp_c)
            }
        }
        return {
            status: 200,
            body
        }

    } catch (error) {
        return {
            // status: response.status,
            status: 400,
            body: {
                message: weather.error?.message
            }
        }
    }

};