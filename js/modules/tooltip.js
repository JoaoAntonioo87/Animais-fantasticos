export default class initTooltip {
  constructor(tooltips) {
    this.tooltips = document.querySelectorAll(tooltips);

    // bind do objeto da classe aos callbacks
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  // Criar a tolltipbox e coloca no body
  criarTooltipBox(element) {
    const tooltipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipBox.classList.add("tooltip");
    tooltipBox.innerText = text;
    document.body.appendChild(tooltipBox);
    this.tooltipBox = tooltipBox;
  }

  onMouseOver({ currentTarget }) {
    // Criar a tooltipbox e coloca em uma propriedade
    this.criarTooltipBox(currentTarget);
    currentTarget.addEventListener("mousemove", this.onMouseMove);
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
  }

  // Remove a tooltip e os eventos de mouse,ouse e mouseleave
  onMouseLeave({ currentTarget }) {
    this.tooltipBox.remove();
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  // Cria a tooltip e adiciona os eventos de mousemove e mouseleave ao target
  onMouseMove(event) {
    if (event.pageX + 240 > window.innerWidth) {
      this.tooltipBox.style.left = event.pageX - 190 + "px";
    } else {
      this.tooltipBox.style.left = event.pageX + 20 + "px";
    }
    this.tooltipBox.style.top = event.pageY + 20 + "px";
  }

  // Adiciona os eventos de mouseover a cada tooltip do site
  addTooltipsEvents() {
    this.tooltips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }

  init() {
    if (this.tooltips.length) {
      this.addTooltipsEvents();
    }
    return this;
  }
}
