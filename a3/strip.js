let table;
let temps = [];

function preload() {
  table = loadTable("../data/weather.csv", "csv", "header");
}

function setup() {
  createCanvas(500, 300);
  for (let i = 0; i < table.getRowCount(); i++) {
    if (
      table.getString(i, "Station.City") === "Los Angeles" &&
      table.getString(i, "Date.Year") === "2016"
    ) {
      temps.push(table.getNum(i, "Data.Temperature.Avg Temp"));
    }
  }
}

function draw() {
  background(244, 201, 255);

  stroke(0);
  line(50, 200, 445, 200);

  //ticks
  //total length 400 - ticks at 94 (55.0),134,174,214,254,294,334,374,
  let x = 94;
  let tick = 55.0;
  for(x; x < 450; x+=44) {
    line(x, 190, x, 210)
    text(tick, x - 5, 230)
    tick+=2.5;
  }

  //title
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Average Weekly Temperature in Los Angeles in 2016", width / 2, 30);

  //dots
  fill(100, 50, 150, 150);
  noStroke();
  for(let i = 0; i < temps.length; i++) {
    let x = 94 + (temps[i] - 55) * 17.6;
    let y = 120 + random(-40, 40);
    circle(x, y, 8);
  }

  noLoop();
}
