const apiKey = "4d701c11522ffe3682bec820fa5127aa"; // Updated GNews API key
const url = `https://gnews.io/api/v4/top-headlines?lang=hi&token=${apiKey}`;

const newsContainer = document.getElementById("news-container");

// Fetch Hindi news from GNews API
fetch(url)
  .then(response => {
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("Access Denied! Invalid API key or subscription limit reached.");
      } else if (response.status === 429) {
        throw new Error("Too Many Requests! Please wait before making more requests.");
      }
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("GNews API Response:", data);

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No Hindi news found. Try again later.</p>";
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
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = `<p>Error loading news: ${error.message}</p>`;
  });
