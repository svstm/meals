const input = document.getElementById("queryInput");
const button = document.getElementById("sendRequest");
const results = document.getElementsByClassName("results")[0];

async function search() {
  const input = document.getElementById("queryInput").value;
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
  );
  const data = await res.json();
  console.log(data);
  results.innerHTML = "";
  if (data.meals) {
    data.meals.forEach((element) => {
      const dish_container = document.createElement("meal-container");
      dish_container.classList.add("dish_container");
      dish_container.addEventListener("click", () => show_more(element));

      const dish_image = document.createElement("div");
      dish_image.style.backgroundImage = `url(${element.strMealThumb})`;
      dish_image.classList.add("image");

      const dish_title = document.createElement("div");
      dish_title.innerText = `${element.strMeal}`;
      dish_title.classList.add("title");

      dish_container.appendChild(dish_image);
      dish_container.appendChild(dish_title);
      results.appendChild(dish_container);
    });
  } else {
    alert("Nothing found!");
  }
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    search();
  }
});

button.addEventListener("click", search);

const doc = document.getElementsByTagName("body")[0];

function blackOverlay(to_remove) {
  const black = document.createElement("div");
  black.setAttribute("id", "black");
  doc.appendChild(black);
  black.addEventListener("click", () => {
    remove(to_remove);
    remove(black);
  });
}

function remove(rm) {
  rm.remove();
}

function show_more(element) {
  const info = document.createElement("div");
  blackOverlay(info);
  info.style.width = "850px";
  info.style.height = "700px";
  info.style.backgroundColor = "white";
  info.style.boxShadow = "2px 2px 5px black";
  info.style.borderRadius = "5px";
  info.style.zIndex = "3";
  info.style.position = "fixed";
  info.style.top = "50%";
  info.style.left = "50%";
  info.style.transform = "translate(-50%, -50%)";
  info.classList.add("info");
  info.style.justifyContent = "left";
  info.style.alignItems = "top";
  doc.appendChild(info);
  const img = document.createElement("img");
  img.classList.add("img_modal");
  img.src = element.strMealThumb;
  info.appendChild(img);
  const p = document.createElement("p");
  p.style.fontWeight = "bold";
  p.style.textAlign = "center";
  p.style.fontSize = "2rem";
  info.appendChild(p);
  const ing = ingridients(element);
  info.appendChild(ing);

  const instructions = document.createElement("p");
  instructions.classList.add("instructions");
  instructions.innerText = element.strInstructions;
  info.appendChild(instructions);

  const close = document.createElement("div");
  info.appendChild(close);
  close.style.backgroundImage = "url('./icons8-close.svg')";
  close.style.backgroundSize = "contain";
  close.style.width = "20px";
  close.style.height = "20px";
  close.style.position = "fixed";
  close.style.top = "10px";
  close.style.right = "10px";
  close.addEventListener("click", () => {
    remove(info);
    if ((k = document.getElementById("black"))) remove(k);
  });
  p.innerText = `${element.strMeal}`;
}

function ingridients(element) {
  const ing = document.createElement("div");
  ing.classList.add("ingredients");
  console.log(element[`strIngredient${1}`]);
  for (i = 1; element[`strIngredient${i}`]; i++) {
    const name = document.createElement("p");
    name.innerText = element[`strIngredient${i}`];

    const amount = document.createElement("p");

    amount.innerText = element[`strMeasure${i}`];
    ing.appendChild(name);
    ing.appendChild(amount);
  }
  return ing;
}
