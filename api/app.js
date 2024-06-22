const root = document.querySelector("#root");

const userImageImg = document.createElement("img");
userImageImg.src = "./image/user.png";
userImageImg.alt = "user";

async function getUser(id) {
  root.innerHTML = "";
  const backButton = document.createElement("button");
  backButton.textContent = "Назад";
  backButton.classList.add("back-button");
  backButton.addEventListener("click", () => {
    history.pushState(null, null, "/");
    showUsers();
  });

  const userContainer = document.createElement("div");
  userContainer.classList.add("user-container");

  try {
    const response = await fetch(`https://jsonplaceholder.org/users/${id}`);
    const data = await response.json();

    const userCard = document.createElement("article");
    userCard.classList.add("user-card");

    const userImage = document.createElement("div");
    userImage.classList.add("user-image");

    userImage.append(userImageImg);
    userCard.append(userImage);

    const userName = document.createElement("h1");
    userName.classList.add("user-name");
    userName.textContent = data.firstname + " " + data.lastname;
    userCard.append(userName);

    userContainer.append(userCard);

    let birthDate = new Date(data.birthDate);
    let today = new Date();
    let ageInMilliseconds = today - birthDate;
    let ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
    ageInYears = Math.floor(ageInYears);

    const userAge = document.createElement("p");
    userAge.classList.add("user-age");
    userAge.textContent = "Возраст: " + ageInYears;
    userCard.append(userAge);

    const userEmail = document.createElement("p");
    userEmail.classList.add("user-email");
    userEmail.textContent = "Email: " + data.email;
    userCard.append(userEmail);

    const userContact = document.createElement("p");
    userContact.classList.add("user-contact");
    userContact.textContent = "Тел: " + data.phone;
    userCard.append(userContact);

    const userAddress = document.createElement("p");
    userAddress.classList.add("user-address");
    userAddress.textContent = "Город: " + data.address.city;
    userCard.append(userAddress);

    const userCompany = document.createElement("p");
    userCompany.classList.add("user-company");
    userCompany.textContent = "Компания: " + data.company.name;
    userCard.append(userCompany);

    const userWebsite = document.createElement("p");
    userWebsite.classList.add("user-website");
    userWebsite.textContent = "Вебсайт: " + data.website;
    userCard.append(userWebsite);

    root.append(backButton, userContainer);
  } catch (error) {
    console.log(error + "Ошибка вывода пользователя");
  }

  history.pushState({ userId: id }, `User ${id}`, `?user=${id}`);
}

async function showUsers() {
  root.innerHTML = "";
  const userContainer = document.createElement("div");
  userContainer.classList.add("user-content");

  try {
    await fetch("https://jsonplaceholder.org/users")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((user) => {
          const userList = document.createElement("ul");
          userList.classList.add("user-list");

          const userName = document.createElement("li");
          userName.classList.add("user-item");
          userName.textContent = user.firstname + " " + user.lastname;
          userList.append(userName);

          userContainer.append(userList);

          root.append(userContainer);

          userList.addEventListener("click", () => {
            getUser(user.id);
          });
        });
      });
  } catch (error) {
    console.log(error + "Ошибка вывода пользователей");
  }
}

window.onpopstate = function (event) {
  if (event.state && event.state.userId) {
    getUser(event.state.userId);
  } else {
    showUsers();
  }
};

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("user");
if (userId) {
  getUser(userId);
} else {
  showUsers();
}
