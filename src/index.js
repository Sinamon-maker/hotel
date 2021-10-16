import "./style.scss";
import show from "./mixins/buttons/button";
import "./mixins/rateButtons/ratebuttons";
import "./mixins/list/list";
import "./mixins/listItem/listItem";
import "./mixins/listHeading/listHeading";
import "./mixins/pageList/pageList";
import "./mixins/checkbox/checkbox";
import "./mixins/checkboxList/checkboxList";
import "./mixins/richList/richList";
import "./mixins/bulletList/bulletList";
import "./mixins/expandableList/expandableList";
import "./mixins/simpleList/simpleList";
import "./mixins/label/label";
import "./mixins/container/container";
import "./components/header/header";
import "./mixins/input/input";
import "./mixins/inputWithButton/inputWithButton";
import "./mixins/subscription/subscription";
import "./components/footer/footer";
import "./components/underFooter/underFooter";
import "./mixins/dropdown/dropdownMenu/dropdownMenu";
import "./mixins/number/sliderButtons/sliderButtons";
import "./mixins/dropdown/dropdown";
import "./mixins/radioGroup/radioGroup";
import "./mixins/toggle/toggle";
import "./mixins/comfort/comfort";
import "./mixins/inputData/inputData";
import "./mixins/calendarWithData/calendarWithData";
import "./forms/enterForm/enterForm";
import "./mixins/flexExpanded/flexExpanded";
import "./forms/formTemplate/formTemplate";
import "./forms/formRegister/formRegister";
import "./mixins/number/number";

//import "./mixins/calendar/calendarContent/calendarContent";
import "./mixins/calendar/calendar";
//import fill from "./mixins/calendar/calendarContent/calendarContent";
//import fillo from "./mixins/calendar/calendar";


const heading = document.createElement("h6");
heading.textContent = "Как интересно!";

// добавляем заголовок в DOM
const root = document.getElementsByTagName("h3");
root.append(heading);

//window.onload = function () {
// require("./mixins/buttons/button.js");
//};
show();
//fill()
//fillo()
