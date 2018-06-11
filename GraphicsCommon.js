function drawImageCenteredAtCoordWithRotation(image, x, y, angle) {
    draw.save(); // allows to undo movement and rotate spin
    draw.translate(x, y); // sets the point where graphic will go
    draw.rotate(angle);    // sets the rotation
    draw.drawImage(image, -image.width / 2, -image.height / 2);  // center, draw
    draw.restore(); // undo the translation movement and rotation since save()
}

function colorRect(x, y, width, height, color) {
    draw.fillStyle = color;
    draw.fillRect(x, y, width, height);
}

function colorCircle(centerX, centerY, radius, color) {
    draw.fillStyle = color;
    draw.beginPath();
    draw.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    draw.fill();
}