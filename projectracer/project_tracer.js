// examine the document object //
// console.dir(document)

function toPercentage (sum, total){
	return (Math.round(sum / total * 10000)/100 + "%")
}

// object, local storage???
const task = [
	{
		id: 0,
		name: 'Chinese articles',
		sum: 6,
		total: 222,
		percentage: 0,
		isCompleted: false,
		date: [],
		delta: [1,2,3],
		daverage: 0,
		dcurrent: 0
	},
	{
		id: 1,
		name: 'Maths Examples',
		sum: 11,
		total: 180,
		percentage: 0,
		isCompleted: false,
		date: [],
		delta: [10,1],
		daverage: 0,
		dcurrent: 0
	},
	{
		id: 2,
		name: 'Maths Exercises',
		sum: 0,
		total: 260,
		percentage: 0,
		isCompleted: false,
		date: [],
		delta: [0],
		daverage: 0,
		dcurrent: 0
	}
]



console.log(task)  //arrays of objects
let x = new Date().toDateString()
task[0].date[1] = new Date().toDateString()
console.log(x)

// getelementbyid
// console.log(document.getElementById('tasks'))

function createTask(){
	// create element
	var newDiv = document.createElement('div')
	newDiv.className = "task-item"
	// var newDivText = document.createTextNode('New Task')
	// newDiv.appendChild(newDivText)
	var taskList = document.getElementById('tasks')
	taskList.appendChild(newDiv)
	
	var newSpan = document.createElement('span')
	newSpan.className = "task-name"
	var newSpanText = document.createTextNode('New Task')
	newSpan.appendChild(newSpanText)
	newDiv.appendChild(newSpan)
	
	var newInputPlus = document.createElement('input')
	newInputPlus.type = 'button'
	newInputPlus.value = '+'
	newDiv.appendChild(newInputPlus)
	
	var newInputDetail = document.createElement('input')
	newInputDetail.type = 'button'
	newInputDetail.value = '···'
	newDiv.appendChild(newInputDetail)
	
	var newlist = document.createElement('ul')
	newDiv.appendChild(newlist)
	
	var newlipro = document.createElement('li')
	newlipro.className = "task-progress"
	var newliproText = document.createTextNode('sum / total; Current Percentage')
	newlipro.appendChild(newliproText)
	newDiv.appendChild(newlipro)
	
	var newliday = document.createElement('li')
	newliday.className = "task-day"
	var newlidayText = document.createTextNode('xd 平均; yd 当前')
	newliday.appendChild(newlidayText)
	newDiv.appendChild(newliday)
}

function TaskWrite(i){
	// getelementbyclassname
	// ul gets a [htmlcollection] - is an array
	var taskNames = document.getElementsByClassName('task-name')
	var progresses = document.getElementsByClassName('task-progress')
	var taskDays = document.getElementsByClassName('task-day')
	 // console.log(taskNames)
	// console.log(taskNames[1])
	// taskNames[0].textContent = task[0].name
	
	
	// objects of arrays
	taskNames[i].textContent = task[i].name
	task[i].percentage = toPercentage(task[i].sum, task[i].total)
	progresses[i].textContent = `${task[i].sum} / ${task[i].total}; ${task[i].percentage}`
	let days = task[i].delta.length
	let aspeed = (task[i].sum - task[i].delta[0]) / (days - 1)
	task[i].daverage = Math.round((task[i].total - task[i].sum) / aspeed)
	
	let cspeed = task[i].delta[days - 1]
	task[i].dcurrent = Math.round((task[i].total - task[i].sum) / cspeed)
	taskDays[i].textContent = task[i].daverage + " 平均; " + task[i].dcurrent + " 当前"
	
}

// let ltask = task.length // get object array length
// console.log(task[1].name)
// process and print data
for (var i = 0; i < task.length; i++){
	
	createTask()
	TaskWrite(i)
}


// console.log(task[0].delta)
// console.log(task[0].date)

var taskNum = document.getElementsByClassName('task-item').length
console.log(document.getElementsByClassName('task-item'))
console.log(taskNum)

 // console.log(newDiv)


function submitTask(){
	console.log('function submit')
	var taskname = document.getElementById('taskname').value
	var totalamount = document.getElementById('totalamount').value
	var sumamount = document.getElementById('sumamount').value
	task.push({
		id: 3,
		name: taskname,
		sum: sumamount,
		total: totalamount,
		percentage: 0,
		isCompleted: false,
		date: [],
		delta: [sumamount],
		daverage: 0,
		dcurrent: 0
	})
	
	createTask()
	// console.log(taskNum)
	TaskWrite(taskNum)
	taskNum = document.getElementsByClassName('task-item').length
	// console.log(taskNum)
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}
