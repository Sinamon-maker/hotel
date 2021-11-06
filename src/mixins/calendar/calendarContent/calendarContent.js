import "./calendarContent.scss";

//import {leftData, rightData} from '../../calendarWithData/calendarWithData'
export default function show() {
  console.log("hi i am from calendarContent");
}
show();
let arrivalDate = "";
let leaveDate = "";

//let date = new Date();
//let currentYear = date.getFullYear();
//let currentMonth = date.getMonth();
//let currentDay = date.getDate();

//calendarContent();

export function calendarContent(currentYear, currentMonth, uniqueId = "") {
  console.log("5555", currentYear, currentMonth);
  const dayWeek = new Date(currentYear, currentMonth, 1).getDay();
  const timeFirst = +new Date(currentYear, currentMonth, 1);

  const data = `calendar${uniqueId}`;
  const calendar = document.querySelector(`div[data-calendar = ${data}]`);

  const dayInMilliseconds = 1000 * 24 * 60 * 60;

  let currentDataIndex;

  let array = fill(dayWeek, timeFirst);

  createCalendarContent(uniqueId, array);

  function fill(dayWeek, timeFirst) {
    let index = 0;
    let arr = [];

    const firstElement = +new Date(
      timeFirst - dayWeek * dayInMilliseconds + dayInMilliseconds
    );
    arr.push(firstElement);
    index += 1;
    while (arr.length < 35) {
      let element = +new Date(arr[arr.length - 1] + dayInMilliseconds);
      arr.push(element);
      index += 1;
    }
    return arr;
  }

  function createCalendarContent(uniqueId, arr) {
    const array = arr || new Array(35).fill(0);
    const btnsArray = Array.from(calendar.children);

    array.forEach((it, index) => {
      let element = btnsArray[index];

      createCalendarButton(it, index, element);
    });
  }

  function createCalendarButton(it, index, element) {
    const button = element.children[0];

    button.classList.remove("btn_page-data");
    button.disabled = false;

    // button.setAttribute("id", index + uniqueId);
    const numb = new Date(it).getDate();

    if (new Date(it).getMonth() !== currentMonth) {
      button.disabled = true;
    }
    if (
      new Date(it).getTime() ===
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ).getTime()
    ) {
      button.classList.add("btn_page-data");

      currentDataIndex = index;
    }
    button.innerHTML = numb;
  }
  calendar.addEventListener("click", HandleClick);

  function HandleClick(event) {
    if (event.target.classList.contains("btn_page")) {
      console.log("clicked calendar button");
    }
  }
}

function clearAttributes(element) {
  element.removeAttribute("disabled");
  element.removeAttribute("data-second");
  element.removeAttribute("data-first");
  element.classList.remove("btn_page-data");
  element.classList.remove("btn_page-choosed");
}

function addAttributes(element, arr, month) {
  if (
    new Date(arr[arr.length - 1]).getDate() ===
      +new Date(arrivalDate).getDate() &&
    +new Date(arrivalDate).getMonth() === month
  ) {
    element.classList.add("btn_page-choosed");
    element.setAttribute("data-first", "first");
  }
  if (
    new Date(arr[arr.length - 1]).getDate() ===
      +new Date(leaveDate).getDate() &&
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
    if ((leaveDate && leaveDate > +new Date(arr[index])) || !leaveDate) {
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

      if (firstInput) {
        firstInput.value = transformDate(arrivalDate);
      }
    }
    if (leaveDate) {
      unFfillGap(uniqueId);
      fillGap(uniqueId);
    }
  }

  if (rightData) {
    if ((arrivalDate && arrivalDate < +new Date(arr[index])) || !arrivalDate) {
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
      const data = "second-calendar-input";
      const secondInput = document.querySelector(`#${data}${uniqueId}`);

      if (secondInput) {
        secondInput.value = transformDate(leaveDate);
      }
    }
    if (arrivalDate) {
      unFfillGap(uniqueId);
      fillGap(uniqueId);
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
function clearChoosed() {
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
      oldElement.removeAttribute("data-second");
      oldElement.classList.remove("btn_page-choosed");
    }
    leaveDate = "";
  }
}

function fillGap(uniqueId) {
  const first = document.querySelector(`button[data-first = first${uniqueId}]`);

  const second = document.querySelector(
    `button[data-second = second${uniqueId}]`
  );

  if (first && second) {
    first.parentNode.classList.add(`left_date${uniqueId}`);
    let sibling = first.parentNode.nextSibling;

    while (sibling.childNodes[0].id < second.id) {
      sibling.classList.add(`between_date${uniqueId}`);
      sibling = sibling.nextSibling;
    }
    second.parentNode.classList.add(`right_date${uniqueId}`);
  }
}

function unFfillGap(uniqueId) {
  const first = document.querySelector(`.left_date${uniqueId}`);
  console.log("unfill", first);
  if (first) {
    first.classList.remove(`left_date${uniqueId}`);
  }
  const second = document.querySelector(`.right_date${uniqueId}`);
  if (second) {
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
