class Meeting{constructor(e,t,n){this.start=e,this.end=t,this.weekday=n}}class Course{constructor(e,t){this.name=e,this.section=t,this.meetings=new Array}}class Person{constructor(e){this.name=e,this.courses=new Array}}const dayNums=new Map([["M",0],["Tu",1],["W",2],["Th",3],["F",4]]);function getCourseObj(e,t,n){const s=e.substring(0,4);return new Promise(((r,a)=>{const o=`https://waitlist-watcher.uk.r.appspot.com/raw/${n}/${s}/snapshots`;axios.get(o).then((n=>{const o=n.data.snapshots[n.data.snapshots.length-1].url;axios.get(o).then((n=>{let s=new Course(e,t);n.data[e].sections[t].meetings.forEach((e=>{if(e.days&&e.start&&e.end){let t=e.days,n=convertClockTimeToMins(e.start),r=convertClockTimeToMins(e.end),a=new Array;for(const e of t)e==e.toUpperCase()?a.push(e):a[a.length-1]+=e;for(const e of a){let t=new Meeting(n,r,dayNums.get(e));s.meetings.push(t)}}})),r(s)})).catch((t=>{console.log(`error getting latest snapshot page for ${e} in ${s}`),a(t)}))})).catch((t=>{console.log(`error getting snapshots for ${e} in ${s}`),a(t)}))}))}function convertClockTimeToMins(e){let t,n=[...e.matchAll(/(\d{1,2}):(\d{2})([ap]m)/gm)][0];return n[1]=Number.parseInt(n[1]),n[2]=Number.parseInt(n[2]),t="pm"==n[3]?12==n[1]?12:n[1]+12:12==n[1]?0:n[1],60*t+n[2]}function convertMinsToClockTime(e){if(e>=0&&e<=1439){let t,n=e<720?"am":"pm",s=e%60;return e-s==0?t=12:(t=(e-s)/60,t>12&&(t-=12)),`${t}:${s.toString().padStart(2,"0")}${n}`}}const daysOfWeek=["Monday","Tuesday","Wednesday","Thursday","Friday"],header=document.getElementById("header"),SEMESTER="202401";let weekday=new Date(Date.now()).getDay()-1;weekday=weekday<=4&&weekday>=0?weekday:0;let colorPalette=["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#FAEC54","#b15928","#999999"],numberOfHrs=14,startHr=8;if(header){const e=document.createElementNS("http://www.w3.org/2000/svg","text");drawWeekdayLabel(e,daysOfWeek[weekday],10,"#000"),header.appendChild(e),0==weekday?document.getElementById("previousDayButton").classList.add("grayout"):4==weekday&&document.getElementById("nextDayButton").classList.add("grayout")}const schedule=document.getElementById("schedule"),legend=document.getElementById("scheduleLegend");if(schedule){for(let e=1;e<numberOfHrs;e++){let t=document.createElementNS("http://www.w3.org/2000/svg","line");drawHorizLine(t,100/numberOfHrs*e,"#bbb","0.5"),schedule.prepend(t)}const e=document.createElementNS("http://www.w3.org/2000/svg","line");e.setAttribute("id","nowLine"),schedule.appendChild(e),updateCurrentTime();setInterval(updateCurrentTime,2e3);for(let e=1;e<=numberOfHrs;e++){let t=document.createElementNS("http://www.w3.org/2000/svg","text");drawHourLabel(t,e-1+startHr,3,100/numberOfHrs*e-4,"#000",!0),schedule.appendChild(t);let n=document.createElementNS("http://www.w3.org/2000/svg","text");drawHourLabel(n,e-1+startHr,3,100/numberOfHrs*e-4,"#000",!1),schedule.appendChild(n)}let t=document.createElementNS("http://www.w3.org/2000/svg","line");drawVertLine(t,10,"#bbb","0.5"),schedule.prepend(t);let n=document.createElementNS("http://www.w3.org/2000/svg","line");drawVertLine(n,190,"#bbb","0.5"),schedule.prepend(n);const s=document.querySelector("#courses");if(s){let e=new Array,t=new Set,n=new Array;e.push(new Person("Ryan"),new Person("Keys"),new Person("Willa"),new Person("Alphonse"),new Person("Kristin"),new Person("Ian"),new Person("Adib"),new Person("Eitan"),new Person("Jack"),new Person("Jacob"),new Person("Bryan"),new Person("Louisa"),new Person("Zach")),n.push([["ENGL101","1002"],["THET285","0102"],["ECON230","0101"],["ECON306","0202"],["PLCY213","0201"]],[["CMSC132","0202"],["BSCI103","1107"],["MATH141","0523"],["COMM107","9920"]],[["CMSC132","0202"],["ARHU275","0101"],["MATH240","0122"],["ENGL101","1101"],["JOUR284","0101"]],[["CHEM237","5355"],["PHYS161","0306"],["BSCI223","2401"],["ENGL272","0201"],["BSCI223","2401"],["CHEM237","5355"],["MUSC229U","0101"]],[["PHYS265","0101"],["CHEM135","3127"],["ENCE100","0101"],["ENGL272","0201"],["GEMS104","0111"],["GEMS102","0101"]],[["BIOE121","0103"],["MATH246H","0201"],["BIOE120","0102"],["BIOE241","0102"],["ENES100","0402"],["GEMS104","0101"],["GEMS102","0101"]],[["BIOE121","0102"],["MATH461","0112"],["PHYS161","0303"],["BIOE241","0102"],["ENES100","0402"],["BIOE120","0102"],["MUSC229U","0101"]],[["HIST289A","0103"],["ENGL265","0201"],["COMM107","6801"],["JWST231","0101"],["JOUR284","0101"]],[["BMGT110S","0101"],["THET110","0107"],["CMSC132","0205"],["THET380","5501"],["ENGL101S","1309"]],[["STAT100","0131"],["ENGL265","0201"],["ARTT110","0401"],["ENGL272","0201"],["BSCI103","1109"]],[["CMSC132","0201"],["MATH241","0312"],["MATH240","0123"],["NFSC220","0101"],["MUSC229U","0101"]],[["CMSC132","0105"],["COMM107","6801"],["MATH461","0133"],["PSYC100","0503"],["THET377","5501"]],[["MATH141","0222"],["ENGL101","0503"],["PHYS161","0308"],["FIRE198","0116"],["ENME272","0501"]]),loadAllCourseLists(n).then((n=>{n.map(((t,n)=>{t.map((t=>{e[n].courses.push(t)}))})),e.sort(((e,t)=>e.name.localeCompare(t.name))),drawLegend(e),e.map((e=>t.add(e.name))),drawCourses(s,e,t)})),document.getElementById("previousDayButton").addEventListener("click",(function(){previousDay(s,e,t)})),document.getElementById("nextDayButton").addEventListener("click",(function(){nextDay(s,e,t)})),s.addEventListener("click",(function(e){let t=e.target;console.log(`${t.getAttribute("data-person")}: ${t.getAttribute("data-course")}`)})),legend.addEventListener("click",(function(n){let r=n.target,a=r.classList.contains("scheduleLegendRow")?r:r.parentNode;if(a.classList.contains("scheduleLegendRow")){let n=a.classList.contains("grayout");legendSetItem(a,t,n),drawCourses(s,e,t)}})),document.getElementById("selectAllButton").addEventListener("click",(function(){for(legendItem of legend.children)legendSetItem(legendItem,t,!0);drawCourses(s,e,t)})),document.getElementById("deselectAllButton").addEventListener("click",(function(){for(legendItem of legend.children)legendSetItem(legendItem,t,!1);drawCourses(s,e,t)}))}}function legendSetItem(e,t,n){let s=e.children[1];s.innerText&&(s=s.innerText,n?(e.classList.contains("grayout")&&e.classList.remove("grayout"),t.has(s)||t.add(s)):(e.classList.contains("grayout")||e.classList.add("grayout"),t.has(s)&&t.delete(s)))}function loadAllCourseLists(e){let t=e.map((e=>loadCourseList(e)));return Promise.all(t)}function loadCourseList(e){let t=e.map((e=>getCourseObj(e[0],e[1],"202401")));return Promise.all(t)}function updateCurrentTime(){const e=document.getElementById("nowLine");let t=new Date(Date.now()),n=t.getDay()-1==weekday?1:.3;t=60*t.getHours()+t.getMinutes(),t>=480&&t<=1200&&drawHorizLine(e,100/(60*numberOfHrs)*(t-480),"#f00","0.5",n)}function drawHorizLine(e,t,n,s,r){e.setAttribute("x1","0"),e.setAttribute("x2","100%"),e.setAttribute("y1",`${t}%`),e.setAttribute("y2",`${t}%`),e.setAttribute("stroke",n),e.setAttribute("stroke-width",s),r&&e.setAttribute("stroke-opacity",r)}function drawVertLine(e,t,n,s){e.setAttribute("x1",t),e.setAttribute("x2",t),e.setAttribute("y1","0"),e.setAttribute("y2","100%"),e.setAttribute("stroke",n),e.setAttribute("stroke-width",s)}function drawHourLabel(e,t,n,s,r,a){textNode=t<=12?document.createTextNode(`${t}:00`):document.createTextNode(t-12+":00"),e.appendChild(textNode),e.classList.add("hourLabel"),e.setAttribute("font-size",n),e.setAttribute("font-family","helvetica"),a?(e.setAttribute("text-anchor","end"),e.setAttribute("x",3*n)):(e.setAttribute("text-anchor","start"),e.setAttribute("x",200-3*n)),e.setAttribute("y",`${s}%`)}function drawWeekdayLabel(e,t,n,s){textNode=document.createTextNode(t),e.appendChild(textNode),e.setAttribute("font-size",n),e.setAttribute("font-family","helvetica"),e.setAttribute("text-anchor","middle"),e.setAttribute("dominant-baseline","central"),e.setAttribute("x","50%"),e.setAttribute("y","50%"),e.setAttribute("fill",s),e.setAttribute("id","weekdayLabel")}function drawMeeting(e,t,n,s,r,a,o,d){let i=a.start,l=a.end;e.setAttribute("x",100/s*n+"%"),e.setAttribute("y",100/(60*numberOfHrs)*(i-480)+"%"),e.setAttribute("width",100/s+"%"),e.setAttribute("height",100/(60*numberOfHrs)*(l-i)+"%"),e.setAttribute("fill",colorPalette[d%colorPalette.length]),e.setAttribute("rx",2),e.classList.add("meeting"),e.setAttribute("data-person",r.name),e.setAttribute("data-course",o.name),e.setAttribute("data-section",o.section)}function drawCourses(e,t,n){let s=n.size;for(;e.firstChild;)e.removeChild(e.lastChild);if(s>0){let r=0;t.forEach(((t,a)=>{n.has(t.name)&&(t.courses.forEach((n=>{drawOneCourse(e,n,t,r,s,a)})),r++)}))}}function drawOneCourse(e,t,n,s,r,a){t.meetings.forEach((o=>{if(weekday==o.weekday){let d=document.createElementNS("http://www.w3.org/2000/svg","rect"),i=document.createElementNS("http://www.w3.org/2000/svg","text");drawMeeting(d,i,s,r,n,o,t,a),e.appendChild(d),e.appendChild(i)}}))}function previousDay(e,t,n){if(weekday>0){weekday--,drawCourses(e,t,n),document.getElementById("weekdayLabel").firstChild.nodeValue=daysOfWeek[weekday],updateCurrentTime();let s=document.getElementById("previousDayButton"),r=document.getElementById("nextDayButton");r.classList.contains("grayout")?r.classList.remove("grayout"):0==weekday&&s.classList.add("grayout")}}function nextDay(e,t,n){if(weekday<4){weekday++,drawCourses(e,t,n),document.getElementById("weekdayLabel").firstChild.nodeValue=daysOfWeek[weekday],updateCurrentTime();let s=document.getElementById("previousDayButton"),r=document.getElementById("nextDayButton");s.classList.contains("grayout")?s.classList.remove("grayout"):4==weekday&&r.classList.add("grayout")}}function drawLegend(e){for(;legend.firstChild;)legend.removeChild(legend.lastChild);e.forEach(((e,t)=>{let n=colorPalette[t%colorPalette.length],s=document.createElement("li");s.classList.add("scheduleLegendRow");let r=document.createElement("span");r.classList.add("colorSquare"),r.setAttribute("style",`display: inline-block; background: ${n}`),s.append(r);let a=document.createElement("p");a.innerText=e.name,s.append(a),legend.append(s)}))}