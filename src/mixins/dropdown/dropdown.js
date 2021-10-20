import { stringify } from "querystring";
import "./dropdown.scss";
import { dropdownMenu, Menu } from "./dropdownMenu/dropdownMenu.js";

//function dropdown(uniqueId, id)

const uniqueId = "123";
const dropdown = document.querySelector(`#dropdown${uniqueId}`);


const id = "21";
const menu = document.querySelector(`#dropdown-menu${id}`);
//new Menu(menu)

class DropDown extends Menu {
  constructor(dropdown) {
    super(menu);
    this.dropdown = dropdown;
    this.спальни = 0;
    this.кровати = 0;
    this.ванные = 0;
    this.гости = 0;
    this.младенцы = 0;
    this.data = {};
    dropdown.addEventListener("click", this.handleDropdown.bind(this));
  }
  hide() {
    this.dropdown.classList.toggle("dropdown-expanded");
  }
  translate(amount) {
    console.log("amount", amount);
    const regexp = /\d*([5-9]$|13$|11$|12$|14$|0$)/i;
    if (regexp.test(amount)) {
      return {
        гости: "гостей",
        младенцев: "младенцев",
        спальни: "спален",
        ванные: "ванных комнат",
        кровати: "кроватей",
      };
    }
    if ((amount - 1) % 10 === 0) {
      return {
        гости: "гость",
        младенцев: "младенец",
        спальни: "спальня",
        ванные: "ванная комната",
        кровати: "кровать",
      };
    }
    return {
      гости: "гостя",
      младенцев: "младенца",
      спальни: "спальни",
      ванные: "ванные комнаты",
      кровати: "кровати",
    };
  }

  makeInputString(data) {
    console.log("data", data);
    const text = Object.keys(data).reduce((acc, rec) => {
      console.log(
        this.translate(data[rec]),
        rec,
        this.translate(data[rec])[rec]
      );
      return acc + data[rec] + this.translate(data[rec])[rec];
    }, "");
    console.log(text);
  }

  addToInput(text, amount) {
    if (text === "спальни") {
      this.спальни += 1;
      this.data.спальни = this.спальни;
    }
    if (text === "кровати") {
      this.кровати += 1;
      this.data.кровати = this.кровати;
    }
    if (text === "ванные комнаты") {
      this.ванные += 1;
      this.data.ванные = this.ванные;
    }
    if (text === "взрослые" || text === "дети") {
      this.гости += 1;
      this.data.гости = this.гости;
    }
    if (text === "младенцы") {
      this.младенцы += 1;
      this.data.младенцы = this.младенцы;
    }
    this.makeInputString(this.data);
  }

  minusToInput(text, amount) {
    if (text === "спальни") {
      this.спальни -= 1;
      this.data.спальни = this.спальни;
      if (this.data.спальни === 0) {
        delete this.data.спальни
      };
    }
    if (text === "кровати") {
      this.кровати -= 1;
      this.data.кровати = this.кровати;
      if (this.data.кровати === 0) {
        delete this.data.кровати;
      }
    }
    if (text === "ванные комнаты") {
      this.ванные -= 1;
      this.data.ванные = this.ванные;
      if (this.data.ванные === 0) {
        delete this.data.ванные;
      }
    }
    if (text === "взрослые" || text === "дети") {
      this.гости -= 1;
      this.data.гости = this.гости;
      if (this.data.гости === 0) {
        delete this.data.гости;
      }
    }
    if (text === "младенцы") {
      this.младенцы -= 1;
      this.data.младенцы = this.младенцы;
      if (this.data.младенцы === 0) {
        delete this.data.младенцы;
      }
    }
    this.makeInputString(this.data);
  }

  add(event) {
    super.add(event);
    let amount = event.target.previousElementSibling.innerHTML;
    let data = event.target.parentNode;
    let text = data.previousElementSibling.innerHTML;
    this.addToInput(text, amount);
  }

  minus(event) {
    super.minus(event);
    let amount = event.target.nextElementSibling.innerHTML;
    let data = event.target.parentNode;
    let text = data.previousElementSibling.innerHTML;
     this.minusToInput(text, amount);
  }
  handleDropdown(event) {
    if (event.target.classList.contains("btn_dropdown_down")) {
      this.hide(event);
    }
  }
}

new DropDown(dropdown)