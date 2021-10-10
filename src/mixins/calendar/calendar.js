import "./calendar.scss";
import "./calendarContent/calendarContent";
import fill, {year, month, leaveDate, arrivalDate} from "./calendarContent/calendarContent";
import {
  firstInput,
  secondInput,
  leftData,
  rightData,
} from "../calendarWithData/calendarWithData";

let currentYear = year
let currentMonth = month;

const uniqueId = "";

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export function initMonth(text1, text2){
const monthContent = document.querySelector(
  `div[data-month=title-month${uniqueId}]`
);
 monthContent.children[1].innerHTML = `${months[text1]} ${text2}`;

}

initMonth(currentMonth, currentYear,uniqueId);

setClicks(uniqueId);

export function setClicks(uniqueId) {
  const monthContent = document.querySelector(
    `div[data-month=title-month${uniqueId}]`
  );
  const forthData = monthContent.children[2];
  const backData = monthContent.children[0];

  forthData.addEventListener("click", function () {
    addData("add", uniqueId);
  });

  backData.addEventListener("click", function () {
    addData("min", uniqueId);
  });
}

function addData(sign, uniqueId) {
  let newPeriod;
  if (sign === "add") {
    newPeriod = new Date(currentYear, currentMonth + 1, 1);
  } else {
    newPeriod = new Date(currentYear, currentMonth - 1, 1);
  }

  currentYear = newPeriod.getFullYear();
  currentMonth = newPeriod.getMonth();

  initMonth(currentMonth, currentYear, uniqueId);
  fill(
    new Date(currentYear, currentMonth, 1).getDay(),
    +new Date(currentYear, currentMonth, 1),
    currentMonth,
    uniqueId
  );
}

clickFooter(uniqueId);

export function clickFooter(uniqueId) {
  const parent = document.querySelector(
    `div[data-footer = footer-data${uniqueId}]`
  );
  console.log("parent", parent);
  parent.children[1].addEventListener("click", clickApply);
  parent.children[0].addEventListener("click", clickClear);
}



function clickApply(){
closeCalendar(uniqueId);
}

function clickClear(){
  let dataToApply;
  if (leftData) {
    dataToApply = arrivalDate;
    firstInput.value = '';
  }
  if (rightData) {
    dataToApply = leaveDate;
    secondInput.value = '';
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