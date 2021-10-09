import "./calendarContent.scss";

export let leftDate = false;
export let rightDate = true;
export let arrivalDate = '';
export let leaveDate = '';


export let date = new Date();
export let year = date.getFullYear();
export let month = date.getMonth();
const dayWeek = new Date(year, month, 1).getDay();
const timeFirst = +new Date(year, month, 1);
const dayInMilliseconds = 1000 * 24 * 60 * 60;

createCalendarContent();

fill(dayWeek, timeFirst, month);

export default function fill( dayWeek, timeFirst, month) {
  const calendar = document.querySelector('div[data-calendar = "calendar"]');

  const newButtons = Array.from(calendar.children).map((it,index)=> document.getElementById(index));

  let index = 0
  let arr = [];

  const firstElement = +new Date(timeFirst - dayWeek * dayInMilliseconds + dayInMilliseconds);
    arr.push(firstElement);

    clearAttributes(newButtons[index]);
    addAttributes(newButtons[index], arr, month);
    addClick(newButtons[index],arr);
    index+=1

  while (arr.length < 35) {
    let element = +new Date(arr[arr.length - 1] + dayInMilliseconds);
    arr.push(element);

    clearAttributes(newButtons[index]);
    addAttributes(newButtons[index], arr, month);
    addClick(newButtons[index], arr);
    index += 1;
  }

}


function createCalendarContent(){
  const calendar = document.querySelector('div[data-calendar = "calendar"]');
  const array = new Array(35).fill(0)

  array.forEach((it,index) => {
    createCalendarButton(it,index, calendar);
  })
}


function createCalendarButton(it, index, calendar) {
  const btn = document.createElement("div");
  btn.classList.add("calendar-content__item");
  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn_page");
  button.setAttribute("id", index);
  button.innerHTML = it;

  btn.appendChild(button);
  calendar.appendChild(btn);

}

function clearAttributes(element){
  element.removeAttribute("disabled");
  element.removeAttribute("data-second");
  element.removeAttribute("data-first");
  element.classList.remove("btn_page-data")
  element.classList.remove("btn_page-choosed");
}

function addAttributes(element,arr,month){
if (new Date(arr[arr.length - 1]).getDate() === arrivalDate) {
  element.classList.add("btn_page-choosed");
}
if (
  +new Date(arr[arr.length - 1]).getDate() === +new Date().getDate() &&
  +new Date(arr[arr.length - 1]).getMonth() === +new Date().getDate()
) {
  element.classList.add("btn_page-data");
}
if (new Date(arr[arr.length - 1]).getMonth() !== month) {
  element.setAttribute("disabled", "disabled");
}
element.innerHTML = new Date(arr[arr.length - 1]).getDate();
if (
  element.innerHTML === +new Date(leaveDate).getDate() &&
  +new Date(leaveDate).getMonth() === month
) {
   element.classList.add("btn_page-choosed");
   element.setAttribute("data-second", "second");
}
if (
  element.innerHTML === +new Date(arrivalDate).getDate() &&
  +new Date(arrivalDate).getMonth() === month
) {
   element.classList.add("btn_page-choosed");
   element.setAttribute("data-first", "first");
}

}


function addClick(element,arr){
  element.addEventListener("click", function(){createDates(element, arr)});
}

function createDates(element,arr){
  if(leftDate){
    arrivalDate = +new Date(arr[arr.length - 1]);
    const oldElement = document.querySelector('button[data-first = "first"]');
      if (oldElement) {
        oldElement.removeAttribute("data-first")
        oldElement.classList.remove("btn_page-choosed");
      };
    element.classList.add("btn_page-choosed");
    element.setAttribute("data-first", "first");
  }
  if (rightDate) {
    leaveDate = +new Date(arr[arr.length - 1]);
    const oldElement = document.querySelector('button[data-second = "second"]');
    if (oldElement) {
      oldElement.removeAttribute("data-second")
      oldElement.classList.remove("btn_page-choosed")
    };
  }
  element.classList.add("btn_page-choosed");
  element.setAttribute("data-second", "second");
}

// onClick clear and add clear input value
function clearChoosed(){
  if (leftDate) {
    const oldElement = document.querySelector('button[data-first = "first"]');
    if (oldElement) {
      oldElement.removeAttribute("data-first");
      oldElement.classList.remove("btn_page-choosed");
    }
arrivalDate = "";
  }
  if (rightDate) {

    const oldElement = document.querySelector('button[data-second = "second"]');
    if (oldElement) {
      oldElement.removeAttribute("data-second")
      oldElement.classList.remove("btn_page-choosed")
    };
    leaveDate = "";
  }
}