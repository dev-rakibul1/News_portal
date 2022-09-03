const catagoriesName = async () => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const response = await fetch(url);
    const data = await response.json();
    catagoriesDisplay(data.data.news_category);
  } catch (e) {
    console.log(e);
  }
};

// catagories data
const catagoriesDisplay = (catagoriesData) => {
  // news catagories
  const newCatagories = document.getElementById("news-catagories");

  catagoriesData.forEach((catagories) => {
    const catagoriesItems = document.createElement("div");
    // catagoriesItems.classList.add("catagories-items");

    catagoriesItems.innerHTML = `
    <span class="p-2 fs-6 text-uppercase d-inline">${catagories.category_name}</span>
    `;
    newCatagories.appendChild(catagoriesItems);
  });
};

// catagories Name function  calling
catagoriesName();
