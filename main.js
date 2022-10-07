var vatapi="";
var kamboji="";
scoreRightWrist=0;
scoreLeftWrist=0;
leftWristX=0;
rightWristX=0;
leftWristY=0;
rightWristY=0;
function preload(){
    vatapi=loadSound("vatapi-ganapatim.mp3");
    kamboji=loadSound("kamboji-ada-taal-varnam.mp3");
}
function setup(){
    canvas=createCanvas(500, 350);
    canvas.position(430,220)
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", obtainedResults)
}
function draw(){
    image(video, 0, 0, 500, 350);
    fill("red");
    stroke("red");
    if(scoreLeftWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        vatapi.play();
        kamboji.pause();
        document.getElementById("current_song").innerHTML="Now playin' Vatapi Ganapatim Bhaje";
    }
    if(scoreRightWrist>0.2){
        circle(leftWristX, leftWristY, 20);
        kamboji.play();
        vatapi.pause();
        document.getElementById("current_song").innerHTML="Now playin' Sarasijanabhaninnu";
    }
}
function modelLoaded(){
    console.log("Model's been initialised");
}
function obtainedResults(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("The Right Wrist's score's "+scoreRightWrist+" and the Left Wrist's score's ")+scoreLeftWrist;
        rightWristX=results[0].pose.rightWrist.x;
        leftWristX=results[0].pose.leftWrist.x;
        console.log("right wrist x position = "+rightWristX+" and left wrist x position = "+leftWristX);
        rightWristY=results[0].pose.rightWrist.y;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("right wrist y position = "+rightWristY+" and left wrist y position = "+leftWristY);
    }
}