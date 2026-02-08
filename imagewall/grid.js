let useArchivedImages = true;
const ndjsonFile = "../posts.ndjson";

let allPosts = [];
let hoveredPost = null;
let selectedPost = null;

fetch(ndjsonFile)
  .then((res) => res.text())
  .then((text) => {
    allPosts = parseNDJSON(text);
    renderGrid(allPosts);
  });

function parseNDJSON(text) {
  const lines = text.trim().split(/\r?\n/);

  return lines
    .map((line) => {
      const raw = JSON.parse(line);
      const data = raw.data || {};

      const imageUrl =
        data.image_versions2?.candidates?.[0]?.url ||
        data.carousel_media?.[0]?.image_versions2?.candidates?.[0]?.url ||
        null;

      if (!imageUrl) return null;

      return {
        id: data.id,
        code: data.code,
        username: data.user?.username || "unknown",
        fullName: data.user?.full_name || "—",
        caption: data.caption?.text || "",
        following: data.user?.friendship_status?.following || false,
        isPaidPartnership: data.is_paid_partnership || false,
        likeCount: data.like_count || 0,
        commentCount: data.comment_count || 0,
        datePosted: data.taken_at ? new Date(data.taken_at * 1000) : null,
        dateCaptured: new Date(), // when YOUR tool loaded it
        thumbnailUrl: imageUrl,
        displayUrl: imageUrl,
        annotation1: "",
        annotation2: "",
      };
    })
    .filter(Boolean);
}

document.getElementById("fileInput").addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      const text = e.target.result;

      // Parse depending on format
      if (file.name.endsWith(".ndjson")) {
        allPosts = parseNDJSON(text);
      } else {
        return null;
      }

      console.log("Loaded", allPosts.length, "posts from local file");

      resetVisualization();      // clear old DOM elements
      useArchivedImages = false; // set this to false since new file likely isn't archived

      renderGrid(allPosts);
      //initializeVisualization(); // rebuild using new posts

    } catch (err) {
      console.error("Failed to parse file:", err);
      alert("Error reading file. Make sure it's valid NDJSON or JSON.");
    }
  };

  reader.readAsText(file);
}

function resetVisualization() {
  // For grid layout
  const grid = document.getElementById("grid");
  if (grid) grid.innerHTML = "";

  // // For scatter layout
  // const scatter = document.getElementById("scatterArea");
  // if (scatter) scatter.innerHTML = "";

  // Clear detail panel if needed
  const detail = document.getElementById("detailView");
  if (detail) detail.innerHTML = "<p>Select a post to view details</p>";
}

function formatDate(date) {
  if (!date) return "—";
  return date.toLocaleString();
}

function renderGrid(posts) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  posts.forEach((post) => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.id = post.id;

    if (selectedPost && selectedPost.id === post.id) {
      tile.classList.add("selected");
    }

    const img = document.createElement("img");
    img.src = useArchivedImages ? `images/${post.id}.jpg` : post.thumbnailUrl;

    tile.appendChild(img);

    tile.addEventListener("mouseenter", () => {
      hoveredPost = post;
      renderDetail(post);
    });

    tile.addEventListener("mouseleave", () => {
      hoveredPost = null;
      if (selectedPost) renderDetail(selectedPost);
    });

    tile.addEventListener("click", () => {
      selectedPost = post;
      updateSelectionOutline();
      renderDetail(post);
    });

    grid.appendChild(tile);
  });
  updatePostCounter(allPosts, "all");
}

function updateSelectionOutline() {
  document.querySelectorAll(".tile").forEach((t) => {
    t.classList.remove("selected");
    if (selectedPost && t.dataset.id === selectedPost.id) {
      t.classList.add("selected");
    }
  });
}

document.getElementById("filterSelect").addEventListener("change", (e) => {
  const value = e.target.value;
  let filtered = allPosts;

  if (value === "following") filtered = allPosts.filter((p) => p.following);
  if (value === "nonfollowing") filtered = allPosts.filter((p) => !p.following);

  renderGrid(filtered);
    updatePostCounter(filtered, value);

});

function renderDetail(post) {
  const detail = document.getElementById("detailView");
  detail.innerHTML = "";

  const postUrl = `https://www.instagram.com/p/${post.code}/`;

  const link = document.createElement("a");
  link.href = postUrl;
  link.target = "_blank";

  const img = document.createElement("img");
  img.className = "detailImage";
  img.src = useArchivedImages ? `images/${post.id}.jpg` : post.displayUrl;

  link.appendChild(img);
  detail.appendChild(link);

  const meta = document.createElement("div");
  meta.className = "metaBlock";

  meta.appendChild(makeField("Username", post.username));
  meta.appendChild(makeField("Full Name", post.fullName));
  meta.appendChild(makeField("Caption", post.caption));
  meta.appendChild(makeField("Likes", post.likeCount));
  meta.appendChild(makeField("Comments", post.commentCount));
  meta.appendChild(makeField("Following", post.following));
  meta.appendChild(makeField("Paid Partnership", post.isPaidPartnership));
  meta.appendChild(makeField("Date Posted", formatDate(post.datePosted)));
  meta.appendChild(makeField("Date Captured", formatDate(post.dateCaptured)));

  meta.appendChild(makeAnnotationField("Annotation 1", post, "annotation1"));
  meta.appendChild(makeAnnotationField("Annotation 2", post, "annotation2"));

  detail.appendChild(meta);
}

function makeField(label, value) {
  const wrapper = document.createElement("p");

  const title = document.createElement("strong");
  title.textContent = label;

  const br = document.createElement("br");

  const content = document.createElement("span");
  content.textContent = value ?? "—";

  wrapper.appendChild(title);
  wrapper.appendChild(br);
  wrapper.appendChild(content);

  return wrapper;
}

function makeAnnotationField(label, post, key) {
  const wrapper = document.createElement("p");

  const title = document.createElement("strong");
  title.textContent = label;

  const br = document.createElement("br");

  const input = document.createElement("textarea");
  input.value = post[key] || "";
  input.rows = 2;
  input.style.width = "100%";

  input.addEventListener("input", () => {
    post[key] = input.value;
  });

  wrapper.appendChild(title);
  wrapper.appendChild(br);
  wrapper.appendChild(input);

  return wrapper;
}

document.getElementById("exportBtn").addEventListener("click", () => {
  const dataStr = JSON.stringify(allPosts, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "annotated_posts.json";
  a.click();

  URL.revokeObjectURL(url);
});

function updatePostCounter(posts, filterMode) {
  const el = document.getElementById("postCounter");
  const count = posts.length;

  if (filterMode === "following") {
    el.textContent = `${count} posts by accounts followed by user`;
  } else if (filterMode === "nonfollowing") {
    el.textContent = `${count} suggested posts`;
  } else {
    el.textContent = `Total posts: ${count}`;
  }
}