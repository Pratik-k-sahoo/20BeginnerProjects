const title = document.getElementById("title");
const action = document.getElementById("action");
const search = document.getElementById("search");
const subbtn = document.getElementById("subbtn");

let lists = [];
showList();

subbtn.addEventListener('click', (e) => {
  e.preventDefault();

  let titleValue = title.value;
  let description = action.value;

  // console.log("Title: " + titleValue);
  // console.log("Description: " + description);
  title.value = null;
  action.value = null;
  
  if(!titleValue.trim() && !description.trim()){
    const toast = document.getElementById("emptyFormToast");
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 3000);
    return;
  }

  let lists = localStorage.getItem("lists");

  if(lists == null){
    listObj = [];
  }else{
    listObj = JSON.parse(lists);
  }

  let list = {
    title : titleValue,
    description : description,
    timestamp : new Date().toJSON(),
    important : false
  };

  listObj.push(list);

  localStorage.setItem("lists", JSON.stringify(listObj));

  showList();
});

function displayList(listObj){
  let html = "";
  
  listObj.forEach((element, index) => {
    let date = new Date(element.timestamp);
    let dateLocale = date.toLocaleDateString();
    let timeLocale = date.toLocaleTimeString();
    let star = element.important ? `&starf;` : `&star;`;
    let starClasses = element.important ? `"btn star active"` : `"btn star"`;

    
    html+= `<div class="list-card">
      <h3>${element.title}</h3>
      <h5>Posted on ${dateLocale} - ${timeLocale}</h5>
      <hr>
      <p>${element.description}</p>
      <button class="btn" id=${index} onCLick=deleteList(this.id)>X</button>
      <button class=${starClasses} id="star" onClick=toggleStar(${index})>${star}</button>
    </div>`
  });

  let listHolder = document.getElementById("list-holder");
  if(listObj.length != 0){
    listHolder.classList.add("grid-container");
    listHolder.innerHTML = html;
  }else{
    listHolder.classList.remove("grid-container");
    listHolder.innerHTML = `Nothing to show! Use "Add a List" section above to add TO DO LIST.`;
  }

}

function showList(){
  let lists = localStorage.getItem("lists");
  if(lists == null){
    listObj = [];
  }else{
    listObj = JSON.parse(lists);
  }

  displayList(listObj);
}

function toggleStar(index){
  let lists = localStorage.getItem("lists");
  if(lists == null){
    listObj = [];
  }else{
    listObj = JSON.parse(lists);
  }

  listObj[index].important = !listObj[index].important;
  localStorage.setItem("lists", JSON.stringify(listObj));

  showList()
}

function deleteList(index){
  let lists = localStorage.getItem("lists");
  if(lists == null){
    listObj = [];
  }else{
    listObj = JSON.parse(lists);
  }

  listObj.splice(index, 1);
  localStorage.setItem("lists", JSON.stringify(listObj));
  showList();
}

function sortNotes(sortBy){
  let lists = localStorage.getItem("lists");
  if(lists == null){
    listObj = [];
  }else{
    listObj = JSON.parse(lists);
  }

  switch(sortBy){
    case "dateAscending": listObj.sort(sortByDateAscending);
                          break;
    case "dateDescending": listObj.sort(sortByDateDescending);
                          break;
    case "importance": listObj.sort(sortByImportance);
                          break;
    case "wordCount": listObj.sort(sortByWordCount);
                          break;
    default: break;
  }

  displayList(listObj);
}

function sortByDateAscending(a, b){
  return new Date(a.timestamp) - new Date(b.timestamp);
}

function sortByDateDescending(a, b){
  return new Date(b.timestamp) - new Date(a.timestamp);
}

function sortByImportance(a, b){
  return a?.important === b?.important ? 0 : a?.important ? -1 : 1;
}

function sortByWordCount(a, b){
  return a.description.split(" ").length - b.description.split(" ").length;
}

console.log(search);

search.addEventListener("input", (elem) => {
    const values = elem.target.value.toLowerCase();
    let listCards = document.getElementsByClassName("list-card");
    Array.from(listCards).forEach((listCard) => {
        const isAvailable = listCard
            .getElementsByTagName("p")[0]
            .innerText.toLowerCase()
            .includes(values) || listCard
            .getElementsByTagName("h3")[0]
            .innerText.toLowerCase()
            .includes(values);
        listCard.classList.toggle("hide", !isAvailable);
    });
});