import "./calendar.scss";
import "./calendarContent/calendarContent";
import { calendarContent } from "./calendarContent/calendarContent";

calendar1();

function calendar1(uniqueId = "") {
  let firstDate = null;
  let secondDate = null;

  const data = `calendar${uniqueId}`;
  const calendar = document.querySelector(`div[data-calendar = ${data}]`);

  const dayInMilliseconds = 1000 * 24 * 60 * 60;

  let date = new Date();
  let currentYear = date.getFullYear();
  let currentMonth = date.getMonth();
  console.log("5555", currentYear, currentMonth);

  let currentDay = date.getDate();

  let currentDataIndex;

  const MONTH = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  calendarContent(currentYear, currentMonth);
  headerCalendar();

  function headerCalendar() {
    const monthContent = document.querySelector(
      `div[data-month=title-month${uniqueId}]`
    );

    monthTitle(monthContent, currentMonth, currentYear);

    monthContent.addEventListener("click", changeMonth);

    function changeMonth(event) {
      let newPeriod;
      if (event.target === monthContent.children[2]) {
        newPeriod = new Date(currentYear, currentMonth + 1, 1);
      }
      if (event.target === monthContent.children[0]) {
        newPeriod = new Date(currentYear, currentMonth - 1, 1);
      }
      currentYear = newPeriod.getFullYear();
      currentMonth = newPeriod.getMonth();
      console.log("newPeriod", currentYear, currentMonth);
      calendarContent(currentYear, currentMonth);
      monthTitle(monthContent, currentMonth, currentYear);
    }
  }

  function monthTitle(monthContent, text1, text2) {
    console.log("monthContent", monthContent);
    monthContent.children[1].innerHTML = `${MONTH[text1]} ${text2}`;
  }

  function calendarContent(currentYear, currentMonth, uniqueId = "") {
    const dayWeek = new Date(currentYear, currentMonth, 1).getDay();
    const timeFirst = +new Date(currentYear, currentMonth, 1);

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
clearGap();
      array.forEach((it, index) => {
        let element = btnsArray[index];

        createCalendarButton(it, index, element);
      });
if (firstDate&& secondDate){
  fillGap()
}
    }

    function createCalendarButton(it, index, element) {
      const button = element.children[0];

      button.classList.remove("btn_page-data");
      button.disabled = false;

      // button.setAttribute("id", index + uniqueId);
      const numb = new Date(it).getDate();
button.innerText = numb;
      if (new Date(it).getMonth() !== currentMonth) {
        button.disabled = true;
      }
      if(isButtonChoosed(firstDate, button)){
        button.classList.add("btn_page-choosed");
      }
      if (isButtonChoosed(secondDate, button)) {
        console.log('createbutton secondDate', )
        button.classList.add("btn_page-choosed");
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

    }
  }
  calendar.addEventListener("click", HandleClick);

  function HandleClick(event) {
    if (
      event.target.classList.contains("btn_page") &&
      event.currentTarget.contains(event.target) &&
      event.currentTarget === calendar
    ) {

       console.log("firstDate&& secondDate", firstDate, secondDate)
      event.target.classList.add("btn_page-choosed")
      let date = +new Date(currentYear, currentMonth, event.target.innerText);

       console.log("0");
      if (!firstDate){
        console.log("2");
        firstDate = date

        return
      }
      if(!secondDate ){
        if(firstDate > date){
         secondDate = firstDate;
          firstDate = date;
        }

        else {
        secondDate = date;
         }
      fillGap()
      console.log("3");
      return
            }
if (firstDate && secondDate) {
  secondDate = null;
  firstDate = date;
  clearGap();
  event.target.classList.add("btn_page-choosed");
  console.log("1");
  return;
}

    }
  }

  function isButtonChoosed(date, btn) {
    if (date) {

      if (

        new Date(date).getMonth() === currentMonth &&
        new Date(date).getDate() === +btn.innerText
      ) {
        return true;
      }
    }
    return false;
  }

  function isBetween(date1, date2, btn) {
    if (
      new Date(date1).getMonth() === currentMonth &&
      new Date(date2).getMonth() === currentMonth &&
      !btn.disabled
    ) {
      if (
        +btn.innerHTML < new Date(date2).getDate() &&
        +btn.innerHTML > new Date(date1).getDate() &&
        !btn.disabled
      ) {
        return true;
      }
    } else {
      if (new Date(date1).getMonth() === currentMonth) {
        if (+btn.innerHTML > new Date(date1).getDate() && !btn.disabled) {
          return true;
        }
      }
      if (new Date(date2).getMonth() === currentMonth) {
        if (+btn.innerHTML < new Date(date2).getDate() && !btn.disabled) {
          return true;
        }
      }
    }
    return false;
  }

  function fillGap() {
    const btns = Array.from(calendar.childNodes).map((it) => it.childNodes[0]);
    console.log("fillGap working", btns);
    btns.forEach((btn) => {

      if (isButtonChoosed(firstDate, btn)) {
        btn.parentNode.classList.add("left_date");
        console.log("fillGap working firstDate", btn.innerText, currentMonth);
      }
      if (isBetween(firstDate, secondDate, btn)) {
        btn.parentNode.classList.add("between_date");
      }
      if (isButtonChoosed(secondDate, btn)) {
        btn.parentNode.classList.add("right_date");
        console.log("fillGap working secondDate", btn.innerText, currentMonth);
      }


    });
  }

function clearGap() {
  console.log("fclearGap working", btns);
  const btns = Array.from(calendar.childNodes).map((it) => it.childNodes[0]);
  btns.forEach((btn) => {

      btn.parentNode.classList.remove("left_date");
       btn.classList.remove("btn_page-choosed");

      btn.parentNode.classList.remove("right_date");
       btn.classList.remove("btn_page-choosed");

      btn.parentNode.classList.remove("between_date");

  });
}
  //calendar.removeEventListener("click", HandleClick);
}

