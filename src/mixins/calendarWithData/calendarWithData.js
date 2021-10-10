import { leaveDate, arrivalDate } from "../calendar/calendarContent/calendarContent";
import "./calendarWithData.scss";

export let leftData = true;
export let rightData = false
const uniqueId = ""


export const firstInput = document.getElementById("first-calendar-input");

const firstOpen = firstInput.nextElementSibling
firstOpen.addEventListener("click", () => {firstDataClick(uniqueId);});

export const secondInput = document.getElementById("second-calendar-input");


const secondOpen = secondInput.nextElementSibling;
console.log("sibling2", secondOpen, secondInput);
secondOpen.addEventListener('click', ()=> {secondDataClick(uniqueId)});

function secondDataClick(uniqueId) {
  if (leftData) {
    leftData = false;
    rightData = true;
  }
  if (!leftData) {
    rightData = true;
    openCalendar(uniqueId);
  }
}


function firstDataClick(uniqueId) {
  if (rightData) {
    rightData = false;
    leftData = true;
  }
  if (!rightData) {
    leftData = true;
    openCalendar(uniqueId);
  }
}

function closeCalendar(uniqueId){
  const calendarWrapper = document.getElementById(`calendar-group${uniqueId}`)
  calendarWrapper.classList.remove(`calendar-group-opened`);

}

function openCalendar(uniqueId){
  const calendarWrapper = document.getElementById(`calendar-group${uniqueId}`);
  calendarWrapper.classList.add(`calendar-group-opened`);
}