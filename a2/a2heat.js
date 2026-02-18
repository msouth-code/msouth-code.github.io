
let table;
let cancellationValues = [];
let maxCancelled;
let btn;
let airportData = {};  
//you cannot view a p5 sketch (with csv data) without starting a server

// in terminal, go to p5 folder (folder one level above empty_example)
// type python3 -m http.server // could also use live-server
function preload() {
  table = loadTable('../data/airlines.csv', 'csv', 'header');
}

function setup() {
  angleMode(DEGREES);

    rows2012 = table.findRows('2012', 'Time.Year');

  createCanvas(2000, 2000);
  numberOfRows = rows2012.length;
  numberOfColumns = table.getColumnCount();

  maxCancelled = Math.max(...rows2012.map(row =>                                                     
    row.getNum('Statistics.Flights.Cancelled')                                                               
  ));                                                                       
                                                                                                             
  for (let row of rows2012) {                                                                                
    let code = row.getString("Airport.Code");                                                                
    if (!airportData[code]) {                                                                                
      airportData[code] = [];                                                                                
    }                                                                                                        
    airportData[code].push(row);                                                                             
  }                                                                                                  
    
}

function draw() {
  background(220);
  fill(0);

  text("Cancelled Flights in 2012", 370, 30);

  let x = 100;
  let y = 100

  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  for(let month of months) {
    text(month, x + 45, 60)
    x+=50
  }
  x = 100;
  stroke(0);
  
  for (let code in airportData) {                                                                            
    let rows = airportData[code];                                                                            
    text(code, x, y);  
    for (let row of rows) {
        let flightsCancelled = row.getNum("Statistics.Flights.Cancelled");
        if(flightsCancelled < 65) {
            fill(255)
        } else if(flightsCancelled < 65*2) {
            fill(255,233,233)
        } else if(flightsCancelled < 65*4) {
            fill(255,202,202)
        }
        else if(flightsCancelled < 65*6) {
            fill(255,182,182)
        }
        else if(flightsCancelled < 65*8) {
            fill(255,165,165)
        }
        else if(flightsCancelled < 65*10) {
            fill(255,135,135)
        }
        else if(flightsCancelled < 65*12) {
            fill(255,101,101)
        }
        else if(flightsCancelled < 65*14) {
            fill(255,68,68)
        }
        else if(flightsCancelled < 65*16) {
            fill(255,47,47)
        }
        else if(flightsCancelled < 65*18) {
            fill(255,24,24)
        }
        else if(flightsCancelled <= 65*20) {
            fill(255,0,0)
        }
        square(x + 35, y - 25, 40);  
        fill(0)
        x += 50
    }
    x = 100  
    y += 50;                                                  
  }   

  fill(0)
  push();
  // offset the drawing context by 50 on x and 100 on y
  translate(50, 800);
  rotate(270);
  text("Airport Code", 0, 0);
  pop();

  
  

  
}