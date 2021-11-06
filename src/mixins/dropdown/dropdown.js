import "./dropdown.scss";
import { dropdownMenu, Menu } from "./dropdownMenu/dropdownMenu.js";

//function dropdown(uniqueId, id)

const uniqueId = "123";
const dropdown = document.querySelector(`#dropdown${uniqueId}`);
const inputContent = dropdown.childNodes[0].childNodes[0];

const id = "21";
const menu = document.querySelector(`#dropdown-menu${id}`);

class TranslateDropdownContent {
  constructor(inputContent) {
    this.inputContent = inputContent;
  }

  translate(amount) {
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
    let newData = { ...data };
    if (data.взрослые !== 0) {
      newData.гости = data.взрослые;
      delete newData.взрослые;
    }
    if (data.дети !== 0) {
      newData.гости = data.дети;
      delete newData.дети;
    }
    if (data.взрослые !== 0 && data.дети !== 0) {
      newData.гости = data.взрослые + data.дети;
      delete newData.взрослые;
      delete newData.дети;
    }
    if (data["ванные комнаты"] !== 0) {
      newData.ванные = data["ванные комнаты"];
      delete newData["ванные комнаты"];
    }

    const text = Object.keys(newData).reduce((acc, rec) => {
      if (newData[rec] === 0) return acc;

      return acc + newData[rec] + this.translate(newData[rec])[rec];
    }, "");
    this.inputContent.value = text;
  }
}

class DropDown extends Menu {
  constructor(dropdown, input) {
    super(menu);
    this.data = {
      спальни: 0,
      кровати: 0,
      "ванные комнаты": 0,
      дети: 0,
      взрослые: 0,
      младенцы: 0,
    };
    this.dropdown = dropdown;

    this.input = input;
    dropdown.addEventListener("click", this.handleDropdown.bind(this));
  }
  hide() {
    this.dropdown.classList.toggle("dropdown-expanded");
  }

  addToInput(text) {
    this.data[text] += 1;
    this.input.makeInputString(this.data);
  }

  minusToInput(text) {
    this.data[text] -= 1 || 0;
    this.input.makeInputString(this.data);
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

//new DropDown(dropdown, new TranslateDropdownContent(inputContent));
