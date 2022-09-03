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
  console.log(catagoriesData);

  // sorting catagories name
  catagoriesData.sort(function (property1, property2) {
    if (property1.category_name < property2.category_name) {
      return -1;
    }
    if (property1.category_name > property2.category_name) {
      return 1;
    }
    return 0;
  });

  // news catagories
  const newCatagories = document.getElementById("news-catagories");

  catagoriesData.forEach((catagories) => {
    // console.log(catagories);
    const catagoriesItems = document.createElement("div");
    catagoriesItems.classList.add("active");

    catagoriesItems.innerHTML = `
    <span class="p-2 fs-6 text-uppercase d-inline" onclick="getIdSingleNewsDetails('${catagories.category_id}')">${catagories.category_name}</span>
    
    `;
    newCatagories.appendChild(catagoriesItems);
  });

  // active catatories items
  // const newCatagoriesChild = newCatagories.childNodes;
  // console.log(newCatagoriesChild);

  // newCatagoriesChild.forEach((items) => {
  //   const activeColor = (isColor) => {
  //     if (isColor) {
  //       items.addEventListener("click", function onClick(event) {
  //         event.target.style.color = "red";
  //       });
  //     } else {
  //       items.addEventListener("click", function onClick(event) {
  //         event.target.style.color = "green";
  //       });
  //     }
  //   };
  //   return activeColor(false);
  // return activeColor(true);
  // });
};

// catch catagories news id
const getIdSingleNewsDetails = async (catagoriesId) => {
  // start loading spinner
  loadingSpinner(true);

  try {
    const url = `https://openapi.programming-hero.com/api/news/category/${catagoriesId}`;

    const response = await fetch(url);
    const singleData = await response.json();
    newsSingleDataShow(singleData.data);
  } catch (e) {
    console.log(e);
  }
};

// isloading function
const loadingSpinner = (isLoading) => {
  const loading = document.getElementById("loading-spinner");
  if (isLoading) {
    loading.style.display = "block";
  } else {
    loading.style.display = "none";
  }
};

// single news data showing
const newsSingleDataShow = (singleData) => {
  // sorting
  singleData.sort((property1, property2) => {
    return property2.total_view - property1.total_view;
  });

  // single data length or total news check
  const dataLength = singleData.length;

  // total news count
  const totalNewsFound = document.getElementById("total-news-found");
  if (dataLength === 0) {
    totalNewsFound.innerText = "News not found.";
  } else {
    totalNewsFound.innerText = dataLength + " News found";
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
          <span><strong>${
            news.total_view ? news.total_view : "No data avilable"
          }M</strong></span>
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
        <button class="btn btn-primary my-3" type="button"data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="newDetailsModal('${
          news._id
        }')">
          More details <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </article>
  </div>
    `;

    allNewsArea.appendChild(createEle);
  });

  // Stop loading spinner
  loadingSpinner(false);
};

const newDetailsModal = async (code) => {
  try {
    const url = `https://openapi.programming-hero.com/api/news/${code}`;
    const response = await fetch(url);
    const data = await response.json();
    displayModalDetails(data.data);
  } catch (e) {
    console.log(e);
  }
};

const displayModalDetails = (displaySingleData) => {
  // modal wrap
  const modalWrap = document.getElementById("modal-dialog");
  modalWrap.innerHTML = ``;
  displaySingleData.map((data) => {
    const createEle = document.createElement("div");
    createEle.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title" id="exampleModalLabel">
          
        <!-- author -->
        <div class="author d-flex align-items-center my-3">
          <!-- user -->
          <div class="user mx-2">
            <img
              src="${data.author.img}"
              class="img-fluid"
              alt="author"
            />
          </div>
          <!-- user name -->
          <div class="author-name-date mx-2">
            <h5 class="fs-6 fw-bold p-0 m-0">${
              data.author.name ? data.author.name : "Author name not found"
            }</h5>
            <p class="fs-6 fw-light p-0 m-0">${data.author.published_date}</p>
          </div>
        </div>

        </div>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
      <img src="${data.image_url}" class="img-fluid"/>
      <h5 class="py-3">${data.title}</h5>
      <p>${data.details.slice(0, 250)}...</p>
      </div>
    </div>
  `;
    modalWrap.appendChild(createEle);
  });
};

// default news
getIdSingleNewsDetails("01");
// catagories Name function  calling
catagoriesName();
