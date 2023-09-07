statusbar = document.getElementById("status");
object = [];
img = "";

function preload(){
    img = check();
    console.log(img)
    img = loadImage(img);
}

function setup(){
    canvas = createCanvas(500,400);

    //img = document.querySelector("canvas");


    setTimeout(() => {
        objectDetector = ml5.objectDetector("cocossd",modelLoaded);
        statusbar.innerHTML = "CocoSSD Objects Detecter is LOADING.";
        
    }, 5000);

    
}


function check(){
    n = Number(localStorage.getItem("link no"));

    imgsrc = "";
    switch(n){
        case 1:
            imgsrc = "cam.png";
            break;
        case 2:
            imgsrc = "tower.png";
            break;
        case 3:
            imgsrc = "cheata.png";
            break;
        case 4:
            imgsrc = "tiger.png";
            break;
        case 5:
            imgsrc = "sun.png";
            break;
        case 6:
            imgsrc = "dog.png";
            break;
    }

    return imgsrc;
}

function draw(){
    image(img,0,0,700,400);

    if(object){
        $("myModel").show()
        $("#modal-message").text("Got it!! /n Now We are setting it");
        for(i = 0; i < object.length ; i++){
            label = cap(object[i].label);
            confidence = floor(object[i].confidence*100)+"%";

            x = object[i].x;
            y = object[i].y;

            height = object[i].height;
            width = object[i].width;

            fill("blue");
            stroke("black");
            textSize(15);
            text(label+" "+confidence,x+0,y+10);
            noFill();
            strokeWeight(3);
            stroke("rgb(156, 42, 243)");
            rect(x,y,width,height);
        }
        $("#modal-message").text("CocoSSD has Detected "+object.length+" Objects.");
    }
}

function modelLoaded(){
    
    window.alert("CocoSSD Loaded!!");
    statusbar.innerHTML = "CocoSSD LOADED!!";
    setTimeout(() => {
        $("#myModal").modal("show");
        $("#modal-message").text("CocoSSD Is Ready To Detect")
        setTimeout(() => {
            $("#myModal").modal("hide");
            statusbar.innerHTML = "Now You Can Start Analysing";
        }, 2000);
    }, 1000);
    
}
function start(){
    
    message = confirm("Cocossd is now up to analysing the Image you gave. Should we Continue?");
    if(message){
        $("#myModal").modal("show");
        $("#modal-message").text("Please wait this might take a while!!")
        objectDetector.detect(img,gotResult);
    }
}
function gotResult(error,result){
    if(error)
        console.log(error);
    else{
        object = result;
        console.log(result)
        
    }

}

function cap(word){
    word = word.toString()
    word = word.charAt(0).toUpperCase();
    return word;
}