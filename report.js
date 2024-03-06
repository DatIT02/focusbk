var button = document.getElementById("hdr-btn");
var closeButton = document.getElementById("closeButton");
var overlay = document.getElementById("overlay");
var popup = document.getElementById("popup");
var iframe = document.getElementById("myFrame");
button.addEventListener("click", function() 
{
  overlay.style.display = "block";
  popup.style.display = "block";
  iframe.src = "report.html";
});
closeButton.addEventListener("click", function() 
{
  overlay.style.display = "none";
  popup.style.display = "none";
  iframe.src = "";
});