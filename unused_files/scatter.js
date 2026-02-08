const scatterArea = document.getElementById("scatterArea");
const detailView = document.getElementById("detailView");
const useArchivedImages = true;


let selectedTile = null;
let zCounter = 1;
let posts = [];

// load the data from the ndjson into a "posts" array

fetch("posts.ndjson")
  .then((res) => res.text())
  .then((text) => {
    const lines = text.trim().split("\n");

    posts = lines
      .map((line) => {
        const p = JSON.parse(line).data;

        return {
          id: p.id,
          code: p.code,
          username: p.user?.username ?? "unknown",
          caption: p.caption?.text ?? "",
          following: p.user?.friendship_status?.following ?? null,
          isPaidPartnership: p.is_paid_partnership ?? false,
          displayUrl: p.image_versions2?.candidates?.[0]?.url ?? null,

          // adding new fields for annotations:
          intensity: null,
          valence: null,
        };
      })
      // keep only posts with images
      .filter((p) => p.displayUrl)
      // filter only accounts that dataset user is NOT following
      .filter((p) => p.following === false);

    createTiles();
  });

/* ---------------- CREATE SCATTERED TILES ---------------- */

function createTiles() {
  const areaSize = scatterArea.getBoundingClientRect();
  const tileSize = 120;

  posts.forEach((post) => {
    const tile = document.createElement("img");
    //tile.src = post.displayUrl;
    tile.src = useArchivedImages
  ? `images/${post.id}.jpg`
  : post.thumbnailUrl;
    tile.className = "scatterTile";
    tile.id = post.id;

    tile.style.width = tileSize + "px";
    tile.style.height = tileSize + "px";
    tile.style.objectFit = "cover";
    tile.style.position = "absolute";
    tile.style.left = Math.random() * (areaSize.width - tileSize) + "px";
    tile.style.top = Math.random() * (areaSize.height - tileSize) + "px";
    tile.style.cursor = "grab";
    tile.style.border = "2px solid transparent";
    tile.style.boxSizing = "border-box";

    addInteractions(tile, post);
    scatterArea.appendChild(tile);
  });
}

/* ---------------- TILE INTERACTIONS ---------------- */

function addInteractions(tile, post) {
  let offsetX = 0;
  let offsetY = 0;
  let dragging = false;

  // Prevent browser default image drag ghost
  tile.addEventListener("dragstart", (e) => e.preventDefault());

  tile.addEventListener("mouseenter", () => {
    if (!selectedTile) renderDetail(post);
  });

  tile.addEventListener("click", (e) => {
    e.stopPropagation();

    if (selectedTile) selectedTile.style.border = "2px solid transparent";

    selectedTile = tile;
    tile.style.border = "2px solid yellow";
    renderDetail(post);
  });

  tile.addEventListener("mousedown", (e) => {
    e.preventDefault(); // stop text/image selection
    dragging = true;

    const rect = tile.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    tile.style.cursor = "grabbing";
    tile.style.zIndex = ++zCounter;
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const areaRect = scatterArea.getBoundingClientRect();

    let x = e.clientX - areaRect.left - offsetX;
    let y = e.clientY - areaRect.top - offsetY;

    x = Math.max(0, Math.min(x, areaRect.width - tile.offsetWidth));
    y = Math.max(0, Math.min(y, areaRect.height - tile.offsetHeight));

    tile.style.left = x + "px";
    tile.style.top = y + "px";
  });

  window.addEventListener("mouseup", () => {
    if (!dragging) return;
    dragging = false;
    tile.style.cursor = "grab";

const areaRect = scatterArea.getBoundingClientRect();
const tileRect = tile.getBoundingClientRect();

const tileSize = tileRect.width; // square tiles

// Position of tile within container (top-left corner)
const x = tileRect.left - areaRect.left;
const y = tileRect.top - areaRect.top;

// Maximum travel range for the tile’s top-left corner
const maxX = areaRect.width - tileSize;
const maxY = areaRect.height - tileSize;

// Normalize horizontal: left edge = -1, right edge = 1
let valence = (x / maxX) * 2 - 1;

// Normalize vertical: bottom edge = -1, top edge = 1
let intensity = 1 - (y / maxY) * 2;

// Clamp for safety
valence = Math.max(-1, Math.min(1, valence));
intensity = Math.max(-1, Math.min(1, intensity));

post.valence = Number(valence.toFixed(3));
post.intensity = Number(intensity.toFixed(3));


    // If this tile is selected, refresh the detail panel
    if (selectedTile === tile) {
      renderDetail(post);
    }
  });
}

/* ---------------- DETAIL PANEL ---------------- */

function renderDetail(post) {
  detailView.innerHTML = "";

  const postUrl = `https://www.instagram.com/p/${post.code}/`;

  const link = document.createElement("a");
  link.href = postUrl;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  const img = document.createElement("img");
  img.src = useArchivedImages
  ? `images/${post.id}.jpg`
  : post.displayUrl;
  //img.src = post.displayUrl;
  img.className = "detailImage";

  link.appendChild(img);
  detailView.appendChild(link);

  const meta = document.createElement("div");
  meta.className = "metaBlock";

  meta.appendChild(makeField("Username", post.username));
  meta.appendChild(makeField("Caption", post.caption));
  meta.appendChild(makeField("Following", post.following));
  meta.appendChild(makeField("Paid Partnership", post.isPaidPartnership));

  meta.appendChild(makeField("Valence", post.valence));
  meta.appendChild(makeField("Intensity", post.intensity));

  detailView.appendChild(meta);
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
