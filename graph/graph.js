let posts = [];
let currentViz = "follow";

function setup() {
  createCanvas(700, 450);
  textFont("sans-serif");

  const select = document.getElementById("vizSelect");
  select.addEventListener("change", (e) => {
    currentViz = e.target.value;
    redraw();
  });

  noLoop(); // only draw when data or selection changes
}

function draw() {
  background(245);

  if (!posts.length) {
    fill(80);
    textAlign(CENTER, CENTER);
    text("Load an NDJSON file to begin", width / 2, height / 2);
    return;
  }

  if (currentViz === "follow") drawFollowViz();
  if (currentViz === "sponsored") drawSponsoredViz();
  if (currentViz === "avgLikes") drawAvgLikesViz();
  if (currentViz === "mediaTypes") drawMediaTypeViz();
}

/* ===================== DATA PARSER ===================== */

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
        caption: data.caption?.text || "",
        following: data.user?.friendship_status?.following || false,
        isPaidPartnership: data.is_paid_partnership || false,
        likeCount: data.like_count || 0,
        commentCount: data.comment_count || 0,
        mediaType: data.media_type || "unknown"
      };
    })
    .filter(Boolean);
}

// these functions visualize different aspects of the dataset

// this one graphs recommended vs posts from accounts the users is following

function drawFollowViz() {
  const following = posts.filter(p => p.following).length;
  const notFollowing = posts.length - following;

  drawBars("Followed vs Recommended posts", [
    { label: "Followed", value: following, color: [70,130,180] },
    { label: "Recommended", value: notFollowing, color: [180,100,100] }
  ]);
}

// sponsored vs not sponsored posts

function drawSponsoredViz() {
  const sponsored = posts.filter(p => p.isPaidPartnership).length;
  const notSponsored = posts.length - sponsored;

  drawBars("Sponsored vs Non-Sponsored posts", [
    { label: "Sponsored", value: sponsored, color: [200,120,80] },
    { label: "Not Sponsored", value: notSponsored, color: [100,160,100] }
  ]);
}

// average likes between followed accounts vs 

function drawAvgLikesViz() {
  const followingPosts = posts.filter(p => p.following);
  const nonFollowingPosts = posts.filter(p => !p.following);

  const avgFollowing = averageLikes(followingPosts);
  const avgNonFollowing = averageLikes(nonFollowingPosts);

  drawBars("Average Likes", [
    { label: "Followed", value: avgFollowing, color: [70,130,180] },
    { label: "Recommended", value: avgNonFollowing, color: [180,100,100] }
  ]);
}

function drawMediaTypeViz() {
  const typeLabels = {
    1: "Static Post",
    2: "Video",
    8: "Carousel"
  };

  const counts = {};

  posts.forEach(p => {
    const label = typeLabels[p.mediaType] || "Other";
    counts[label] = (counts[label] || 0) + 1;
  });

  const data = Object.entries(counts).map(([label, count]) => ({
    label,
    value: count,
    color: [120, 140 + count * 5, 180 - count * 5]
  }));

  drawBars("Media Types", data);
}

// some functions for averaging data and rendering the graphs

function averageLikes(arr) {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((sum, p) => sum + p.likeCount, 0) / arr.length);
}

function drawBars(title, data) {
  const margin = 70;
  const chartWidth = width - margin * 2;
  const chartHeight = height - margin * 2;
  const maxValue = max(data.map(d => d.value));
  const barWidth = chartWidth / (data.length * 2);

  stroke(0);
  line(margin, height - margin, width - margin, height - margin);
  line(margin, margin, margin, height - margin);

  noStroke();
  fill(0);
  textAlign(CENTER);
  textSize(18);
  text(title, width / 2, 35);

  data.forEach((d, i) => {
    const x = margin + chartWidth * ((i * 2 + 1) / (data.length * 2));
    const h = map(d.value, 0, maxValue, 0, chartHeight);

    fill(d.color);
    rect(x - barWidth / 2, height - margin - h, barWidth, h);

    fill(0);
    textSize(14);
    text(d.label, x, height - margin + 20);
    textSize(16);
    text(d.value, x, height - margin - h - 10);
  });
}

// This handles file loading and triggers parse function:

document.getElementById("fileInput").addEventListener("change", handleFileSelect);

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      posts = parseNDJSON(e.target.result);
      console.log("Loaded", posts.length, "posts");
      redraw();
    } catch (err) {
      console.error("Failed to parse file:", err);
      alert("Invalid NDJSON file.");
    }
  };

  reader.readAsText(file);
}
