const NDJSON_FILE = "posts.ndjson";
const IMAGE_FOLDER = "images/";

let allPosts = [];
let filteredPosts = [];
let focusedPost = null;
let hoveredPost = null;

const grid = document.getElementById("imageGrid");
const filterSelect = document.getElementById("filterSelect");
const largeImage = document.getElementById("largeImage");
const instaLink = document.getElementById("instaLink");
const postDetails = document.getElementById("postDetails");
const annotation1Input = document.getElementById("annotation1");
const annotation2Input = document.getElementById("annotation2");
const saveButton = document.getElementById("saveAnnotations");
const annotationsPanel = document.getElementById("annotations");

async function loadNDJSON() {
  const res = await fetch(NDJSON_FILE);
  const text = await res.text();
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  allPosts = lines.map((line) => JSON.parse(line));
  applyFilter();
}

function applyFilter() {
  const value = filterSelect.value;

  filteredPosts = allPosts.filter((p) => {
    const data = p.data || {};
    const user = data.user || {};
    const following = user.friendship_status?.following;
    const sponsored = data.is_paid_partnership === true;

    if (value === "nonfollowed") return following === false;
    if (value === "followed") return following === true;
    if (value === "sponsored") return sponsored;
    return true;
  });

  renderGrid();
}

function renderGrid() {
  grid.innerHTML = "";

  filteredPosts.forEach((post) => {
    const postId = post.data?.id;
    if (!postId) return;

    const cell = document.createElement("div");
    cell.className = "gridCell";

    const img = document.createElement("img");
    img.src = IMAGE_FOLDER + postId + ".jpg";
    img.alt = postId;

    cell.appendChild(img);

    cell.addEventListener("mouseenter", () => {
      hoveredPost = post;
      updateRightPanel();
    });

    cell.addEventListener("mouseleave", () => {
      hoveredPost = null;
      updateRightPanel();
    });

    cell.addEventListener("click", () => {
      focusedPost = post;
      document
        .querySelectorAll(".gridCell")
        .forEach((c) => c.classList.remove("focused"));
      cell.classList.add("focused");
      loadAnnotations();
      updateRightPanel();
    });

    grid.appendChild(cell);
  });
}

function updateRightPanel() {
    annotationsPanel.style.display = "block";
  const post = hoveredPost || focusedPost;
  if (!post) return;

  const data = post.data;
  console.log(data);
  const user = data.user || {};
  const postUrl = 'https://www.instagram.com/p/'+data.code;

  instaLink.href = postUrl;

  largeImage.src = IMAGE_FOLDER + data.id + ".jpg";

  const takenAt = new Date(data.taken_at * 1000);
  const collectedAt = new Date(post.timestamp_collected);

  const summary =
    "<strong>Username:</strong>\n" +
    user.username +
    "\n\n" +
    "<strong>Full name: </strong>\n" +
    user.full_name +
    "\n\n" +
    "<strong>Caption text: </strong>\n" +
    (data.caption?.text || "") +
    "\n\n" +
    "<strong>Like count: </strong>\n" +
    data.like_count +
    "\n\n" +
    "<strong>Comment count: </strong>\n" +
    data.comment_count +
    "\n\n" +
    "<strong>Following: </strong>\n" +
    user.friendship_status?.following +
    "\n\n" +
    "<strong>Paid partnership: </strong>\n" +
    data.is_paid_partnership +
    "\n\n" +
    "<strong>Post created: </strong>\n" +
    takenAt.toString() +
    "\n\n" +
    "<strong>Post captured: </strong>\n" +
    collectedAt.toString();

  postDetails.innerHTML = summary;
}

function loadAnnotations() {
  const ann = focusedPost.annotations || {};
  annotation1Input.value = ann.annotation1 || "";
  annotation2Input.value = ann.annotation2 || "";
}

annotation1Input.addEventListener("input", () => {
  if (!focusedPost) return;
  if (!focusedPost.annotations) focusedPost.annotations = {};
  focusedPost.annotations.annotation1 = annotation1Input.value;
});

annotation2Input.addEventListener("input", () => {
  if (!focusedPost) return;
  if (!focusedPost.annotations) focusedPost.annotations = {};
  focusedPost.annotations.annotation2 = annotation2Input.value;
});

saveButton.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(allPosts, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "annotated_posts.json";
  a.click();
  URL.revokeObjectURL(url);
});

filterSelect.addEventListener("change", applyFilter);

loadNDJSON();
