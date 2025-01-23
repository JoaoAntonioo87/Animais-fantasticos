import outsideClick from "./outsideclick.js";

export default class DropdownMenu {
  constructor(dropdownMenu, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenu);
    this.activeClass = "active";

    // define touchstart e click como argumentos padrões caso o usuário não define.

    if (events === undefined) this.events = ["touchstart", "click"];
    else this.events = events;

    this.activeDropdownMenu = this.activeDropdownMenu.bind(this);
  }

  // Ativa o dropdown menu e adiciona a função que observa o clique fora dele.
  activeDropdownMenu(event) {
    const element = event.currentTarget;
    event.preventDefault();
    this.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove("active");
    });
  }

  // Adiciona os eventos ao dropdown menu
  addDropdownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropdownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropdownMenusEvent();
    }
    return this;
  }
}
