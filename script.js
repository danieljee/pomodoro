var stop = true;
var breaktime = false;
var interval;

document.addEventListener("DOMContentLoaded", function(){
	var breakrange = document.getElementById("breakRange");
	var sessionrange = document.getElementById("sessionRange");
	clockDiv = document.getElementById("clockDiv");
	totalseconds = sessionrange.value* 60;
	initialSessionTime = sessionrange.value * 60;
	initialBreakTime = breakrange.value * 60;
	document.getElementById("time").innerHTML = sessionrange.value;
	document.getElementById("session").innerHTML = sessionrange.value;
	document.getElementById("break").innerHTML = breakrange.value;
	//Prevent anchor's default action
	document.getElementById("clickable").addEventListener("click", function(){
		event.preventDefault();
	});
	breakrange.addEventListener("change", function(){
		document.getElementById("break").innerHTML = this.value;
		initialBreakTime = this.value * 60;
		if (breaktime){
			totalseconds = this.value * 60;
		}
	});
	sessionrange.addEventListener("change", function(){
		document.getElementById("session").innerHTML = this.value;
		document.getElementById("time").innerHTML = this.value;
		totalseconds = this.value * 60;
		initialSessionTime = totalseconds;
	});
	clockDiv.addEventListener("click", toggleTimer);
});

function toggleTimer(){
	document.getElementById("sessionRange").disabled = !document.getElementById("sessionRange").disabled;
	document.getElementById("breakRange").disabled = !document.getElementById("breakRange").disabled;
	stop = !stop;
	if (stop){
		clearInterval(interval);
	} else {
		interval = setInterval(function(){
			totalseconds -= 1;			
			if (totalseconds == 0){
				if (breaktime){
					breaktime = false;
					totalseconds = initialSessionTime;
					document.getElementById("sessionType").innerHTML = "Session";
				} else {
					breaktime = true;
					totalseconds = initialBreakTime;
					document.getElementById("sessionType").innerHTML = "Break";
				}
			}			
			if (breaktime){
				var fill = Math.floor(300/(initialBreakTime/(initialBreakTime - totalseconds)));
				clockDiv.setAttribute("style", "border-color: red; background-image: -webkit-linear-gradient(bottom, red, red "+fill+"px, transparent "+fill+"px, transparent 100%);");
			} else {
				var fill = Math.floor(300/(initialSessionTime/(initialSessionTime - totalseconds)));		
				clockDiv.setAttribute("style", "border-color:#16ff32; background-image: -webkit-linear-gradient(bottom, #16ff32, #16ff32 "+fill+"px, transparent "+fill+"px, transparent 100%);");				
			}
			
			var minutes = Math.floor(totalseconds/ 60);
			var seconds = totalseconds % 60;
			if (seconds < 10){
				seconds = '0' + seconds;
			}
			document.getElementById("time").innerHTML = minutes + ":" + seconds;
		}, 1000);
	}	
}
