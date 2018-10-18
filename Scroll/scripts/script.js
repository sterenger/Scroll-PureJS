window.onload = function() {  

var divScrollBar = document.getElementById('divScroll');
var scrollElement = document.getElementById('scrollElement');
var divGlobal = document.getElementById('divGlobal');
var content = document.querySelectorAll('#divGlobal > *:not(#divScroll)');

var divGlobalHeight = divGlobal.offsetHeight;
var contentHeight = 0;


//get the height of the content
for (var i = 0; i < content.length; i++) {
  contentHeight += content[i].scrollHeight;
}

//Scrollbar size
scrollElement.style.height = Math.floor(divGlobalHeight / contentHeight * divGlobalHeight) + 'px';

var mousePressed = false;
var mousePositionOld = 0;
var oldScrollElementPosition = 0;


//Mouse event (Mousedown) : when you click on the scroll with the mouse
divScrollBar.addEventListener('mousedown', function(e) {
  if (e.target.nodeName === 'DIV') {
    var distance = e.clientY - divGlobal.offsetTop - scrollElement.offsetHeight / 2;
    if (distance < 0) {
      distance = 0;
    } else if (distance + scrollElement.offsetHeight > divGlobalHeight) {
      distance = divGlobalHeight - scrollElement.offsetHeight;
    }
    scrollElement.style.top = distance + 'px';
    moveElementToNewPosition();
  } else if (e.target.nodeName === 'SPAN') {
    mousePressed = true;
    mousePositionOld = e.clientY;
    oldScrollElementPosition = scrollElement.offsetTop;
  }
});


//Mouse event (MouseUp) : when releases mouse button 
divScrollBar.addEventListener('mouseup', function(e) {
  mousePressed = false;
  mousePositionOld = e.clientY;
  oldScrollElementPosition = scrollElement.offsetTop;
});


//Mouse event (MouseMove) : When moving the mouse pointer after click on the span 
divScrollBar.addEventListener('mousemove', function(e) {
  //check if the mousse was pressed then move scroll
  if (!mousePressed) {
    return;
  }

  var distance = e.clientY - mousePositionOld;
  var newScrollPosition = oldScrollElementPosition + distance;

  if (newScrollPosition < 0) {
    newScrollPosition = 0;
  } else if (newScrollPosition + scrollElement.offsetHeight > divGlobalHeight) {
    newScrollPosition = divGlobalHeight - scrollElement.offsetHeight;
  }
  scrollElement.style.top = newScrollPosition + 'px';
  moveElementToNewPosition();
});


//Mouse event (Mouse Wheel): When scrolling with the mouse scroll in the global div
divGlobal.addEventListener('wheel', function(e){
  var distance = e.clientY - mousePositionOld;
  var newScrollPosition = oldScrollElementPosition + distance;

  if (newScrollPosition < 0) {
    newScrollPosition = 0;
  } else if (newScrollPosition + scrollElement.offsetHeight > divGlobalHeight) {
    newScrollPosition = divGlobalHeight - scrollElement.offsetHeight;
  }
  scrollElement.style.top = newScrollPosition + 'px';
  moveElementToNewPosition();
});


//Function to move the content after the mouse event
var moveElementToNewPosition = function() {
  var postion = scrollElement.offsetTop / (divGlobalHeight - scrollElement.offsetHeight);
  var newScrollPosition = (0 - postion * (contentHeight - divGlobalHeight)) + 'px';
  for (var i = 0; i < content.length; i++) {
    content[i].style.marginTop = newScrollPosition;
  }
};
}