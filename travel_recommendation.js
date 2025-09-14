const searchInput = document.getElementById('searchInput').value;
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const api_url = './travel_recommendation_api.json';

fetch(api_url)
.then(response => response.json())
.then()