//setClicks(uniqueId);

//export function setClicks(uniqueId) {
//const monthContent = document.querySelector(
// `div[data-month=title-month${uniqueId}]`
//);
//const forthData = monthContent.children[2];
//const backData = monthContent.children[0];

//forthData.addEventListener("click", function () {
//  addData("add", uniqueId);
//});

//backData.addEventListener("click", function () {
//  addData("min", uniqueId);
//});
//}

//function addData(sign, uniqueId) {
// let newPeriod;
// if (sign === "add") {
//   newPeriod = new Date(currentYear, currentMonth + 1, 1);
// } else {
//   newPeriod = new Date(currentYear, currentMonth - 1, 1);
// }

// currentYear = newPeriod.getFullYear();
// currentMonth = newPeriod.getMonth();

// initMonth(currentMonth, currentYear, uniqueId);
// fill(
//   new Date(currentYear, currentMonth, 1).getDay(),
//   +new Date(currentYear, currentMonth, 1),
//   currentMonth,
//   uniqueId
// );
//}

//clickFooter(uniqueId);

//export function clickFooter(uniqueId) {
// const parent = document.querySelector(
//   `div[data-footer = footer-data${uniqueId}]`
// );
// console.log("parent", parent);
// parent.children[1].addEventListener("click", clickApply);
// parent.children[0].addEventListener("click", clickClear);
//}

function clickApply() {
  closeCalendar(uniqueId);
}

function clickClear() {
  let dataToApply;
  if (leftData) {
    dataToApply = arrivalDate;
    firstInput.value = "";
  }
  if (rightData) {
    dataToApply = leaveDate;
    secondInput.value = "";
  }
}

function transformDate(dataToApply) {
  const day = new Date(dataToApply).getDate();
  const month = new Date(dataToApply).getMonth();
  const year = new Date(dataToApply).getFullYear();
  return `${day}.${month + 1}.${year}`;
}

function closeCalendar(uniqueId) {
  const calendarWrapper = document.getElementById(`calendar-group${uniqueId}`);
  calendarWrapper.classList.remove(`calendar-group-opened`);
}
