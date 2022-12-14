const container = document.querySelector(".data");
function toolTip(graphs) {
  graphs.forEach((graph) => {
    graph.addEventListener("mousemove", (e) => {
      const { clientY: Y } = e;
      const { y: boxY } = graph.getBoundingClientRect();
      let mouseLocalY = Y - boxY;
      let tooltip = graph.nextElementSibling;
      const { height } = tooltip.getBoundingClientRect();
      tooltip.style.transform = `translateY(-${mouseLocalY - height - 5}px)`;
    });
    graph.addEventListener("mouseenter", function () {
      let tooltip = graph.nextElementSibling;
      tooltip.style.display = "initial";
    });
    graph.addEventListener("mouseleave", function () {
      let tooltip = graph.nextElementSibling;
      tooltip.style.display = "none";
    });
  });
}
function createGraph(data) {
  let highest = data.reduce(
    (acc, mov) => (acc.amount > mov.amount ? acc : mov),
    0
  );
  data.forEach((data) => {
    let body1 = document.createElement("div");
    body1.classList.add("body1");
    let graph = document.createElement("div");
    graph.classList.add("graph");
    graph.style.height = `${data.amount}%`;
    if (data.amount === highest.amount) {
      graph.style.backgroundColor = "hsl(186, 34%, 60%)";
    }
    let span = document.createElement("span");
    span.classList.add("tolltip");
    span.textContent = `$${data.amount}`;
    let text = document.createElement("p");
    text.classList.add("text");
    text.textContent = data.day.toUpperCase();
    body1.append(graph, span, text);
    container.appendChild(body1);
  });
  const graphs = document.querySelectorAll(".graph");
  toolTip(graphs);
}
async function datas() {
  let obj = await fetch("./data.json");
  let data = await obj.json();
  createGraph(data);
}
datas();
