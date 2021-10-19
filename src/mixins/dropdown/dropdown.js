import "./dropdown.scss";
import { dropdownMenu } from "./dropdownMenu/dropdownMenu.js";

function dropdown(uniqueId, id) {
  let amount = 0;
  const menu = document.querySelector(`#dropdown-menu${id}`);


  dropdownMenu(menu, amount);
  console.log("amounttttt", amount);
  intoInput(amount);
}

dropdown('123', '21');

function translate(x){
   if ((x-1)% 10 === 0 && x !==11){
     return `${x} Гость`;
   }
  if (x <=4){
    return `${x} Гостя`
  }
   if (x === 11 || (x > 4 && x <= 20)) {
     return `${x} Гостей`;
   }
}
function intoInput(str){
  console.log("string", str);
  let string = ''
if (str !== 0) {
  string = translate(str);
  console.log("string", string);
  return string
}
}