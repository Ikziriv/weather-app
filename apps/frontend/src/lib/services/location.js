import { browser } from '$app/env';

const getGeolocation = () => {
    return new Promise((resolve, reject) => {
        if (browser) {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords
                        resolve({
                            latitude,
                            longitude
                        })
                    },
                    (error) => {
                        reject({ message: error.message })
                    }, { enableHighAccuracy: true })
            }
        }
    })
}

export {
    getGeolocation
}