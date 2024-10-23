class Meeting{constructor(e,t,n){this.start=e,this.end=t,this.weekday=n}}class Course{constructor(e,t){this.name=e,this.section=t,this.meetings=new Array}}class Person{constructor(e){this.name=e,this.courses=new Array}}const daysOfWeek=["Monday","Tuesday","Wednesday","Thursday","Friday"],header=document.getElementById("header"),SEMESTER="202401";let weekday=new Date(Date.now()).getDay()-1;weekday=weekday<=4&&weekday>=0?weekday:0;let colorPalette=["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#FAEC54","#b15928","#999999"],contrastColorPalette=["black","white","black","black","black","white","black","black","black","white","black","white","black","black","black"],numberOfHrs=14,startHr=8;if(header){const e=document.createElementNS("http://www.w3.org/2000/svg","text");drawWeekdayLabel(e,daysOfWeek[weekday],10,"#000"),header.appendChild(e),0==weekday?document.getElementById("previousDayButton").classList.add("grayout"):4==weekday&&document.getElementById("nextDayButton").classList.add("grayout")}const schedule=document.getElementById("schedule"),legend=document.getElementById("scheduleLegend");if(schedule){for(let e=1;e<numberOfHrs;e++){let t=document.createElementNS("http://www.w3.org/2000/svg","line");drawHorizLine(t,100/numberOfHrs*e,"#bbb","0.5"),schedule.prepend(t)}const e=document.createElementNS("http://www.w3.org/2000/svg","line");e.setAttribute("id","nowLine"),schedule.appendChild(e),updateCurrentTime();setInterval(updateCurrentTime,2e3);for(let e=1;e<=numberOfHrs;e++){let t=document.createElementNS("http://www.w3.org/2000/svg","text");drawHourLabel(t,e-1+startHr,3,100/numberOfHrs*e-4,"#000",!0),schedule.appendChild(t);let n=document.createElementNS("http://www.w3.org/2000/svg","text");drawHourLabel(n,e-1+startHr,3,100/numberOfHrs*e-4,"#000",!1),schedule.appendChild(n)}let t=document.createElementNS("http://www.w3.org/2000/svg","line");drawVertLine(t,10,"#bbb","0.5"),schedule.prepend(t);let n=document.createElementNS("http://www.w3.org/2000/svg","line");drawVertLine(n,190,"#bbb","0.5"),schedule.prepend(n);const a=document.querySelector("#courses");a&&fetch("http://louisameyerson.com/assets/scripts/data.json").then((e=>e.json())).then((function(e){console.log("Success!");let t=e;t.sort(((e,t)=>e.name.localeCompare(t.name))),drawLegend(t);let n=new Set;t.map((e=>n.add(e.name))),drawCourses(a,t,n),document.getElementById("previousDayButton").addEventListener("click",(function(){previousDay(a,t,n)})),document.getElementById("nextDayButton").addEventListener("click",(function(){nextDay(a,t,n)})),a.addEventListener("click",(function(e){let t=e.target;console.log(`${t.getAttribute("data-person")}: ${t.getAttribute("data-course")}`)})),legend.addEventListener("click",(function(e){let s=e.target,r=s.classList.contains("scheduleLegendRow")?s:s.parentNode;if(r.classList.contains("scheduleLegendRow")){let e=!0;for(legendItem of legend.children)e=!legendItem.classList.contains("grayout")&&e;if(e)legendSetAll(n,!1),legendSetItem(r,n,!0);else{let e=r.classList.contains("grayout");legendSetItem(r,n,e)}drawCourses(a,t,n)}})),document.getElementById("selectAllButton").addEventListener("click",(function(){legendSetAll(n,!0),drawCourses(a,t,n)})),document.getElementById("deselectAllButton").addEventListener("click",(function(){legendSetAll(n,!1),drawCourses(a,t,n)}))}))}function legendSetAll(e,t){for(legendItem of legend.children)legendSetItem(legendItem,e,t)}function legendSetItem(e,t,n){let a=e.children[1];a.innerText&&(a=a.innerText,n?(e.classList.contains("grayout")&&e.classList.remove("grayout"),t.has(a)||t.add(a)):(e.classList.contains("grayout")||e.classList.add("grayout"),t.has(a)&&t.delete(a)))}function updateCurrentTime(){const e=document.getElementById("nowLine");let t=new Date(Date.now()),n=t.getDay()-1==weekday?1:.3;t=60*t.getHours()+t.getMinutes(),t>=480&&t<=1200&&drawHorizLine(e,100/(60*numberOfHrs)*(t-480),"#f00","0.5",n)}function drawHorizLine(e,t,n,a,s){e.setAttribute("x1","0"),e.setAttribute("x2","100%"),e.setAttribute("y1",`${t}%`),e.setAttribute("y2",`${t}%`),e.setAttribute("stroke",n),e.setAttribute("stroke-width",a),s&&e.setAttribute("stroke-opacity",s)}function drawVertLine(e,t,n,a){e.setAttribute("x1",t),e.setAttribute("x2",t),e.setAttribute("y1","0"),e.setAttribute("y2","100%"),e.setAttribute("stroke",n),e.setAttribute("stroke-width",a)}function drawHourLabel(e,t,n,a,s,r){textNode=t<=12?document.createTextNode(`${t}:00`):document.createTextNode(t-12+":00"),e.appendChild(textNode),e.classList.add("hourLabel"),e.setAttribute("font-size",n),e.setAttribute("font-family","helvetica"),r?(e.setAttribute("text-anchor","end"),e.setAttribute("x",3*n)):(e.setAttribute("text-anchor","start"),e.setAttribute("x",200-3*n)),e.setAttribute("y",`${a}%`)}function drawWeekdayLabel(e,t,n,a){textNode=document.createTextNode(t),e.appendChild(textNode),e.setAttribute("font-size",n),e.setAttribute("font-family","helvetica"),e.setAttribute("text-anchor","middle"),e.setAttribute("dominant-baseline","central"),e.setAttribute("x","50%"),e.setAttribute("y","50%"),e.setAttribute("fill",a),e.setAttribute("id","weekdayLabel")}function drawMeeting(e,t,n,a,s,r,d,l){let o=r.start,i=r.end;e.setAttribute("x",100/a*n+"%"),e.setAttribute("y",100/(60*numberOfHrs)*(o-480)+"%"),e.setAttribute("width",100/a+"%"),e.setAttribute("height",100/(60*numberOfHrs)*(i-o)+"%"),e.setAttribute("fill",colorPalette[l%colorPalette.length]),e.setAttribute("rx",2),e.classList.add("meeting"),e.setAttribute("data-person",s.name),e.setAttribute("data-course",d.name),e.setAttribute("data-section",d.section),t.appendChild(document.createTextNode(d.name)),t.setAttribute("x",100/a*n+.4+"%"),t.setAttribute("y",100/(60*numberOfHrs)*(o-480)+2.5+"%"),t.setAttribute("fill",contrastColorPalette[l%colorPalette.length]),t.classList.add("meetingLabel")}function drawCourses(e,t,n){let a=n.size;for(;e.firstChild;)e.removeChild(e.lastChild);if(a>0){let s=0;t.forEach(((t,r)=>{n.has(t.name)&&(t.courses.forEach((n=>{drawOneCourse(e,n,t,s,a,r)})),s++)}))}}function drawOneCourse(e,t,n,a,s,r){t.meetings.forEach((d=>{if(weekday==d.weekday){let l=document.createElementNS("http://www.w3.org/2000/svg","rect"),o=document.createElementNS("http://www.w3.org/2000/svg","text");drawMeeting(l,o,a,s,n,d,t,r),e.appendChild(l),e.appendChild(o)}}))}function previousDay(e,t,n){if(weekday>0){weekday--,drawCourses(e,t,n),document.getElementById("weekdayLabel").firstChild.nodeValue=daysOfWeek[weekday],updateCurrentTime();let a=document.getElementById("previousDayButton"),s=document.getElementById("nextDayButton");s.classList.contains("grayout")?s.classList.remove("grayout"):0==weekday&&a.classList.add("grayout")}}function nextDay(e,t,n){if(weekday<4){weekday++,drawCourses(e,t,n),document.getElementById("weekdayLabel").firstChild.nodeValue=daysOfWeek[weekday],updateCurrentTime();let a=document.getElementById("previousDayButton"),s=document.getElementById("nextDayButton");a.classList.contains("grayout")?a.classList.remove("grayout"):4==weekday&&s.classList.add("grayout")}}function drawLegend(e){for(;legend.firstChild;)legend.removeChild(legend.lastChild);e.forEach(((e,t)=>{let n=colorPalette[t%colorPalette.length],a=document.createElement("li");a.classList.add("scheduleLegendRow");let s=document.createElement("span");s.classList.add("colorSquare"),s.setAttribute("style",`display: inline-block; background: ${n}`),a.append(s);let r=document.createElement("p");r.innerText=e.name,a.append(r),legend.append(a)}))}