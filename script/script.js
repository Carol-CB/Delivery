document.addEventListener("DOMContentLoaded", () => {
  const pathname = window.location.pathname;

  if (pathname.endsWith("restaurantes.html")) {
    // Para a página de detalhes de restaurante
    getRestaurantDetails();
    getFoodsForRestaurants(); // Mostra as 6 comidas gerais
  } else {
    // Para a página de listagem de restaurantes
    getRestaurants();
  }
});

// Função para obter os restaurantes da API
function getRestaurants() {
  fetch("https://apifakedelivery.vercel.app/restaurants")
    .then(response => response.json())
    .then(data => displayRestaurants(data))
    .catch(error => console.error("Erro ao carregar restaurantes:", error));
}

// Função para exibir os restaurantes na página
function displayRestaurants(restaurants) {
  const restaurantContainer = document.querySelector("#restaurant-list");
  if (!restaurantContainer) {
    console.error("Elemento #restaurant-list não encontrado.");
    return;
  }

  restaurantContainer.innerHTML = ""; // Limpar o conteúdo existente

  restaurants.forEach(restaurant => {
    const card = document.createElement("div");
    card.classList.add("col-lg-4", "col-md-6", "col-12", "mb-3", "mb-sm-0");

    card.innerHTML = `
      <a href="restaurantes.html?id=${restaurant.id}" style="text-decoration: none;">
        <div class="card card-estilo">
          <img src="${restaurant.image}" class="card-img-top" alt="Descrição restaurante">
          <div class="card-body">
            <h5 class="card-title">${restaurant.name}</h5>
            <p class="card-text">${restaurant.description}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Avaliação:</b> ${restaurant.rating}</li>
          </ul>
        </div>
      </a>
    `;

    restaurantContainer.appendChild(card);
  });
}

// Função para obter os detalhes do restaurante
function getRestaurantDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const restaurantId = urlParams.get("id");

  if (!restaurantId) {
    console.error("Parâmetro 'id' não encontrado na URL.");
    return;
  }

  fetch(`https://apifakedelivery.vercel.app/restaurants/${restaurantId}`)
    .then(response => response.json())
    .then(restaurant => displayRestaurantDetails(restaurant))
    .catch(error => console.error("Erro ao carregar detalhes do restaurante:", error));
}

// Função para exibir os detalhes do restaurante
function displayRestaurantDetails(restaurant) {
  const restaurantDetail = document.querySelector("#restaurant-detail");
  if (!restaurantDetail) {
    console.error("Elemento #restaurant-detail não encontrado.");
    return;
  }

  restaurantDetail.innerHTML = `
    <div class="card-body">
        <h5 class="card-title">${restaurant.name}</h5>
        <p class="card-text">${restaurant.description}</p>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><b>Avaliação:</b> ${restaurant.rating}</li>
        </ul>
    </div>
  `;
}

// Função para obter e exibir as comidas (fixas para todos os restaurantes)
function getFoodsForRestaurants() {
  fetch("https://apifakedelivery.vercel.app/foods")
    .then(response => response.json())
    .then(foods => {
      const topFoods = foods.slice(0, 6); // Seleciona as 6 primeiras
      displayFoods(topFoods);
    })
    .catch(error => console.error("Erro ao carregar comidas:", error));
}

// Função para exibir as comidas na página
function displayFoods(foods) {
  const foodContainer = document.querySelector(".row");
  if (!foodContainer) {
    console.error("Elemento .row não encontrado.");
    return;
  }

  foodContainer.innerHTML = ""; // Limpa o container

  if (foods.length === 0) {
    foodContainer.innerHTML = `<p>Não há comidas disponíveis.</p>`;
    return;
  }

  foods.forEach(food => {
    const foodCard = document.createElement("div");
    foodCard.classList.add("card", "col-lg-4", "col-md-6", "col-12", "mb-3", "mb-sm-0");
    foodCard.style.backgroundColor = "#3e4533";
    foodCard.style.border = "none";

    foodCard.innerHTML = `
      <div class="card-estilo">
        <img src="${food.image}" class="card-img-top" alt="Foto da comida">
        <div class="card-body">
          <h5 class="card-title">${food.name}</h5>
          <p class="card-text">${food.description}</p>
          <p><b>R$ ${food.price.toFixed(2)}</b></p>
          <div class="divbotao">
            <a href="comidas.html?id=${food.id}" class="btn btn-success me-md-2 estilo-botao" type="button">
              Detalhes  <img src="imagens/carrinho.png" style="width: 25px;">
            </a>
          </div>
        </div>
      </div>
    `;
    foodContainer.appendChild(foodCard);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const pathname = window.location.pathname;

  if (pathname.endsWith("comidas.html")) {
    getFoodDetails(); // Chama a função para obter os detalhes da comida
  }
});

// Função para buscar os detalhes da comida pela API
function getFoodDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const foodId = urlParams.get("id");

  if (!foodId) {
    console.error("Parâmetro 'id' não encontrado na URL.");
    return;
  }

  fetch(`https://apifakedelivery.vercel.app/foods/${foodId}`)
    .then(response => response.json())
    .then(food => displayFoodDetails(food))
    .catch(error => console.error("Erro ao carregar os detalhes da comida:", error));
}

// Função para exibir os detalhes da comida na página
function displayFoodDetails(food) {
  // Verifica se o elemento existe antes de manipulá-lo
  const foodImage = document.getElementById("food-image");
  const foodName = document.getElementById("food-name");
  const foodPrice = document.getElementById("food-price");
  const foodPrepTime = document.getElementById("food-prep-time");
  const foodDeliveryFee = document.getElementById("food-delivery-fee");
  const foodRating = document.getElementById("food-rating");
  const foodDescription = document.getElementById("food-description");

  if (!foodImage || !foodName || !foodPrice || !foodPrepTime || !foodDeliveryFee || !foodRating || !foodDescription) {
    console.error("Alguns elementos para exibição da comida não foram encontrados no HTML.");
    return;
  }

  foodImage.src = food.image;
  foodName.textContent = food.name;
  foodPrice.textContent = `R$ ${food.price.toFixed(2)}`;
  foodPrepTime.textContent = `${food.time}utos.`;
  foodDeliveryFee.textContent = `R$ ${food.delivery.toFixed(2)}`;
  foodRating.textContent = food.rating.toFixed(1);
  foodDescription.textContent = food.description;
}
