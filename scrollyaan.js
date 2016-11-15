/*
  Created by: Shubham patel

  Version : 1.0

  Discription : Scrollyaan is a pure javascript library for firing callbacks
  when either element apear on viewport or reached to particular scroll position.
  But currently callbacks are executed only once since entry is removed after
  they are executed(for index only).

*/

var scrollyaan = (function(){

  "use strict";

  //indexList is array of position's and callback's as a object {posistion , callback},
  var indexList = [],

  /*
    onViewport is array of elements and their callbacks. Whos callback should be executed
    when they visible to user or apear in viewport
  */
  onViewport =[];

  //add eventlistener for window scroll event
  window.addEventListener("scroll",scroll ,false);

  /*
    function for checking if element is in the viewport or not.
  */
  function isInViewport(element , offset){

    var rect = element.getBoundingClientRect();
    var html = document.documentElement;

    return (
      rect.top > 0 &&
      rect.left >= 0 &&
      rect.top <= ((offset / 100) * (window.innerHeight || html.clientHeight)) &&
      rect.right <= (window.innerWidth || html.clientWidth)
    );
  }

  //Callback function When user scroll
  function scroll(){

    /*
    if user has added any element for which a
    callback should be executed when in the viewport.
    */
    if(onViewport.length > 0){

      //Loop through element list.

      for(var i = 0; i < onViewport.length;i++){

          //If element is in viewport.
          if(isInViewport(onViewport[i] , onViewport[i].offset)){
            /*
              if function is set to execute once remove element from list
              after executing callback function
            */
            if(!onViewport[i].iteration){

              //excute callback function.
              onViewport[i].scollingFunction();

              //remove from  array
              onViewport.splice(i,1);
            }

            else if(!onViewport[i].isTriggered){
              //excute callback function.
              onViewport[i].scollingFunction();

              //set trigger variable to true
              onViewport[i].isTriggered = true;
            }
        }
        else{
          onViewport[i].isTriggered = false;
        }
      }
    }

    //if user has added some index for executing callback.
    if(indexList.length > 0){

      //Loop through indexList
      for (var i = 0; i < indexList.length; i++) {

        //if reched to position where callback should be executed
        if(indexList[i]["index"] <= ( pageYOffset || window.pageYOffset)){
          //Execute callback
          indexList[i]["callback"]();

          //remove from list
          indexList.splice(i,1);
        }
      }
    }
  }

  //For checking passed argument is a dom element or not
  function isDomElement(o){
    return (
      typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
    );
  }

  /*
    for adding a element to array for which a callback should be
    executed if visible on viewport.
  */
  function inViewport(element , callback , offset , iteration){

    //Check if a valid dom element is passed or ot
    if(typeof element === "undefined" && !isDomElement(element))
      throw "scrolled : A valid dom element must be pass";


    //Check if a valid function is passes or not
    if (callback instanceof Function)
      element.scollingFunction = callback;
    else
      throw "scrolled : A valid callback function must be pass";

    /*
      if user has defined parcentage distance correctely from top
      then set offset from top.
    */
    if(!isNaN(offset) && (0 <= offset) && (offset <= 100))
      element.offset = offset;
    else
      throw "scrolled : Third argument must be a number between 0 and 100."

    //boolean variable for throthling.
      if (iteration){
        element.iteration = true;
        element.isTriggered = true;
      }
      else
        element.iteration = false;

    //store element
    onViewport.push(element);
  }

  //for adding a index at which a callback should be executed.
  function atIndex(index , callback, iteration) {
    //store position and callback
    indexList.push({"index" : index , "callback" : callback});
  }

  return {
    "inViewport" : inViewport,
    "atIndex" : atIndex
  }
})();
