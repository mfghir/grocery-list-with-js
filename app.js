// https://github.com/john-smilga/javascript-basic-projects/tree/master/14-grocery-bud

const form = document.querySelector(".form-container");
const inp = document.querySelector(".inp");
const container = document.querySelector(".grocery-container");

const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const submitBtn = document.querySelector(".submit-btn");

let edit = false;
let editElement;
let editID = "";

// function refresh() {
//   setTimeout(function () {
//     location.reload();
//   }, 10);
// }

const clearItems = () => {
  list.remove();
  clearBtn.style.display = "none";
  setBackToDefault();

  location.reload()
  // refresh();
};

const submitFunc = (e) => {
  e.preventDefault();
  const val = inp.value;
  const id = new Date().getTime().toString();

  clearBtn.style.display = "block";

  if (val !== "" && !edit) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;

    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
    element.innerHTML = `
        <h3>${val}</h3>
        <div class="btns">
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash"></i>
        </div>`;

    const deleteBtn = element.querySelector(".fa-trash");
    deleteBtn.addEventListener("click", deleteFunc);

    const editBtn = element.querySelector(".fa-edit");
    editBtn.addEventListener("click", editFunc);

    list.appendChild(element);
    inp.value = "";
    setBackToDefault();
  } else if (val !== "" && edit) {
    editElement.innerHTML = val;
    setBackToDefault();
  }
};

const deleteFunc = (e) => {
  const deletedItem = e.target.parentElement.parentElement;
  deletedItem.remove();
};

const editFunc = (e) => {
  const editedItem = e.currentTarget.parentElement.parentElement;
  editElement = e.currentTarget.parentElement.previousElementSibling;
  inp.value = editElement.innerHTML;

  edit = true;
  editID = editedItem.dataset.id;
  submitBtn.textContent = "edit";
};

function setBackToDefault() {
  inp.value = "";
  edit = false;
  editID = "";
  submitBtn.textContent = "submit";
}

clearBtn.addEventListener("click", clearItems);
form.addEventListener("submit", submitFunc);
