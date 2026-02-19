let table;
let temps = [];
let minVal, maxVal, q1, median, q3;

function preload() {
  table = loadTable("../data/weather.csv", "csv", "header");
}

function setup() {
  createCanvas(400, 600);

  for (let i = 0; i < table.getRowCount(); i++) {
    if (
      table.getString(i, "Station.City") === "Los Angeles" &&
      table.getString(i, "Date.Year") === "2016"
    ) {
      temps.push(table.getNum(i, "Data.Temperature.Max Temp"));
    }
  }

  //sort temperatures
  temps.sort((a, b) => a - b);

  //get quartiles
  minVal = temps[0];
  maxVal = temps[temps.length - 1];
  median = getPercentile(temps, 50);
  q1 = getPercentile(temps, 25);
  q3 = getPercentile(temps, 75);
}

function getPercentile(arr, p) {
  let index = (p / 100) * (arr.length - 1);
  let lower = floor(index);
  let upper = ceil(index);
  if (lower === upper) {
    return arr[lower];
  }
  return arr[lower] + (arr[upper] - arr[lower]) * (index - lower);
}

function draw() {
  background(220);

  let graphX = 200; 
  let graphTop = 100; 
  let graphBottom = 500; 
  let boxWidth = 80;

  function tempToY(temp) {
    return map(temp, 55, 90, graphBottom, graphTop);
  }

  //draw y-axis and labels
  stroke(0);
  line(80, graphTop, 80, graphBottom);
  fill(0);
  for (let t = 55; t <= 90; t += 5) {
    let y = tempToY(t);
    text(t, 50, y + 5);
    line(75, y, 80, y);
  }

  // whiskers 
  stroke(0);
  strokeWeight(2);
  line(graphX, tempToY(minVal), graphX, tempToY(q1));
  line(graphX, tempToY(q3), graphX, tempToY(maxVal));
  line(graphX - 20, tempToY(minVal), graphX + 20, tempToY(minVal));
  line(graphX - 20, tempToY(maxVal), graphX + 20, tempToY(maxVal));

  // box (Q1 to Q3)
  fill(135, 206, 250);
  stroke(0);
  let boxTop = tempToY(q3);
  let boxBottom = tempToY(q1);
  rect(graphX - boxWidth / 2, boxTop, boxWidth, boxBottom - boxTop);

  // median line
  stroke(0);
  strokeWeight(3);
  line(
    graphX - boxWidth / 2,
    tempToY(median),
    graphX + boxWidth / 2,
    tempToY(median),
  );

  strokeWeight(1);
  fill(0);
  text("Weekly Max Temp in Los Angeles, CA in 2016", 140, 50);
  text("Weekly Max Temp (°F)", 120, 550);

  // labels on right side
  textSize(10);
  text("Max: " + maxVal, graphX + 50, tempToY(maxVal));
  text("Q3: " + q3, graphX + 50, tempToY(q3));
  text("Med: " + median, graphX + 50, tempToY(median));
  text("Q1: " + q1, graphX + 50, tempToY(q1));
  text("Min: " + minVal, graphX + 50, tempToY(minVal));
}
