
import "./dropdownMenu.scss";

export default function show() {
  console.log("hi i am from dropdownMenu");
}
show();

const id = '123'
const menu = document.querySelector(`#dropdown-menu${id}`)

console.log(menu)
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

//new Menu(menu);

