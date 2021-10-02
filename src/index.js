import './style.scss'
import show from './mixins/buttons/button'
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

console.log('show')

const heading = document.createElement('h6')
heading.textContent = 'Как интересно!'

// добавляем заголовок в DOM
const root = document.getElementsByTagName('h3')
root.append(heading)


//window.onload = function () {
 // require("./mixins/buttons/button.js");
//};
show()

