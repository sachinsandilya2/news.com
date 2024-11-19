const apiKey = "be87dcd78e816ba00783bdf2e85a8d20"; // Your GNews API key
const url = `https://gnews.io/api/v4/top-headlines?lang=hi&token=${apiKey}`;

const newsContainer = document.getElementById("news-container");

// Fetch Hindi news from GNews API
fetch(url)
  .then(response => {
    if (!response.ok) {
      // Handle HTTP error, especially 403 (Access Denied)
      if (response.status === 403) {
        newsContainer.innerHTML = "<p>Access denied to GNews API. Please check the API key or subscription.</p>";
      } else {
        throw new Error(`GNews API Error! status: ${response.status}`);
      }
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Log the full API response to the console for debugging

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No Hindi news found from GNews.</p>";
    } else {
      newsContainer.innerHTML = ""; // Clear any previous content

      // Loop through each article and display it
      data.articles.forEach(article => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        // Create HTML structure for the article
        newsItem.innerHTML = `
          <h2>${article.title}</h2>
          <img src="${article.image || 'https://via.placeholder.com/600x400'}" alt="News Image" />
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read More</a>
        `;

        // Append the news item to the container
        newsContainer.appendChild(newsItem);
      });
    }
  })
  .catch(error => {
    console.error("Error fetching news from GNews:", error);
    newsContainer.innerHTML = `<p>Failed to load GNews articles. Error: ${error.message}</p>`;
  });
