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
    // console.log(catagories);
    const catagoriesItems = document.createElement("div");

    catagoriesItems.innerHTML = `
    <span class="p-2 fs-6 text-uppercase d-inline" onclick="getIdSingleNewsDetails('${catagories.category_id}')">${catagories.category_name}</span>
    
    `;
    newCatagories.appendChild(catagoriesItems);
  });
};

// catch catagories news id
const getIdSingleNewsDetails = async (catagoriesId) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${catagoriesId}`;

    const response = await fetch(url);
    const singleData = await response.json();
    newsSingleDataShow(singleData.data);
  } catch (e) {
    console.log(e);
  }
};

// single news data showing
const newsSingleDataShow = (singleData) => {
  // single data length or total news check
  const dataLength = singleData.length;
  const totalNewsItems = document.getElementById("total-news-items");
  if (dataLength === 0) {
    totalNewsItems.innerText = "";
    totalNewsItems.innerText = "No news found.";
  } else {
    totalNewsItems.innerText = "";
    totalNewsItems.innerText = dataLength;
  }

  // not found message
  const notFoundMeg = document.getElementById("not-found-meg");
  if (dataLength === 0) {
    notFoundMeg.style.display = "block";
  } else {
    notFoundMeg.style.display = "none";
  }

  // single news iterate
  const allNewsArea = document.getElementById("allNewsArea");
  allNewsArea.innerHTML = ``;
  singleData.forEach((news) => {
    const createEle = document.createElement("div");
    createEle.classList.add("row");
    createEle.innerHTML = `
    <div class="col-lg-4">
    <!-- news thumbnail -->
    <div class="new-thumbnail">
      <img
        src="${news.image_url}"
        class="img-fluid rounded"
        alt="news-thumbnail"
      />
    </div>
  </div>

  <!-- article -->
  <div class="col-lg-8">
    <article class="new-article">
      <h2 class="display-6 fs-3 fw-normal">
        ${news.title}
      </h2>
      <p>
       ${news.details.slice(0, 250)}...
      </p>

      <!-- author and some details -->
      <div
        class="author-details d-sm-flex justify-content-between py-4 align-items-center"
      >
        <!-- author -->
        <div class="author d-flex align-items-center my-3">
          <!-- user -->
          <div class="user mx-2">
            <img
              src="${news.author.img}"
              class="img-fluid"
              alt="author"
            />
          </div>
          <!-- user name -->
          <div class="author-name-date mx-2">
            <h5 class="fs-6 fw-bold p-0 m-0">${
              news.author.name ? news.author.name : "Author name not found"
            }</h5>
            <p class="fs-6 fw-light p-0 m-0">${news.author.published_date}</p>
          </div>
        </div>

        <!-- view -->
        <div class="views my-3">
          <i class="fa-regular fa-eye"></i>
          <span><strong>${news.rating.number}</strong></span>
        </div>

        <!-- rating -->
        <div class="rating my-3">
          <i class="fa-solid fa-star"></i
          ><i class="fa-solid fa-star"></i
          ><i class="fa-solid fa-star"></i
          ><i class="fa-solid fa-star"></i
          ><i class="fa-solid fa-star-half-stroke"></i>
        </div>

        <!-- read more btn -->
        <button class="btn btn-primary my-3">
          More details <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </article>
  </div>
    `;

    allNewsArea.appendChild(createEle);
  });
};

// default news
getIdSingleNewsDetails("01");
// catagories Name function  calling
catagoriesName();
