
let table;
let cancellationValues = [];
let maxCancelled;
//you cannot view a p5 sketch (with csv data) without starting a server

// in terminal, go to p5 folder (folder one level above empty_example)
// type python3 -m http.server // could also use live-server
function preload() {
  table = loadTable('../data/airlines.csv', 'csv', 'header');
}

function setup() {
  angleMode(DEGREES);

    filteredRows = table.findRows('2012', 'Time.Year').filter(row =>
    row.getString('Time.Month Name') === 'October'
    );

  createCanvas(2000, 2000);
  numberOfRows = filteredRows.length;
  numberOfColumns = table.getColumnCount();

  maxCancelled = Math.max(...filteredRows.map(row =>                                                     
    row.getNum('Statistics.Flights.Cancelled')                                                               
  ));  

  console.log(filteredRows);
}

function draw() {
  background(220);
  fill(0);

  line(100, 1700, 100, 300);
  for(var i = 0; i < maxCancelled + 100; i += 50) {
    stroke(0);
    text(i, 65, 1705 - i);
    //tickmark
    line(95, 1700 - i, 105, 1700 - i);
    //grid line
    stroke(145);
    line(100, 1700 - i, 1200, 1700 - i);
  }

  fill(0);
  stroke(0);
  for (var i = 0; i < numberOfRows; i++) {
    //place years
    text(filteredRows[i].getString("Airport.Code"), i * 35 + 120, 1720);
    //pull numbers
    cancellationValues[i] = filteredRows[i].getNum("Statistics.Flights.Cancelled");
    //draw graph
    // rect(i * 35 + 120, 1700 - cancellationValues[i], 20, cancellationValues[i]);
    circle(i * 35 + 133, 1700 - cancellationValues[i], 20);
  }

  text("Airport Code", 600, 1750);

  fill(0)
  push();
  // offset the drawing context by 50 on x and 100 on y
  translate(50, 1100);
  rotate(270);
  text("Number of Cancelled Flights", 0, 0);
  pop();

  
  

  
}