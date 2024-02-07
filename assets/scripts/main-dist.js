class Meeting{constructor(e,t,n){this.start=e,this.end=t,this.weekday=n}}class Course{constructor(e){this.name=e,this.meetings=new Array}}class Person{constructor(e,t){this.name=e,this.color=t,this.courses=new Array}}const dayNums=new Map([["M",0],["Tu",1],["W",2],["Th",3],["F",4]]);function getCourseObj(e,t,n){const r=e.substring(0,4);return new Promise(((s,a)=>{const o=`https://waitlist-watcher.uk.r.appspot.com/raw/${n}/${r}/snapshots`;axios.get(o).then((n=>{const o=n.data.snapshots[n.data.snapshots.length-1].url;axios.get(o).then((n=>{let r=new Course(`${e}-${t}`);n.data[e].sections[t].meetings.forEach((e=>{if(e.days&&e.start&&e.end){let t=e.days,n=convertClockTimeToMins(e.start),s=convertClockTimeToMins(e.end),a=new Array;for(const e of t)e==e.toUpperCase()?a.push(e):a[a.length-1]+=e;for(const e of a){let t=new Meeting(n,s,dayNums.get(e));r.meetings.push(t)}}})),s(r)})).catch((t=>{console.log(`error getting latest snapshot page for ${e} in ${r}`),a(t)}))})).catch((t=>{console.log(`error getting snapshots for ${e} in ${r}`),a(t)}))}))}function convertClockTimeToMins(e){let t,n=[...e.matchAll(/(\d{1,2}):(\d{2})([ap]m)/gm)][0];return n[1]=Number.parseInt(n[1]),n[2]=Number.parseInt(n[2]),t="pm"==n[3]?12==n[1]?12:n[1]+12:12==n[1]?0:n[1],60*t+n[2]}function convertMinsToClockTime(e){if(e>=0&&e<=1439){let t,n=e<720?"am":"pm",r=e%60;return e-r==0?t=12:(t=(e-r)/60,t>12&&(t-=12)),`${t}:${r.toString().padStart(2,"0")}${n}`}}const daysOfWeek=["Monday","Tuesday","Wednesday","Thursday","Friday"],header=document.getElementById("header"),SEMESTER="202401",AUTOCOLOR=!0;let weekday=new Date(Date.now()).getDay()-1;weekday=weekday<=4&&weekday>=0?weekday:0;let colorPalette=["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#FAEC54","#b15928"],numberOfHrs=14,startHr=8;if(header){const e=document.createElementNS("http://www.w3.org/2000/svg","text");drawWeekdayLabel(e,daysOfWeek[weekday],10,"#000"),header.appendChild(e),0==weekday?document.getElementById("previousDayButton").classList.add("grayout"):4==weekday&&document.getElementById("nextDayButton").classList.add("grayout")}const schedule=document.getElementById("schedule"),legend=document.getElementById("scheduleLegend");if(schedule){for(let e=1;e<numberOfHrs;e++){let t=document.createElementNS("http://www.w3.org/2000/svg","line");drawHorizLine(t,100/numberOfHrs*e,"#bbb","0.5"),schedule.prepend(t)}const e=document.createElementNS("http://www.w3.org/2000/svg","line");e.setAttribute("id","nowLine"),schedule.appendChild(e),updateCurrentTime();setInterval(updateCurrentTime,2e3);for(let e=1;e<=numberOfHrs;e++){let t=document.createElementNS("http://www.w3.org/2000/svg","text");drawHourLabel(t,e-1+startHr,3,100/numberOfHrs*e-4,"#000"),schedule.appendChild(t)}let t=document.createElementNS("http://www.w3.org/2000/svg","line");drawVertLine(t,10,"#bbb","0.5"),schedule.prepend(t);const n=document.querySelector("#courses");if(n){let e=new Array,t=new Set,r=new Array;e.push(new Person("Ryan","#9b59b6"),new Person("Keys","#388fc7"),new Person("Willa","#8FAE53"),new Person("Alphonse","#2ECC71"),new Person("Kristin","#BA88F8"),new Person("Ian","#37DFBE"),new Person("Adib","#BE2F96"),new Person("Eitan","#5384EC"),new Person("Jack","#8721B2"),new Person("Jacob","#DB7093"),new Person("Bryan","#1F8B4C"),new Person("Louisa","#F1C40F")),r.push([["ENGL101","1002"],["THET285","0102"],["ECON230","0101"],["ECON306","0202"],["PLCY213","0201"]],[["CMSC132","0202"],["BSCI103","1107"],["MATH141","0523"],["COMM107","9920"]],[["CMSC132","0202"],["ARHU275","0101"],["MATH240","0122"],["ENGL101","1101"],["JOUR284","0101"]],[["CHEM237","5355"],["PHYS161","0306"],["BSCI223","2401"],["ENGL272","0201"],["BSCI223","2401"],["CHEM237","5355"],["MUSC229U","0101"]],[["PHYS265","0101"],["CHEM135","3127"],["ENCE100","0101"],["ENGL272","0201"],["GEMS104","0111"],["GEMS102","0101"]],[["BIOE121","0103"],["MATH246H","0201"],["BIOE120","0102"],["BIOE241","0102"],["ENES100","0402"],["GEMS104","0101"],["GEMS102","0101"]],[["BIOE121","0102"],["MATH461","0112"],["PHYS161","0303"],["BIOE241","0102"],["ENES100","0402"],["BIOE120","0102"],["MUSC229U","0101"]],[["HIST289A","0103"],["ENGL265","0201"],["COMM107","6801"],["JWST231","0101"],["JOUR284","0101"]],[["BMGT110S","0101"],["THET110","0107"],["CMSC132","0205"],["THET380","5501"],["ENGL101S","1309"]],[["STAT100","0131"],["ENGL265","0201"],["ARTT110","0401"],["ENGL272","0201"],["BSCI103","1109"]],[["CMSC132","0201"],["MATH241","0312"],["MATH240","0123"],["NFSC220","0101"],["MUSC229U","0101"]],[["CMSC132","0105"],["COMM107","6801"],["MATH461","0133"],["PSYC100","0503"],["THET377","5501"]]),loadAllCourseLists(r).then((r=>{r.map(((t,n)=>{t.map((t=>{e[n].courses.push(t)}))})),e.sort(((e,t)=>e.name.localeCompare(t.name))),drawLegend(e,AUTOCOLOR),e.map((e=>t.add(e.name))),drawCourses(n,e,t)})),document.getElementById("previousDayButton").addEventListener("click",(function(){previousDay(n,e,t)})),document.getElementById("nextDayButton").addEventListener("click",(function(){nextDay(n,e,t)})),n.addEventListener("click",(function(e){let t=e.target;console.log(`${t.getAttribute("data-person")}: ${t.getAttribute("data-course")}`)})),legend.addEventListener("click",(function(r){legendClick(r.target,n,e,t)}))}}function legendClick(e,t,n,r){let s=e.classList.contains("scheduleLegendRow")?e:e.parentNode;if(s.classList.contains("scheduleLegendRow")){let e=s.children[1];e.innerText&&(s.classList.toggle("grayout"),e=e.innerText,r.has(e)?r.delete(e):r.add(e),drawCourses(t,n,r))}}function loadAllCourseLists(e){let t=e.map((e=>loadCourseList(e)));return Promise.all(t)}function loadCourseList(e){let t=e.map((e=>getCourseObj(e[0],e[1],"202401")));return Promise.all(t)}function updateCurrentTime(){const e=document.getElementById("nowLine");let t=new Date(Date.now()),n=t.getDay()-1==weekday?1:.3;t=60*t.getHours()+t.getMinutes(),t>=480&&t<=1200&&drawHorizLine(e,100/(60*numberOfHrs)*(t-480),"#f00","0.5",n)}function drawHorizLine(e,t,n,r,s){e.setAttribute("x1","0"),e.setAttribute("x2","100%"),e.setAttribute("y1",`${t}%`),e.setAttribute("y2",`${t}%`),e.setAttribute("stroke",n),e.setAttribute("stroke-width",r),s&&e.setAttribute("stroke-opacity",s)}function drawVertLine(e,t,n,r){e.setAttribute("x1",t),e.setAttribute("x2",t),e.setAttribute("y1","0"),e.setAttribute("y2","100%"),e.setAttribute("stroke",n),e.setAttribute("stroke-width",r)}function drawHourLabel(e,t,n,r,s){textNode=t<=12?document.createTextNode(`${t}:00`):document.createTextNode(t-12+":00"),e.appendChild(textNode),e.setAttribute("font-size",n),e.setAttribute("font-family","helvetica"),e.setAttribute("text-anchor","end"),e.setAttribute("x",3*n),e.setAttribute("y",`${r}%`),e.setAttribute("fill",s)}function drawWeekdayLabel(e,t,n,r){textNode=document.createTextNode(t),e.appendChild(textNode),e.setAttribute("font-size",n),e.setAttribute("font-family","helvetica"),e.setAttribute("text-anchor","middle"),e.setAttribute("dominant-baseline","central"),e.setAttribute("x","50%"),e.setAttribute("y","50%"),e.setAttribute("fill",r),e.setAttribute("id","weekdayLabel")}function drawMeeting(e,t,n,r,s,a,o,d){let i=s.start,l=s.end,u=o?colorPalette[d%colorPalette.length]:r.color;e.setAttribute("x",100/n*t+"%"),e.setAttribute("y",100/(60*numberOfHrs)*(i-480)+"%"),e.setAttribute("width",100/n+"%"),e.setAttribute("height",100/(60*numberOfHrs)*(l-i)+"%"),e.setAttribute("fill",u),e.setAttribute("rx",2),e.classList.add("meeting"),e.setAttribute("data-person",r.name),e.setAttribute("data-course",a)}function drawCourses(e,t,n){let r=n.size;for(;e.firstChild;)e.removeChild(e.lastChild);if(r>0){let s=0;t.forEach(((t,a)=>{n.has(t.name)&&(t.courses.forEach((n=>{drawOneCourse(e,n,t,s,r,a)})),s++)}))}}function drawOneCourse(e,t,n,r,s,a){t.meetings.forEach((o=>{if(weekday==o.weekday){let d=document.createElementNS("http://www.w3.org/2000/svg","rect");drawMeeting(d,r,s,n,o,t.name,AUTOCOLOR,a),e.appendChild(d)}}))}function previousDay(e,t,n){if(weekday>0){weekday--,drawCourses(e,t,n),document.getElementById("weekdayLabel").firstChild.nodeValue=daysOfWeek[weekday],updateCurrentTime();let r=document.getElementById("previousDayButton"),s=document.getElementById("nextDayButton");s.classList.contains("grayout")?s.classList.remove("grayout"):0==weekday&&r.classList.add("grayout")}}function nextDay(e,t,n){if(weekday<4){weekday++,drawCourses(e,t,n),document.getElementById("weekdayLabel").firstChild.nodeValue=daysOfWeek[weekday],updateCurrentTime();let r=document.getElementById("previousDayButton"),s=document.getElementById("nextDayButton");r.classList.contains("grayout")?r.classList.remove("grayout"):4==weekday&&s.classList.add("grayout")}}function drawLegend(e,t){for(;legend.firstChild;)legend.removeChild(legend.lastChild);e.forEach(((e,n)=>{let r=t?colorPalette[n%colorPalette.length]:e.color,s=document.createElement("li");s.classList.add("scheduleLegendRow");let a=document.createElement("span");a.classList.add("colorSquare"),a.setAttribute("style",`display: inline-block; background: ${r}`),s.append(a);let o=document.createElement("p");o.innerText=e.name,s.append(o),legend.append(s)}))}