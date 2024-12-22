// export const SERVERURL = "http://192.168.1.4:3001"

// export const SERVERURL = "https://c99-healthometer.up.railway.app"
export const SERVERURL = process.env.NODE_ENV === 'production' ?
    "https://healthometer.up.railway.app" :
    "https://c99-healthometer.up.railway.app"
//never give / after URL