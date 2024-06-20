let tasks = [];


function getTaskFroStorige(){
  let storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}
getTaskFroStorige()

function  FileTaksOnThePage(){
  document.getElementById("tasks").innerHTML = ""

  let index = 0 

  for (task of tasks){
  
    let content = ` 
    <div class="task ${task.isDone ? `done`:``} ">
    <!-- task info -->
                <div style="width:70% ; " >
                    <h2> ${task.titel} </h2>
                  
                    <div>
                      <span class="material-symbols-outlined">
                        calendar_month
  
                        </span>
                        <span>
                        ${task.date}
                        </span>
                    </div>
                </div>
      <!-- //task info //-->
        
      <!-- task action -->
              <div style="display: flex; justify-content: space-between ;align-items: center; width: 20%; ">
                  <button  onclick="deleteTask(${index})"  class="circular" style="background-color: red;color: white;">
                    <span class="material-symbols-outlined">
                      delete
                      </span>
                  </button>

                  ${task.isDone ? `<button class="circular" style="background-color: red;color: white">
                    <span  onclick="complettask(${index})"  class="material-symbols-outlined">
                      cancel
                      </span>
                  </button>
                  `:`
                    <button class="circular" style="background-color: rgb(0, 255, 38);color: white">
                      <span  onclick="complettask(${index})"  class="material-symbols-outlined">
                        check_circle
                        </span>
                        </button>

                  `}
                  
                  <button  onclick="edittask(${index})" class="circular" style="background-color: rgb(0, 128, 233);color: white">
                    <span class="material-symbols-outlined">
                      edit
                      </span>
                  </button>
              </div>
    <!-- //task action //-->
    </div>`
    
    document.getElementById("tasks").innerHTML += content
    index++
  }
}




document.getElementById("add-button").addEventListener("click", function(){
  let taskName = prompt(" الرجاء ادخال عنوان المهمة ")
  let now  = new Date()
  let date = now.getDate() +"/" + (now.getMonth()+1 ) + "/" + now.getFullYear() +"/" +  now.getMinutes()
  let taskObj = {
   "titel": taskName,
   "date": date,
   "isDone": false
  }

  tasks.push(taskObj)
  
  storigeTasks()
  FileTaksOnThePage()
 })



 function deleteTask(index) {
  let isconfirmed = confirm("do u want to delete")
  if (isconfirmed){
    tasks.splice(index , 1 )
    storigeTasks()
    FileTaksOnThePage()  
  } 
  console.log(isconfirmed)
}


function edittask(index){
    let task = tasks[index]
    let NewtaskTitel=  prompt("ادخل التعديل الجديد",task.titel)
    task.titel = NewtaskTitel
    storigeTasks()
    FileTaksOnThePage()  
}

function complettask(index){
  let task = tasks[index]
  // if(task.isDone){
  //   task.isDone = false
  // }else{
  //   task.isDone = true
  // }
  task.isDone = !task.isDone
  storigeTasks()
  FileTaksOnThePage()
}


//===================== storige function===============//

function storigeTasks(){
  let taskString = JSON.stringify(tasks)
  localStorage.setItem("tasks", taskString)
}