const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultsContainer = document.getElementById('searchResultContainer');
const api_url = './travel_recommendation_api.json';


function startSearch(){
    resultsContainer.style.display = "flex";
    const keyword = searchInput.value.toLowerCase();
    if (!keyword) {
        resultsContainer.innerHTML = '<p>Please enter a search item!</p>';
        resultsContainer.style.height = "45px";
        resultsContainer.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        resultsContainer.style.borderRadius = "25px";
        resultsContainer.style.border = "2px solid rgba(80, 73, 148, 1)";
        return;
    }
    fetch(api_url)
    .then(response => {
        if(!response.ok) {
            throw new Error("Error" + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        let results = [];
        if (keyword === "country" || keyword === 'countries') {
            results = data.countries.flatMap(country => country.cities);
        } else if (keyword === "temple" || keyword === "temples") {
            results = data.temples;
        } else if (keyword === "beach" || keyword === "beaches") {
            results = data.beaches;
        } else {
            resultsContainer.innerHTML = `<p> ${keyword} is not found!</p>`;
            resultsContainer.style.height = "45px";
            resultsContainer.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
            resultsContainer.style.borderRadius = "25px";
            resultsContainer.style.border = "2px solid rgba(80, 73, 148, 1)";
            return;
        }

        displayResults(results);
    })
    .catch(error => {
        console.error("There has been an error with your fetch operation:", error);
        resultsContainer.innerHTML = "<p>Something went wrong</p>";
        resultsContainer.style.height = "45px";
        resultsContainer.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        resultsContainer.style.borderRadius = "25px";
        resultsContainer.style.border = "2px solid rgba(80, 73, 148, 1)";
    });
}
function displayResults(results) {
    resultsContainer.style.height = "";
    resultsContainer.style.backgroundColor = "";
    resultsContainer.style.borderRadius = "";
    resultsContainer.style.border = "";
    resultsContainer.innerHTML = results.map(item => `<div class = "searchResult">
                                                        <h2>${item.name}</h2>
                                                        <p>${item.description}</p>
                                                        <img src = "${item.imageUrl}" width = "300px" class = "searchImg">
                                                    </div>`).join('');
}

searchBtn.addEventListener('click', startSearch);
clearBtn.addEventListener('click', ()=>{searchInput.value="";resultsContainer.style.display="none"});
document.addEventListener('click', (event) => {
    if(!searchInput.contains(event.target) && !searchBtn.contains(event.target) && !resultsContainer.contains(event.target)) {
        searchInput.value="";resultsContainer.style.display="none";
    }
});
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter"){
        startSearch();
    }
});
