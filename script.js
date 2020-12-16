document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    const output = document.getElementById("output");

    const getRequest = (url) => {
        return new Promise( function(resolve, reject){
            const request = new XMLHttpRequest();
            request.open("GET", url);
            request.addEventListener("readystatechange", () => {
                
                if (request.readyState !== 4) {
                    return;
                }

                if (request.status === 200) {
                    const data = JSON.parse(request.responseText);
                    resolve(data);
                } else {
                    reject(request.statusText);
                }

            });
            request.send();
        });
    };

    const getData = (data) => {
        console.log(data);
        data.forEach( item => {
            output.insertAdjacentHTML("beforebegin", `<h5>${item.title}<h5>
                                    <img src="${item.thumbnailUrl}">`);
        });
    };
    const oneImg = getRequest("https://jsonplaceholder.typicode.com/photos/1"),
        twoImg = getRequest("https://jsonplaceholder.typicode.com/photos/2");

    
    Promise.all([oneImg, twoImg])
        .then(getData)
        .catch( (error) => console.log(error));

});