value = [];
status = '';
function preload(){
    img = loadImage("living_room.webp");
}
function setup(){
    canvas = createCanvas(600,400)
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
}
function modelLoaded(){
    status = true;
    console.log('Model Loaded');
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    value = results;
}
function draw(){
    if(status != ''){
        for(i = 0; i<value.length; i++){
            document.getElementById('status').innerHTML = 'Status: Objects detected';
            fill('#FF0000')
            percent = floor(value[i].confidence * 100);
            text(value[i].label + " " + percent + '%', value[i].x + 15, value[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(value[i].x, value[i].y, value[i].width, value[i].height);  
        }
    }
}