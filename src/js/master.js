// localStorage.clear();

let _input = document.querySelector("#input");
let _btnInput = document.querySelector("#inpBtn");
let _taskPanelDiv = document.querySelector("#taskPanel");
let _tasksParent = document.querySelector("#tasksParent");
let _myLocal = JSON.parse(localStorage.getItem("names"));
let _myLocalComp = JSON.parse(localStorage.getItem("complete"));
let arrDataBase = JSON.parse(localStorage.getItem("names")) || [];

arrDataBase.map((val) => {
  createElementsTask(val);
});

let _alert = document.querySelector("#alert");
_btnInput.addEventListener("click", () => {
  if (_input.value === "") {
    _alert.classList.remove("hidden");
    _alert.classList.add("flex");
    setTimeout(() => {
      _alert.classList.add("hidden");
      _alert.classList.remove("flex");
    }, 2000);
  } else {
    let inpValue = _input.value;
    arrDataBase.push(inpValue);
    localStorage.setItem("names", JSON.stringify(arrDataBase));
    createElementsTask(inpValue);
    _input.value = "";
    _input.focus();
  }
});

// function appendTaskPanel(s) {

// }

function createElementsTask(val) {
  let _tasksDiv = document.createElement("div");
  _tasksDiv.classList.add("taskItem");
  _tasksDiv.innerHTML = `<div class="w-full flex flex-col gap-6">
            <div
              class="w-full flex justify-between items-center bg-gray-100 borderFav border-2 p-3 rounded-lg"
            >
              <div class="flex gap-2 items-center">
                <h5 class="txtAll font-bold">${val}</h5>
                <image
                  onclick="completeTick(this)"
                  class="w-[30px] h-[30px] cursor-pointer"
                  src="src/images/tickBoxBlack.png"
                  alt="tick"
                />
              </div>
              <div class="flex">
                <image
                onclick="trashBtnTasks(this)"
                  class="w-[30px] h-[30px] cursor-pointer"
                  src="src/images/trashBlack.png"
                  alt="delete"
                />
              </div>
            </div>
          </div>`;
  _tasksParent.appendChild(_tasksDiv);
}

let completeParent = document.querySelector("#completeParent");
let txtCompletediv = document.querySelector("#txtComplete");
let completeSection = document.querySelector("#completeSection");
let arrDataBaseComp = JSON.parse(localStorage.getItem("complete")) || [];

function completeTick(val) {
  let txtComplete = val.previousElementSibling.textContent;
  makeCompleteDiv(txtComplete);

  _tasksParent.removeChild(val.closest(".taskItem"));

  arrDataBaseComp.push(txtComplete);
  localStorage.setItem("complete", JSON.stringify(arrDataBaseComp));
  // delete repeating tasks from localstorage beacuse complete
  // let index = arrDataBase.indexOf(txtComplete);
  arrDataBase = arrDataBase.filter(
    (task) => task.trim() !== txtComplete.trim()
  );
  localStorage.setItem("names", JSON.stringify(arrDataBase));
}

// complete Page
let completePage = document.querySelector("#completePage");
function makeCompleteDiv(s) {
  completeSection.classList.remove("hidden");
  completeSection.classList.add("flex");
  txtCompletediv.classList.remove("hidden");
  txtCompletediv.classList.add("block");
  let completeDiv = document.createElement("div");
  completeDiv.classList.add("taskItem", "w-full");
  completeDiv.innerHTML = `<div class="w-full flex flex-col gap-6 ">
            <div
              class="w-full flex justify-between items-center bg-gray-100 borderLinksComp border-2 border-[#3cff00e3] p-3 rounded-lg opacity-60"
            >
              <div class="flex gap-3 items-center">
                <h5 class="txt font-bold text-[#3d9622] ">${s}</h5>
                <image
                  onclick="completeTick(this)"
                  class="w-[30px] h-[30px] cursor-pointer"
                  src="src/images/tick.png"
                  alt="tick"
                />
              </div>
              <div class="flex">
                <image
                onclick="trashBtn(this)"
                  class="w-[30px] h-[30px] cursor-pointer"
                  src="src/images/trashGreen.png"
                  alt="delete"
                />
              </div>
            </div>
          </div>`;

  completeParent.appendChild(completeDiv);
}

arrDataBaseComp.map((val) => {
  makeCompleteDiv(val);
});

function trashBtnTasks(s) {
  let trashDiv = s.closest(".taskItem");
  trashDiv.classList.add("hidden");
  let trashTxt = trashDiv.querySelector(".txtAll");
  arrDataBase = arrDataBase.filter(
    (val) => val.trim() !== trashTxt.textContent.trim()
  );
  localStorage.setItem("names", JSON.stringify(arrDataBase));
}

function trashBtn(s) {
  let trashDiv = s.closest(".taskItem");
  trashDiv.classList.add("hidden");
  let trashTxt = trashDiv.querySelector(".txt");
  arrDataBaseComp = arrDataBaseComp.filter(
    (val) => val.trim() !== trashTxt.textContent.trim()
  );
  localStorage.setItem("complete", JSON.stringify(arrDataBaseComp));
}
