const sidebar = document.querySelector(".sidebar");
const openSidebar = document.querySelector(".openSidebar");
const closeSidebar = document.querySelector(".closeSidebar");
const nav = document.querySelector("#navbar");
const allArtical = document.querySelector(".allArtical");
const videos = document.querySelectorAll("video");
const second = document.querySelector(".second");

// Sidebar toggle logic
openSidebar.addEventListener("click", () => {
  sidebar.classList.add("active");
  closeSidebar.style.background = "rgba(91, 112, 131, 0.4)";
  closeSidebar.classList.add("active");
  nav.style.zIndex = "-100";
  videos.forEach((v) => {
    v.style.zIndex = "-1000"; // Lower z-index
  });
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
  closeSidebar.style.background = "transparent";
  closeSidebar.classList.remove("active");
  nav.style.zIndex = "100";
  setTimeout(() => {
    videos.forEach((v) => {
      v.style.zIndex = "1000"; // Reset z-index
    });
  }, 500);
});

const originalArticles = Array.from(allArtical.children);
let totalArticles = originalArticles.length;
let isLoading = false; // Flag to prevent multiple scroll event triggers

// Function to add more articles with delay between each article
const addArticles = () => {
  const articlesToAdd = 5; // Add 5 articles at a time

  for (let i = 0; i < articlesToAdd; i++) {
    const newArticle =
      originalArticles[i % originalArticles.length].cloneNode(true);
    totalArticles++;

    // Apply a delay to each new article being added
    // setTimeout(() => {
    allArtical.appendChild(newArticle);
    // }, 1000 * i); // Increase delay for each article
  }
};

// Function to check if the last article is near the bottom
const checkScrollPosition = () => {
  const lastArticle = allArtical.lastElementChild; // Get the last article in the container
  const lastArticleBottom = lastArticle.offsetTop + lastArticle.offsetHeight; // Get the bottom position of the last article
  const containerBottom = second.scrollTop + second.clientHeight;

  // If the last article is near the bottom and we are not already loading, load more articles
  if (lastArticleBottom <= containerBottom + 50 && !isLoading) {
    isLoading = true;
    addArticles();

    // Reset the isLoading flag after a delay (ensuring articles are added with delay)
    setTimeout(() => {
      isLoading = false;
    }, 1000 * 3); // Reset after all articles are added (adjust as needed)
  }
};

// Scroll event listener on the container
second.addEventListener("scroll", () => {
  checkScrollPosition();
});
