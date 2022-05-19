"use strict";
const $ = selector => document.querySelector(selector);

const padSingleDigit = num => num.toString().padStart(2, "0");

var displayCurrentTime = ()=> {
    var now = new Date();
    var hours = now.getHours();
    let ampm = "AM"; // set default value
    
    // correct hours and AM/PM value for display
    if (hours > 12) { // convert from military time
        hours = hours - 12;
        ampm = "PM";
    } else { // adjust 12 noon and 12 midnight
         switch (hours) {
            case 12: // noon
                ampm = "PM";
                break;
            case 0:  // midnight
                hours = 12;
                ampm = "AM";
        }
    }
    
    $("#hours").textContent = hours;
    $("#minutes").textContent = padSingleDigit(now.getMinutes());
    $("#seconds").textContent = padSingleDigit(now.getSeconds());
    $("#ampm").textContent = ampm;
};



//global stop watch timer variable and elapsed time object
let stopwatchTimer=null;
let elapsedMinutes = 0;
let elapsedSeconds = 0;
let elapsedMilliseconds = 0;

const tickStopwatch = () => {    
    // increment milliseconds by 10 milliseconds
    	//elapsed.Milliseconds = elapsed.Milliseconds + 10;
       	elapsedMilliseconds += 10;
   
	// if milliseconds total 1000, increment seconds by one and reset milliseconds to zero
    	if (elapsedMilliseconds === 1000){
			elapsedSeconds++;
			elapsedMilliseconds = 0;
		}

    // if seconds total 60, increment minutes by one and reset seconds to zero
    	if (elapsedSeconds === 60){
			elapsedMinutes ++;
			elapsedSeconds = 0;
		}

    // display new stopwatch time
    	$("#get_hours").textContent = elapsedMinutes;
    	$("#get_minutes").textContent = elapsedSeconds;
		$("#get_seconds").textContent = elapsedMilliseconds;
};

// event handler functions
const startStopwatch = evt => {
    // prevent default action of link
			evt.preventDefault();
    // do first tick of stop watch and then set interval timer to tick 
    // stop watch every 10 milliseconds. Store timer object in stopwatchTimer 
    // variable so next two functions can stop timer.
  		 tickStopwatch();
		 stopwatchTimer = setInterval(tickStopwatch, 10);

};

const stopStopwatch = evt => {
	// prevent default action of link
		evt.preventDefault();
    // stop timer
	clearInterval(stopwatchTimer);
};

const resetStopwatch = evt => {
    // prevent default action of link
			evt.preventDefault();
    // stop timer
       clearInterval(stopwatchTimer);
    // reset elapsed variables and clear stopwatch display
    	// elapsed = { minutes:0, seconds:0, milliseconds:0}
			elapsedMilliseconds = 0;
			elapsedMinutes = 0;
			elapsedSeconds = 0;
		$("#get_hours").textContent = "00";
		$("#get_minutes").textContent =  "00";
    	$("#get_seconds").textContent =  "000";

};

document.addEventListener("DOMContentLoaded", () => {
	// set initial clock display and then set interval timer to display
    // new time every second. Don't store timer object because it 
    // won't be needed - clock will just run.
    displayCurrentTime();
    setInterval(displayCurrentTime, 1000);

	// set up stopwatch event handlers
		 $("#btn-start").onclick = startStopwatch;
		 $("#btn-stop").onclick =  stopStopwatch;
		 $("#btn-reset").onclick = resetStopwatch;
});
