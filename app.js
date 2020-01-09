  const form = document.querySelector('#task-form');
  const taskList = document.querySelector('.collection');
  const clearBin = document.querySelector('.clear-tasks');
  const filter = document.querySelector('#filter');
  const taskInput = document.querySelector('#task');

  // Load all Event Listeners
  loadEventListeners();

  function loadEventListeners(){
      document.addEventListener('DOMContentLoaded', getTasks);
      form.addEventListener('submit', addTask);
      taskList.addEventListener( 'click',removeTask);
      clearBin.addEventListener('click',clearList);
      filter.addEventListener ('keyup', filterTasks);
  }

  //get tasks from LS
  function getTasks(e){
    let tasks;  
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li =  document.createElement('li');
        //Add class
        li.className = 'collection-item';
        // create text node and append to the li
        li.appendChild(document.createTextNode(task));
        //create New Linkk Elemnet
        const link = document.createElement('a');
        // Add class
        link.className =  'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
        e.preventDefault();
    } );
  }

  //add task
  function addTask(e){
      if(taskInput.value ===''){
          alert('add a task');    
      } else{
      const li =  document.createElement('li');
      //Add class
      li.className = 'collection-item';
      // create text node and append to the li
      li.appendChild(document.createTextNode(taskInput.value));
      //create New Linkk Elemnet
      const link = document.createElement('a');
      // Add class
      link.className =  'delete-item secondary-content';
      //add icon html
      link.innerHTML = '<i class = "fa fa-remove"></i>';
      //append link to li
      li.appendChild(link);
      //append li to ul
      taskList.appendChild(li);
      // store tasks
      storeToLocalStorage(taskInput.value);
      //clear input
      taskInput.value = '';} 
      e.preventDefault();
  }

  function storeToLocalStorage(task){
      let tasks;
      if(localStorage.getItem('tasks') === null){
          tasks = [];
      }
      else {
          tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      tasks.push(task);

      localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function removeTask(e){
      if(e.target.parentElement.classList.contains('delete-item')){
          if(confirm('are u sure')){
            e.target.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
      }
  }
// Remove From LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;  
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear tasks
  function clearList(e){
      if(confirm('Are u Sure')){
          while(taskList.firstChild){
              taskList.removeChild(taskList.firstChild);
          }
      }
  }

  function filterTasks(e){
      const text = e.target.value.toLowerCase();
      document.querySelectorAll('.collection-item').forEach(
          function(task){
              const item = task.firstChild.textContent;
              if(item.toLowerCase().indexOf(text)!= -1){
                task.style.display = 'block';

              }
              else{
                  task.style.display = 'none';
              }
          }
      );
  }