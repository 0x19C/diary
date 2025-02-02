// export const API_SERVER_URL = 'http://192.168.30.129:8000/api'
export const API_SERVER_URL = typeof window === 'undefined' ?
    process.env.NEXT_PUBLIC_INTER_BACKEND_API_URL
    :
    process.env.NEXT_PUBLIC_BACKEND_API_URL;