const apiKey = "d6248ae2c11f4fcd9dca203b7f879a64";
const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
const newsContainer = document.getElementById("news-container");

// Function to fetch news
async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        newsContainer.innerHTML = `
            <p style="color: red;">Failed to load news. Retrying in 30 seconds...</p>
        `;
        // Retry fetching after 30 seconds
        setTimeout(fetchNews, 30000);
    }
}

// Function to display news
function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear previous news
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `<p style="color: gray;">No news available. Try again later.</p>`;
        return;
    }
    articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
            <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News Image">
            <h3>${article.title || "No title available"}</h3>
            <p>${article.description || "No description available"}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Auto-refresh news every 30 seconds
fetchNews(); // Initial fetch
setInterval(fetchNews, 30000); // Refresh news every 30 seconds
