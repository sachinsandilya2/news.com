const apiKey = "d6248ae2c11f4fcd9dca203b7f879a64";
const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
const newsContainer = document.getElementById("news-container");

// Function to fetch news
async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error:", error);
        newsContainer.innerHTML = `<p style="color: red;">Failed to load news. Please try again later.</p>`;
    }
}

// Function to display news
function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear previous news
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
