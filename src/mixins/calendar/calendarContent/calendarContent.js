import "./calendarContent.scss";

import {leftData, rightData} from '../../calendarWithData/calendarWithData'

//export let leftDate = false;
//export let rightDate = true;
export let arrivalDate = '';
export let leaveDate = '';

let uniqueId= '';

export let date = new Date();
export let year = date.getFullYear();
export let month = date.getMonth();
const dayWeek = new Date(year, month, 1).getDay();
const timeFirst = +new Date(year, month, 1);
const dayInMilliseconds = 1000 * 24 * 60 * 60;

createCalendarContent(uniqueId);

fill(dayWeek, timeFirst, month, uniqueId='');

export default function fill( dayWeek, timeFirst, month) {
  const data = `calendar${uniqueId}`;
  const calendar = document.querySelector(`div[data-calendar = ${data}]`);

  const newButtons = Array.from(calendar.children).map((it, index) =>
    document.getElementById(index + uniqueId)
  );

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
    addClick(newButtons[index], arr, index, uniqueId);
    index += 1;
  }

}


function createCalendarContent(uniqueId) {
  const data = `calendar${uniqueId}`;
  const calendar = document.querySelector(
    `div[data-calendar = ${data}]`
  );

  console.log('calendarContent', calendar,data)
  const array = new Array(35).fill(0);

  array.forEach((it, index) => {
    createCalendarButton(it, index, calendar, uniqueId);
  });
}


function createCalendarButton(it, index, calendar, uniqueId) {
  const btn = document.createElement("div");
  btn.classList.add("calendar-content__item");
  const button = document.createElement("button");
  button.classList.add("btn");
  button.classList.add("btn_page");
  button.setAttribute("id", index + uniqueId);
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
if (
  new Date(arr[arr.length - 1]).getDate() ===
    +new Date(arrivalDate).getDate() &&
  +new Date(arrivalDate).getMonth() === month
) {
  element.classList.add("btn_page-choosed");
  element.setAttribute("data-first", "first");
}
if (
  new Date(arr[arr.length - 1]).getDate() === +new Date(leaveDate).getDate() &&
  +new Date(leaveDate).getMonth() === month
) {
  element.classList.add("btn_page-choosed");
  element.setAttribute("data-second", "second");
}
if (
  +new Date(arr[arr.length - 1]).getDate() === +new Date().getDate() &&
  +new Date(arr[arr.length - 1]).getMonth() === +new Date().getMonth()
) {
  element.classList.add("btn_page-data");
}
if (new Date(arr[arr.length - 1]).getMonth() !== month) {
  element.setAttribute("disabled", "disabled");
}
element.innerHTML = new Date(arr[arr.length - 1]).getDate();


}


function addClick(element, arr, index, uniqueId) {
  element.addEventListener("click", function () {
    createDates(element, arr, index, uniqueId);
  });
}

function createDates(element, arr, index, uniqueId) {
  if (leftData) {
    if (leaveDate && leaveDate > + new Date(arr[index]) || !leaveDate){

      arrivalDate = +new Date(arr[index]);

      const oldElement = document.querySelector(
      `button[data-first = first${uniqueId}]`
      );
      if (oldElement) {
        oldElement.removeAttribute("data-first");
        oldElement.classList.remove("btn_page-choosed");
      }
      element.classList.add("btn_page-choosed");
      element.setAttribute("data-first", "first" + uniqueId);

      const firstInput = document.getElementById(
        `first-calendar-input${uniqueId}`
      );

      if(firstInput){

        firstInput.value = transformDate(arrivalDate);
      }
    }
    if(leaveDate){
      unFfillGap(uniqueId);
      fillGap(uniqueId)
    }
  }

  if (rightData) {
    if ((arrivalDate && arrivalDate < +new Date(arr[index])) || !arrivalDate){
      leaveDate = +new Date(arr[index]);
      const oldElement = document.querySelector(
      `button[data-second = second${uniqueId}]`
      );
      if (oldElement) {
        oldElement.removeAttribute("data-second");
        oldElement.classList.remove("btn_page-choosed");
      }
      element.classList.add("btn_page-choosed");
      element.setAttribute("data-second", "second" + uniqueId);
      const data = 'second-calendar-input';
      const secondInput = document.querySelector(`#${data}${uniqueId}`);

      if(secondInput){

        secondInput.value = transformDate(leaveDate);
      }
    }
     if(arrivalDate){
      unFfillGap(uniqueId);
      fillGap(uniqueId)
    }
  }

}

function transformDate(dataToApply) {
  const day = new Date(dataToApply).getDate();
  const month = new Date(dataToApply).getMonth();
  const year = new Date(dataToApply).getFullYear();
  return `${day}.${month + 1}.${year}`;
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

function fillGap(uniqueId){
  const first = document.querySelector(
      `button[data-first = first${uniqueId}]`)

  const second = document.querySelector(
      `button[data-second = second${uniqueId}]`)

      if(first && second){

        first.parentNode.classList.add(`left_date${uniqueId}`);
        let sibling = first.parentNode.nextSibling;

        while(sibling.childNodes[0].id < second.id){


sibling.classList.add(`between_date${uniqueId}`);
          sibling = sibling.nextSibling;

        }
 second.parentNode.classList.add(`right_date${uniqueId}`);
      }
}

function unFfillGap(uniqueId) {
  const first = document.querySelector(`.left_date${uniqueId}`);
  console.log('unfill',first)
  if (first){
   first.classList.remove(`left_date${uniqueId}`);
  }
  const second = document.querySelector(`.right_date${uniqueId}`);
  if(second){
    second.classList.remove(`right_date${uniqueId}`);
  }

  const between = document.querySelectorAll(`.between_date${uniqueId}`);
   if (between) {
     console.log("unfill-between", between.length);
   }
    if (between && between.length !== 0) {
      for (let i = 0; i < between.length; i += 1) {
        between[i].classList.remove(`between_date${uniqueId}`);
      }
    }

}