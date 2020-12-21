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

    const regUser = (user, password, login) => {
        const time = getTime();

        while (user, login, password === ""){
            user = prompt("Вы не указали Имя, логин или пароль пользователя").split(" ");
            login = prompt("Логин");
            password = prompt("Пароль");
        }

        return { 
            time,
            login,
            password,
            name : user[0],
            lastName : user[1]
        } 
    };

    const registrationUser = () => {
        try {
            const user = prompt("Введите через пробел Имя и Фамилию пользователя").split(" "),
                login = prompt("Введите Логин"),
                password = prompt("Введите Пароль");

            const data = userData(),
            userUs = regUser(user, password, login);
            data.push(userUs); 
            localStorage.setItem("userData", JSON.stringify(data));
            render();
        } catch {
            return;
        }
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
        localStorage.setItem("userData", JSON.stringify(data));
        render();
    };

    section.addEventListener("click", event => {
        let target = event.target;
        if (target.matches("#btn-close")) {
            closeLi(+target.closest("li").dataset.id);
        }
    });

    const userLogIn = (log, pass) => {
        while (log, pass === "") {
            log = prompt("Введите логин");
            pass = prompt("Введите пароль");
        }

        return { log, pass};
    };

    const loginUse = () => {
        const login = prompt("Введите логин"),
            password = prompt("Введите пароль");

        const data = userData();
        const logIn = userLogIn(login, password)
        data.forEach(elem => {
            if (logIn.log === elem.login && logIn.pass === elem.password) {
                strong.textContent = elem.name;
            } else {
                alert("Не правильный логни или пароль")
            }
        });
    };
});