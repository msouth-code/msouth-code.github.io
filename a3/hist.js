let table;
let bins = [];
let binWidth = 10;
let minTemp = 10;
let maxTemp = 70;
let numBins;
let maxCount;

function preload() {
  table = loadTable("../data/weather.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 600);
  numBins = (maxTemp - minTemp) / binWidth; 

  for (let i = 0; i < numBins; i++) {
    bins[i] = 0;
  }

  for (let i = 0; i < table.getRowCount(); i++) {
    if (table.getString(i, "Station.City") === "Juneau") {
      let temp = table.getNum(i, "Data.Temperature.Avg Temp");
      let binIndex = floor((temp - minTemp) / binWidth);
      binIndex = constrain(binIndex, 0, numBins - 1);
      bins[binIndex]++;
    }
  }

  maxCount = max(bins);
}

function draw() {
  background(220);

  let barWidth = 80;
  let graphX = 100;
  let graphY = 500;
  let graphHeight = 350;

  stroke(0);
  line(graphX, graphY, graphX, graphY - graphHeight);

  fill(0);
  for (let i = 0; i <= maxCount; i += 5) {
    let y = map(i, 0, maxCount, graphY, graphY - graphHeight);
    text(i, graphX - 30, y + 5);
    line(graphX - 5, y, graphX, y);
  }

  for (let i = 0; i < numBins; i++) {
    let barHeight = map(bins[i], 0, maxCount, 0, graphHeight);
    fill(70, 130, 180);
    stroke(0);
    rect(graphX + i * barWidth, graphY - barHeight, barWidth, barHeight);

    fill(0);
    noStroke();
    let label = minTemp + i * binWidth + "-" + (minTemp + (i + 1) * binWidth);
    text(label, graphX + i * barWidth + 20, graphY + 20);
  }

  text("Weekly Average Temperature (°F)", 250, 550);

  push();
  translate(40, 350);
  rotate(300);
  text("Number of Weeks", 0, 0);
  pop();

  text("Weekly Average Temp in Juneau, AK in 2016", 200, 50);
}
