import './style.scss'
import show from './mixins/buttons/button'
import "./mixins/rateButtons/ratebuttons";
import "./mixins/list/list";
import "./mixins/listItem/listItem";
import "./mixins/listHeading/listHeading";
import "./mixins/pageList/pageList";

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

