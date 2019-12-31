// examine the document object //
// console.dir(document)

function toPercentage (sum, total){
	return (Math.round(sum / total * 10000)/100 + "%")
}

let task = [
	{
		name: 'Chinese articles',
		sum: 5,
		total: 222,
		percentage: 0,
		isCompleted: false,
		date: [,"Sat Dec 27 2019","Sun Dec 28 2019"],
		delta: [1,2,2],
		daverage: 0,
		dcurrent: 0
	},
	{
		name: 'Maths Examples',
		sum: 11,
		total: 180,
		percentage: 0,
		isCompleted: false,
		date: [],
		delta: [11],
		daverage: 0,
		dcurrent: 0
	},
	{
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

let taskStr = JSON.stringify(task)

// read from localStorage -> task
if(localStorage == undefined){		// localStorage is empty; write into localStorage
	localStorage.task = taskStr		// write in
} else {
	// console.log('read from local storage')
	task = JSON.parse(localStorage.task)		// read from localStorage
	console.log(localStorage.task)
}

function populateStorage(){
	taskStr = JSON.stringify(task)		// stringfy
	localStorage.task = taskStr			// write in
	// console.log(localStorage.task)
}

function createTask(){
	let newDiv = document.createElement('div')
	newDiv.className = "task"
	// let newDivText = document.createTextNode('New Task')
	// newDiv.appendChild(newDivText)
	let taskList = document.getElementById('main-task')		// location, last child of maindiv
	taskList.appendChild(newDiv)		// add child
	
	let newSpan = document.createElement('span')
	newSpan.className = "task-name"
	let newSpanText = document.createTextNode('New Task')
	newSpan.appendChild(newSpanText)
	newDiv.appendChild(newSpan)
	
	
	let newInput = document.createElement('input')
	newInput.type = 'button'
	newInput.value = '新进度'
	newInput.className = 'task-delta'
	// newInputPlus.onclick = 'addProgress()'		// onclick is not working; addEventListen
	newDiv.appendChild(newInput)
	
	newInput = document.createElement('input')
	newInput.type = 'button'
	newInput.value = '当前进度'
	newInput.className = 'task-sum'
	newDiv.appendChild(newInput)
	
	newInput = document.createElement('input')
	newInput.type = 'button'
	newInput.value = '···'
	newInput.className = 'task-detail'
	newDiv.appendChild(newInput)
	
	
	let newul = document.createElement('ul')		// unordered list
	newDiv.appendChild(newul)
	
	let newli = document.createElement('li')
	newli.className = "task-progress"
	let newliText = document.createTextNode('sum / total; Current Percentage')
	newli.appendChild(newliText)
	newul.appendChild(newli)
	
	newli = document.createElement('li')
	newli.className = "task-day"
	newliText = document.createTextNode('xd 平均; yd 当前')
	newli.appendChild(newliText)
	newul.appendChild(newli)
	
	// console.log(newDiv)
}

function TaskWrite(i){
	// getelementbyclassname
	// ul gets a [html collection] - is an array
	let taskNames = document.getElementsByClassName('task-name')
	let progresses = document.getElementsByClassName('task-progress')
	let taskDays = document.getElementsByClassName('task-day')
	
	// objects of arrays && overwrite HTML
	taskNames[i].textContent = task[i].name
	task[i].percentage = toPercentage(task[i].sum, task[i].total)
	progresses[i].textContent = `${task[i].sum} / ${task[i].total}; ${task[i].percentage}`
	let day = task[i].delta.length
	let aspeed = (task[i].sum - task[i].delta[0]) / (day - 1)
	task[i].daverage = Math.round((task[i].total - task[i].sum) / aspeed)
	
	let cspeed = task[i].delta[day - 1]
	task[i].dcurrent = Math.round((task[i].total - task[i].sum) / cspeed)
	taskDays[i].textContent = task[i].daverage + " 平均; " + task[i].dcurrent + " 当前"
}

function buttonEvent(i){
	let day = task[i].delta.length
	let todayDate = new Date().toDateString()
	
	document.getElementsByClassName('task-delta')[i].addEventListener('click', function(){
		day = task[i].delta.length
		todayDate = new Date().toDateString()
		
		let addDelta = prompt("输入任务 " + task[i].name + " 的新进度")
		// console.log(typeof addDelta)			// string
		let numDelta = parseInt(addDelta, 10)		// char into ints
		// console.log(typeof numAdded)			// number

		if(addDelta != null && addDelta != ""){		// input not empty
			if(todayDate == task[i].date[day - 1]){	// same day
				task[i].delta[day - 1] += numDelta
			} else{		// new day
				task[i].date[day] = todayDate	// day++ auto
				task[i].delta[day] = numDelta
			}
			task[i].sum += numDelta
			TaskWrite(i)	// update HTML
			console.log(task)		// check objects
			populateStorage()
		}
	})
	
	document.getElementsByClassName('task-sum')[i].addEventListener('click', function(){
		day = task[i].delta.length
		todayDate = new Date().toDateString()
		
		let addSum = prompt("输入任务 " + task[i].name + " 的总进度")
		let numSum = parseInt(addSum, 10)
		if(addSum != null && addSum !=""){
			if(todayDate == task[i].date[day - 1]){		// same day
				task[i].delta[day - 1] += numSum - task[i].sum
			} else{		// new day
				task[i].date[day] = todayDate
				task[i].delta[day] = numSum - task[i].sum
			}
			task[i].sum = numSum
			TaskWrite(i)
			console.log(task)
			populateStorage()
		}
	})
	
	document.getElementsByClassName('task-detail')[i].addEventListener('click', function(){
		
	})
	
}

// process and print data, before activate submit btn
for (let i = 0; i < task.length; i++){
	createTask()
	TaskWrite(i)
	buttonEvent(i)
}

// button onclick
function submitTask(){
	console.log('function submit')
	let inputName = document.getElementById('input-name').value
	let inputTotal = document.getElementById('input-total').value
	let inputSum = document.getElementById('input-sum').value
	let numTotal = parseInt(inputTotal, 10)
	let numSum = parseInt(inputSum, 10)
	task.push({
		name: inputName,
		sum: numSum,
		total: numTotal,
		percentage: 0,
		isCompleted: false,
		date: [],
		delta: [numSum],
		daverage: 0,
		dcurrent: 0
	})
	populateStorage()
	
	if(inputName != '' && inputTotal != '' && inputSum != ''){
		createTask()
		TaskWrite(task.length - 1)
		buttonEvent(task.length - 1)
		
		document.getElementById('input-name').value = ''
		document.getElementById('input-total').value = ''
		document.getElementById('input-sum').value = 0
	}
	else{
		alert('invalid input')
	}

}
