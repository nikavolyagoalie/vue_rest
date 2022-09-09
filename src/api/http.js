import axios from 'axios'

export const POST = axios.create({
    baseURL: `https://api.sitemap-generator.ru/test-api/`,
    headers: {
        'Content-type': 'application/json',
        "X-Application-Token": "wefiEFv_dwDEvf-12Veda_feadvkJbBgh831",
    }
})

export const GET = axios.create({
    baseURL: `https://api.sitemap-generator.ru/test-api/`,
    headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer 3c5419cc-b1d4-49d3-a2ad-28846762311d",
    },
})

export const PATCH = axios.create({
    baseURL: `https://api.sitemap-generator.ru/test-api/`,
    headers: {
        'Content-type': 'application/json',
        'Authorization': "Bearer 3c5419cc-b1d4-49d3-a2ad-28846762311d",
    },
})