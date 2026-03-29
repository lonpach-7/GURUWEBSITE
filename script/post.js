const SUPABASE_URL = "lpmyxhwtcysntlhxpiry.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbXl4aHd0Y3lzbnRsaHhwaXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NTIzNDgsImV4cCI6MjA4OTAyODM0OH0.JPi5lnL3cBjGwkO7STYDft3Gk_4ZkYIIx0WvAQrQfVc";

const postTitle = document.getElementById("postTitle");
const postImage = document.getElementById("postImage");
const postMeta = document.getElementById("postMeta");
const postContent = document.getElementById("postContent");
const relatedPostsContainer = document.getElementById("relatedPosts");

function getPostId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function fetchPost() {
  const id = getPostId();

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?id=eq.${id}&select=*`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    const data = await res.json();
    const post = data[0];

    if (!post) return;

    postTitle.textContent = post.title;
    postImage.src = post.image;
    postMeta.textContent = `By ${post.author} • ${new Date(post.date).toDateString()}`;
    postContent.innerHTML = post.content;

    setupShare(post.title);

    fetchRelated(post.category, id);

  } catch (err) {
    console.error("Error loading post:", err);
  }
}

function setupShare(title) {
  const url = window.location.href;

  document.getElementById("shareTwitter").href =
    `https://twitter.com/intent/tweet?url=${url}&text=${title}`;

  document.getElementById("shareLinkedIn").href =
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;

  document.getElementById("shareFacebook").href =
    `https://www.facebook.com/sharer/sharer.php?u=${url}`;
}

async function fetchRelated(category, currentId) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/posts?category=eq.${category}&select=*`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });

    const posts = await res.json();

    const filtered = posts.filter(p => p.id != currentId).slice(0,3);

    relatedPostsContainer.innerHTML = "";

    filtered.forEach(post => {
      const card = document.createElement("div");
      card.className = "related-card";

      card.innerHTML = `
        <img src="${post.image}" alt="${post.title}">
        <div>
          <a href="post.html?id=${post.id}">${post.title}</a>
        </div>
      `;

      relatedPostsContainer.appendChild(card);
    });

  } catch (err) {
    console.error("Error loading related posts:", err);
  }
}

fetchPost();