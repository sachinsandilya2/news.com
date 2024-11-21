const apiKey = "7bb094d75be303811394480259643235";
const apiUrl = `https://gnews.io/api/v4/top-headlines?country=in&token=${apiKey}`;
const newsContainer = document.getElementById("news-container");

async function fetchNews() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        newsContainer.innerHTML = `
            <p style="color: red;">Failed to load news. Please try again later.</p>
        `;
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = ""; // Clear existing news
    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = `<p>No news available at the moment.</p>`;
        return;
    }
    articles.forEach((article) => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
            <img src="${article.image || 'https://via.placeholder.com/300'}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

// Fetch news on page load
fetchNews();
