export const imageResolver = (code, is_day) => {
    if ([1273, 1276].includes(code)) {//Thunderstorm
        return is_day ?
            'https://res.cloudinary.com/gonguru/image/upload/v1653277438/medium_200d_bac686bc00.png'
            :
            'https://res.cloudinary.com/gonguru/image/upload/v1653277335/medium_200n_03b06bce73.png'
    } else if ([1087].includes(code)) {//Thunder
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653277001/medium_210_fcde4cfea3.png'
    } else if ([1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1240].includes(code)) {//Light Rain
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653277000/medium_300_55d7def738.png'
    } else if ([1063, 1192, 1195, 1198, 1243, 1246].includes(code)) {//Rain
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653276972/medium_310_ee790d2eca.png'
    } else if ([1222, 1225].includes(code)) {//Snow
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653277320/medium_600_63a8ecb20f.png'
    } else if ([1207, 1237, 1252, 1261, 1264].includes(code)) {//Sleet
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653277006/medium_611_307b5768cf.png'
    } else if ([1204, 1249].includes(code)) {//Light Sleet
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653277323/medium_612_36c7ca8009.png'
    } else if ([1210, 1213, 1216, 1219, 1255, 1258].includes(code)) {//Snow w rain
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653277347/medium_615_b1ab1bdc70.png'
    } else if ([1030, 1135, 1147].includes(code)) {//Mist and others
        return is_day ?
            'https://res.cloudinary.com/gonguru/image/upload/v1653277334/medium_700d_a7ea879c54.png'
            :
            'https://res.cloudinary.com/gonguru/image/upload/v1653277423/medium_700n_2940f6cc8c.png'
    } else if (code === 1000) {//Clear
        return is_day ?
            'https://res.cloudinary.com/gonguru/image/upload/v1653277413/medium_800d_ceea57bcf0.png'
            :
            'https://res.cloudinary.com/gonguru/image/upload/v1653277415/medium_800n_579b09b3ea.png'
    } else if (code === 1009) {//Cloud only
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653352371/medium_122_c1dc4a0de0.png'
    } else if ([1003, 1006].includes(code)) {//Cloudy
        return is_day ?
            'https://res.cloudinary.com/gonguru/image/upload/v1653277452/medium_801d_02b2d4847e.png'
            :
            'https://res.cloudinary.com/gonguru/image/upload/v1653277423/medium_801n_f4c7ffe560.png'
    } else if ([1066, 1072, 1201, 1168, 1171, 1198].includes(code)) {//Freeze rain/snow
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653352383/medium_179_ff2865094d.png'
    } else if ([1279, 1282].includes(code)) {//Snow w thunder
        return 'https://res.cloudinary.com/gonguru/image/upload/v1653352379/medium_392_bfaa0f00ca.png'
    }
}