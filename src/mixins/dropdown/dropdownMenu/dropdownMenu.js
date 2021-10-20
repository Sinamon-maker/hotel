
import "./dropdownMenu.scss";

const id = '222'
const menu = document.querySelector(`#dropdown-menu${id}`)
let amount = 0

export function dropdownMenu(menu, amount){
menu.addEventListener("click", function (event) {
  handleClick(event);
});

function handleClick(event) {
  if (event.target.classList.contains("btn_round-minus")) {
    let data = event.target.nextElementSibling;
    data.innerHTML = +event.target.nextElementSibling.innerHTML - 1;
    amount = amount - 1;
    if (data.innerHTML === "0") {
      event.target.disabled = true;
    }
  }

  if (event.target.classList.contains("btn_round-add")) {
    let data = event.target.previousElementSibling;
    data.innerHTML = +event.target.previousElementSibling.innerHTML + 1;
    amount = amount + 1;
console.log("amount", amount);
    if (data.innerHTML === "1") {
      let buttonMinus = data.previousElementSibling;
      buttonMinus.disabled = false;
    }
  }
}
return amount
}
//dropdownMenu(menu,0);

const buton = document.getElementById("btn");
//console.log(buton)
export class Menu {
  constructor(menu) {
    this.menu = menu;
    menu.addEventListener("click", this.handleClick.bind(this));
  }
  add(event) {
    let data = event.target.previousElementSibling;
    data.innerHTML = +event.target.previousElementSibling.innerHTML + 1;

    console.log("add");
    if (data.innerHTML === "1") {
      let buttonMinus = data.previousElementSibling;
      buttonMinus.disabled = false;
    }
  }
  minus(event) {
    let data = event.target.nextElementSibling;
    data.innerHTML = +event.target.nextElementSibling.innerHTML - 1;
      if (data.innerHTML === "0") {
      event.target.disabled = true;
    }
  }

  handleClick(event) {
    if (event.target.classList.contains("btn_round-add")) {
      this.add(event);
    }
    if (event.target.classList.contains("btn_round-minus")) {
      this.minus(event);
    }
  }
}

new Menu(menu);

