const inp = document.querySelector('.inp');
const addBtn = document.querySelector('.addBtn');
const items = document.querySelector('.items');
showtasks();
addBtn.addEventListener('click', addItem);
// addEventListener('dblclick', saveEdit);


function addItem() {
   if (inp.value != "") {
      let oldTasks = readLocalstorage();
      let newTasks = createNewObj(oldTasks.length);
      oldTasks.push(newTasks);
      localStorage.setItem('case', JSON.stringify(oldTasks));
      showtasks();
      inp.value = "";
      inp.focus();
   }
}

function readLocalstorage() {
   let customArray = JSON.parse(localStorage.getItem('case'));

   let oldTasksLength;

   if (customArray) {
      oldTasksLength = customArray.length + 1
   } else {
      oldTasksLength = 0;
      customArray = [];
   }

   return customArray;
}

function createNewObj(arrayLength) {
   let date = new Date();
   const newobj = {
      id: arrayLength + 1,
      text: inp.value,
      time: date.toLocaleString(),
      done: false
   }
   return newobj;
}

function showtasks() {
   let tasks = readLocalstorage();
   items.innerHTML = "";
   tasks.forEach(function (item) {
      let tick = '';
      let line = '';
      if (item.done == true) {
         tick = `checked`;
         line = 'line-through'
      }
      items.innerHTML += ` <div class="item">
        <div>
       
            <input type="checkbox" name="" id="checkbox" data-id="${item.id}" ${tick}><p class="${line}" data-id="${item.id}">${item.text}</p>
        </div>
        <div>
            <i class="bx bxs-pencil"></i>
            <i class="bx bx-x"></i>
       
        </div>
       </div>
       
       </div>`
   })

   let checkboxes = document.querySelectorAll('input[type=checkbox]');
   let editBtns = document.querySelectorAll('i.bxs-pencil')
   let closeBtns=document.querySelectorAll('i.bx-x');
   console.log(closeBtns)
   checkboxes.forEach(item => {
      item.addEventListener('change', changeTaskStatus)
   })

   editBtns.forEach(function (item) {
      item.addEventListener('click', showEditInput)
   })
   closeBtns.forEach(function(item){
      item.addEventListener('click', deleteTask)
   })
}

function changeTaskStatus() {
   let tasks = readLocalstorage();
   tasks.forEach(item => {
      if (item.id == this.dataset.id) {
         item.done = !item.done;
      }
   })
   // console.log(this.dataset.id);
   localStorage.setItem('case', JSON.stringify(tasks));
   showtasks();

}

function showEditInput() {
   console.log(this)
   let p = this.parentElement.parentElement.children[0].children[1];
   let editInp = document.createElement('input');
   editInp.setAttribute('value', p.innerText)
   editInp.setAttribute('type', 'text');
   editInp.setAttribute("data-id" ,p.dataset.id)
   p.remove();
   this.parentElement.parentElement.children[0].appendChild(editInp)
}

function saveEdit() {
   let findInp = items.querySelector('input[type=text]');
   let p = document.createElement('p');
   let text = document.createTextNode(findInp.value);
   p.setAttribute('data-id' , findInp.dataset.id)
   p.appendChild(text);
   findInp.parentElement.replaceChild(p, findInp.parentElement.children[1])
   console.log(p);

   let tasks = readLocalstorage();
   tasks.forEach(item => {
      if (item.id == findInp.dataset.id) {
         item.text = findInp.value;
      }
   })
   localStorage.setItem('case', JSON.stringify(tasks));
   showtasks();
}

function deleteTask(){
   console.log(this.parentElement.parentElement)
   this.parentElement.parentElement.remove();
}