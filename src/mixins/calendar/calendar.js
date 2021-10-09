import "./calendar.scss";
import "./calendarContent/calendarContent";
import fill, {year, month,} from "./calendarContent/calendarContent";

let currentYear = year
let currentMonth = month;


const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

function initMonth(text1, text2){
const monthContent = document.querySelector('div[data-month="title-month"]');
 monthContent.children[1].innerHTML = `${months[text1]} ${text2}`;

}

initMonth(currentMonth, currentYear);

setClicks()

function setClicks() {
  const monthContent = document.querySelector('div[data-month="title-month"]');
  const forthData = monthContent.children[2];
  const backData = monthContent.children[0];
  forthData.addEventListener("click", function () {
    addData("add");
  });
  backData.addEventListener("click", function () {
    addData("min");
  });
}

function addData(sign){
  let newPeriod
  if(sign === 'add'){
    newPeriod = new Date(currentYear, currentMonth + 1, 1);
  }
  else{
    newPeriod = new Date(currentYear, currentMonth - 1, 1);
  }

  currentYear = newPeriod.getFullYear();
  currentMonth = newPeriod.getMonth();

    initMonth(currentMonth, currentYear);
    fill(
      new Date(currentYear, currentMonth, 1).getDay(),
      +new Date(currentYear, currentMonth, 1),
      currentMonth
    );
}


