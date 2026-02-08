const useArchivedImages = true;
const ndjsonFile = "posts.ndjson";

let allPosts = [];
let hoveredPost = null;
let selectedPost = null;

fetch(ndjsonFile)
  .then(res => res.text())
  .then(text => {
    const lines = text.trim().split(/\r?\n/);

    allPosts = lines.map(line => {
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
        caption: data.caption?.text || "",
        following: data.user?.friendship_status?.following || false,
        isPaidPartnership: data.is_paid_partnership || false,
        likeCount: data.like_count || 0,
        commentCount: data.comment_count || 0,
        thumbnailUrl: imageUrl,
        displayUrl: imageUrl,
        annotation1: "",
        annotation2: ""
      };
    }).filter(Boolean);

    renderGrid(allPosts);
  });

function renderGrid(posts) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  posts.forEach(post => {
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.dataset.id = post.id;

    if (selectedPost && selectedPost.id === post.id) {
      tile.classList.add("selected");
    }

    const img = document.createElement("img");
    img.src = useArchivedImages
      ? `images/${post.id}.jpg`
      : post.thumbnailUrl;

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
}

function updateSelectionOutline() {
  document.querySelectorAll(".tile").forEach(t => {
    t.classList.remove("selected");
    if (selectedPost && t.dataset.id === selectedPost.id) {
      t.classList.add("selected");
    }
  });
}

document.getElementById("filterSelect").addEventListener("change", e => {
  const value = e.target.value;
  let filtered = allPosts;

  if (value === "following") filtered = allPosts.filter(p => p.following);
  if (value === "nonfollowing") filtered = allPosts.filter(p => !p.following);

  renderGrid(filtered);
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
  img.src = useArchivedImages
    ? `images/${post.id}.jpg`
    : post.displayUrl;

  link.appendChild(img);
  detail.appendChild(link);

  const meta = document.createElement("div");
  meta.className = "metaBlock";

  meta.appendChild(makeField("Username", post.username));
  meta.appendChild(makeField("Caption", post.caption));
  meta.appendChild(makeField("Likes", post.likeCount));
  meta.appendChild(makeField("Comments", post.commentCount));
  meta.appendChild(makeField("Following", post.following));
  meta.appendChild(makeField("Paid Partnership", post.isPaidPartnership));

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
