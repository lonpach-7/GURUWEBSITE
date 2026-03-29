const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY";

const postsContainer = document.getElementById("posts");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let posts = [];
let filteredPosts = [];
let currentPage = 1;
const postsPerPage = 6;

async function fetchPosts() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?select=*`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    posts = await res.json();
    filteredPosts = posts;
    renderPosts();
  } catch (err) {
    console.error("Error fetching posts:", err);
  }
}

function renderPosts() {
  postsContainer.innerHTML = "";

  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  const pagePosts = filteredPosts.slice(start, end);

  pagePosts.forEach(post => {
    const card = document.createElement("div");
    card.className = "post-card";

    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}">
      <div class="post-content">
        <div class="post-title">${post.title}</div>
        <div class="post-meta">By ${post.author} • ${new Date(post.date).toDateString()}</div>
        <div class="post-excerpt">${post.excerpt}</div>
        <a class="read-btn" href="post.html?id=${post.id}">Read More</a>
      </div>
    `;

    postsContainer.appendChild(card);
  });
}

function applyFilters() {
  const keyword = searchInput.value.toLowerCase();
  const category = categoryFilter.value;

  filteredPosts = posts.filter(post => {
    const matchKeyword =
      post.title.toLowerCase().includes(keyword) ||
      post.excerpt.toLowerCase().includes(keyword);

    const matchCategory = !category || post.category === category;

    return matchKeyword && matchCategory;
  });

  currentPage = 1;
  renderPosts();
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage * postsPerPage < filteredPosts.length) {
    currentPage++;
    renderPosts();
  }
});

fetchPosts();