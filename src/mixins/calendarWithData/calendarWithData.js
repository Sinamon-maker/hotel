import { calendar } from "../calendar/calendar";
import "./calendarWithData.scss";

openCloseCalendar("224", 2);
calendar("224", 2);
function openCloseCalendar(uniqueId = '', inputAmount) {
  console.log("calendarOwner", calendarOwner);

  const calendarOwner = document.getElementById(`calendar-group${uniqueId}`);
 console.log("calendarOwner", calendarOwner);

  calendarOwner.addEventListener('click', toggleCalendar)


  function toggleCalendar(event){
    if (inputAmount === 2){
      if (event.target.classList.contains("btn_dropdown_down")) {
          this.classList.toggle("calendar-group-opened");
        console.log(event.target, this);
      }
    }
  }
}