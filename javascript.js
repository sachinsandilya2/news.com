const apiKey = "be87dcd78e816ba00783bdf2e85a8d20"; // Your GNews API key
const url = `https://gnews.io/api/v4/top-headlines?lang=hi&token=${apiKey}`;

const newsContainer = document.getElementById("news-container");

// Fetch Hindi news from GNews API
fetch(url)
  .then(response => {
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Access denied! Please check your API key or subscription plan.");
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("GNews API Response:", data);

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No Hindi news found from GNews.</p>";
    } else {
      newsContainer.innerHTML = ""; // Clear any previous content

      data.articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        newsItem.innerHTML = `
          <h2>${article.title}</h2>
          <img src="${article.image || 'https://via.placeholder.com/600x400'}" alt="News Image" />
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;

        newsContainer.appendChild(newsItem);
      });
    }
  })
  .catch(error => {
    console.error("Error fetching news from GNews:", error);
    newsContainer.innerHTML = `<p>Error loading news: ${error.message}</p>`;
  });
