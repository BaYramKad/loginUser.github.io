document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    const buttons = document.querySelector(".buttons"),
        output = document.querySelector(".output"),
        strong = document.getElementById("strong"),
        section = document.querySelector(".section");
    
    buttons.addEventListener("click", event => {
        let target = event.target;
        if (target.matches("#registration")) {
            registrationUser();
        } else if (target.matches("#login")) {
            loginUse();
        }
    });

    const userData = function(){
        return JSON.parse(localStorage.getItem("userData")) || localStorage.setItem("userData", JSON.stringify([]));
    }
    userData();
    
    const getTime = () => {
        let dateUserReg = new Date(),
            time = dateUserReg.toLocaleTimeString("ru"),
            date = dateUserReg.toLocaleDateString("ru");
        const dateNow = [date, time].join("г., ");
        return dateNow;
    };

    const registrationUser = () => {
        const time = getTime();
        let  user = prompt("Введите через пробел Имя и Фамилию пользователя").split(" "),
            login = prompt("Введите Логин"),
            password = prompt("Введите Пароль");

        while (user, login, password === ""){
            user = prompt("Вы не указали Имя, логин или пароль пользователя").split(" "),
            login = prompt("Логин"),
            password = prompt("Пароль");
        }
        let data = userData();
        data.push({
            login,
            password,
            time,
            name : user[0],
            lastName : user[1]
        }); 
        localStorage.setItem("userData", JSON.stringify(data));
        render();
    };

    const render = () => {
        output.innerHTML = "";
        const dataUserStorage = JSON.parse(localStorage.getItem("userData"));
        dataUserStorage.forEach((item, i) => {
            if (item.lastName === undefined || item.lastName === "") {
                item.lastName = "Не указана";
            }
            let newUser = `<li data-id=${i}>Имя: ${item.name}, Фамилия: ${item.lastName}, Зарегестрирован: ${item.time} <button data-id="${i}" id="btn-close">Удалить</button></li> `;
            output.insertAdjacentHTML("beforeend", newUser);
        });
        
    };
    render();

    const closeLi = (elem) => {
        let data = userData();
        data.splice(elem, 1);
        localStorage.setItem("userData", JSON.stringify(data))
        render();
    };
    section.addEventListener("click", event => {
        let target = event.target;
        if (target.matches("#btn-close")) {
            closeLi(+target.closest("li").dataset.id)
        }
    });

    const loginUse = () => {
        const dataUser = prompt("Введите логни"),
            password = prompt("Введите пароль");
    };
});
    