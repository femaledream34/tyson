leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
song1 = "";
song2 = "";
scoreleftwrist = 0;
song1_status = "";
song2_status = "";
scoreRightWrist=0;
function preload() {
  song1 = loadSound("bailando.mp3");
  song2 = loadSound("invasion.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function draw() {
  image(video, 0, 0, 600, 500);
  song1_status = song1.isPlaying();
  song2_status = song2.isPlaying();
  fill("#FF0000");
  stroke("#FF0000");
  if (scoreleftwrist > 0.2) {
    circle(leftwristX, leftwristY, 20);
    song1.stop();
    if (song2_status == false) {
      song2.play();
      document.getElementById("song").innerHTML = "Playing -Invasion.mp3";
      
    }
  }

  if (scoreRightWrist > 0.2) {
    circle(rightwristX, rightwristY, 20);
    song2.stop();
    if (song1_status == false) {
      song1.play();
      document.getElementById("song").innerHTML = "Playing -Bailando.mp3";
      
    }
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1)
}

function modelLoaded() {
  console.log("poseNet is inatialized");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    righttwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    scoreleftwrist = results[0].pose.keypoints[9].score;
    scoreRightWrist = results[0].pose.keypoints[10].score;
  }

}