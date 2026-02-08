let counts = { paid: 0, organic: 0 };
let lines;

function preload() {
  lines = loadStrings("posts.ndjson");
}

function setup() {
  createCanvas(600, 400);
  textFont("sans-serif");
  parseData();
}

function parseData() {
  lines.forEach(line => {
    if (!line.trim()) return;
    const d = JSON.parse(line);
    const isPaid = d?.data?.is_paid_partnership;
    if (isPaid === true) counts.paid++;
    else counts.organic++;
  });
}

function draw() {
  background(245);
  drawBars("Paid Partnership vs Organic Posts", [
    { label: "Paid", value: counts.paid, color: [200,120,60] },
    { label: "Organic", value: counts.organic, color: [90,160,90] }
  ]);
}

function drawBars(title, data) {
  const margin = 60;
  const chartWidth = width - margin * 2;
  const chartHeight = height - margin * 2;
  const maxValue = max(data.map(d => d.value));
  const barWidth = chartWidth / (data.length * 2);

  stroke(0);
  line(margin, height - margin, width - margin, height - margin);
  line(margin, margin, margin, height - margin);

  noStroke();
  textAlign(CENTER);
  fill(0);
  textSize(18);
  text(title, width / 2, 30);

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
