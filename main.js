song1="";
song2="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
song1status="";
song2status="";
scoreRightWrist=0;
scoreLeftWrist=0;
function preload() {
    song=loadSound("music.mp3");
    song=loadSound("music2.mp3");
}
function setup() {
    canvas=createCanvas(600,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Posenet is Loaded");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("Left Wrist x =" + leftWristx + "  Left Wrist y=" + leftWristy);
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("Right Wrist x =" + rightWristx + "  Right Wrist y=" + rightWristy);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("Left Wrist Score= "+scoreLeftWrist);
        console.log("Right Wrist Score= "+scoreRightWrist);
    }
}
function draw() {
    image(video, 0, 0, 600, 400);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill("red");
    stroke("red");
    if (scoreRightWrist > 0.2) {
        circle(rightWristx, rightWristy, 20);
        song2.stop();
        if (song1status == false) {
            song1.play();
            document.getElementById("song").innerHTML="Playing Harry Potter THeme Song";
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristx, leftWristy, 20);
        song1.stop();
        if (song2status == false) {
            song2.play();
            document.getElementById("song").innerHTML="Playing Peter Pan Song";
        }
    }
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}