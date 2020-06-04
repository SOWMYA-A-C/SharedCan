var drawing =[];
var currentPath =[];

var clear,name,save;

var database;

var position;
var isDrawing = false;
function setup(){
  database = firebase.database();  
  //creating a canvas and creating a method to start and end drawings without drag mistakes
  canvas = createCanvas(500,500);
  canvas.mousePressed(startDrawing);
  canvas.mouseReleased(endDrawing);

  //cretaing a button to clear the drawings
  clear = createButton("clear");
  clear.mousePressed(clearDrawing);

  //creating a save button to save the drawings to the database
  save = createButton("save");
  save.mousePressed(saveDrawing);

  var drawingPosition = database.ref('drawing/position');
  drawingPosition.on('value',readPosition,showErr);

  
}
function startDrawing(){
   isDrawing = true;
   currentPath =[];
   drawing.push(currentPath);
}
function endDrawing(){
  isDrawing = false;
}

// function writePosition(x,y){
//   database.ref('drawing/position').set({
//       x : position.x + x, 
//       y : position.y + y
  
//   })
// }    
function readPosition(data){
 // console.log(data.val().position)
  //currentPath.push(data.val().position)
  
  drawing.push(data.val());
  
 console.log("drawing"+drawing)
  //console.log("drawing"+drawing)
  // drawing[i].x = position.x;
  // drawing[i].y = position.y;
}
function showErr(){
  console.log("error");
}


function draw(){
  background(0);
  if(isDrawing !== false){
    var point ={
      x:mouseX,
      y:mouseY
    }
 currentPath.push(point);
 var drawingRef = database.ref('drawing')
 drawingRef.set({
     "position": drawing
 })
 
  }
  
 
  stroke(255)
  strokeWeight(7);
  noFill();
  for( var i = 0;i < drawing.length;i++){
    var path = drawing[i];
    beginShape();
   for( var r = 0;r < path.length;r++){
    vertex(path[r].x,path[r].y);
   }
   endShape();
  }
 
}
function clearDrawing(){
  drawing = [];
  var drawingRef = database.ref('drawing')
 drawingRef.set({
     "position": drawing
 })
}
function saveDrawing(){
  var ref = database.ref('drawings');
  var data ={
    drawing:drawing,
    name:"My Awesome Drawing"
  }
  var output = ref.push(data);
}