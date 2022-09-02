//Heading
let h1 = document.createElement("h1");
let hiT = document.createTextNode("Weather Forecast App");
h1.appendChild(hiT);
document.querySelector("#head").appendChild(h1);

//InputBox
// let form = document.createElement("form")
// form.setAttribute("onsubmit", "submit()")
let InputBox = document.createElement("input");
InputBox.setAttribute("id", "inp1")
InputBox.setAttribute("placeholder", "Enter Your City Name");
// form.appendChild(InputBox);
// console.log(form);
document.querySelector("#input").appendChild(InputBox);

//Button
let btn = document.createElement("button");
btn.setAttribute("onclick", "submit()")
let btnT = document.createTextNode("Submit");
btn.appendChild(btnT);
document.querySelector("#btn").appendChild(btn);

function submit() {
    let get = document.querySelector("#mainTop");
    let set = document.querySelector("#allDiv");
    get.innerHTML = "";
    set.innerHTML = "";
    let inp = document.querySelector("#inp1").value;
    // console.log();
    console.log(get);
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${inp}&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`)
        .then(function (response) {
            // handle success
            console.log(response.data.list[0].main.temp_max);
            // Today's Card.

            let topDiv = document.createElement("div");
            topDiv.setAttribute("class", "top");
            //
            let day1 = document.createElement("div");
            day1.setAttribute("class", "day1");
            let day1T = document.createTextNode(`${response.data.city.name}`);
            day1.appendChild(day1T);
            //
            let day2 = document.createElement("div");
            day2.setAttribute("class", "day2");
            let day2T = document.createTextNode(`${moment(response.data.list[0].dt_txt).format('ddd')}`);
            day2.appendChild(day2T);
            //
            let img1 = document.createElement("img");
            img1.setAttribute("src", "img/10d@2x.png");
            // console.log(img1);
            //
            let min01 = document.createElement("div");
            min01.setAttribute("class", "min");
            let min01T = document.createTextNode(`min: ${Math.ceil(response.data.list[0].main.temp_min)}°C`);
            min01.appendChild(min01T);
            // console.log(min);
            //
            let max01 = document.createElement("div");
            max01.setAttribute("class", "max");
            let max01T = document.createTextNode(`max: ${Math.ceil(response.data.list[0].main.temp_max)}°C`);
            max01.appendChild(max01T);
            //
            topDiv.appendChild(day1);
            topDiv.appendChild(day2);
            topDiv.appendChild(img1);
            topDiv.appendChild(min01);
            topDiv.appendChild(max01);
            //
            document.querySelector("#mainTop").appendChild(topDiv);

            // Forecast Section.
            let dayWise = [];
            let dateOfMonth = null;
            let counter = -1;
            response.data.list.map(eachHour => {
                let tempDateOfMonth = new Date(eachHour.dt_txt).getDate();
                // console.log(tempDateOfMonth)
                if (dateOfMonth !== tempDateOfMonth) {
                    counter++;
                    dateOfMonth = tempDateOfMonth;
                }
                if (!dayWise[counter]) { dayWise[counter] = [] };
                dayWise[counter].push(eachHour);
            })
            console.log(dayWise);


            dayWise = dayWise.map((eachday) => {
                return eachday.reduce((previousEachHour, currentEachHour) => {
                    let sumTemp = Number(previousEachHour.main.temp) + Number(currentEachHour.main.temp);
                    let sumMinTemp = Number(previousEachHour.main.temp_min) + Number(currentEachHour.main.temp_min);
                    let sumMaxTemp = Number(previousEachHour.main.temp_max) + Number(currentEachHour.main.temp_max);
                    // let sumDay = (previousEachHour.main.dt_txt) + (currentEachHour.main.dt_txt);

                    return {
                        main: {
                            temp: sumTemp,
                            temp_min: sumMinTemp,
                            temp_max: sumMaxTemp,

                        },
                        dt_txt: currentEachHour.dt_txt,
                        length: eachday.length
                    }


                }, {
                    main: {
                        temp: 0,
                        temp_min: 0,
                        temp_max: 0,
                    }

                })
            })
            console.log("final: ", dayWise)

            dayWise.map(eachday => {
                let divAll = document.createElement("div");
                divAll.setAttribute("class", "boxDiv");
                let div1 = document.createElement("div")
                div1.setAttribute("class", "day")
                let div1T = document.createTextNode(`${moment(eachday.dt_txt).format('ddd')}`)
                div1.appendChild(div1T);
                let img = document.createElement("img");
                img.setAttribute("src", "img/10d@2x.png")
                let min = document.createElement("div");
                let minT = document.createTextNode(`min: ${Math.ceil(eachday.main.temp_min / eachday.length)}°C`);
                min.appendChild(minT);
                let max = document.createElement("div");
                let maxT = document.createTextNode(`max: ${Math.ceil(eachday.main.temp_max / eachday.length)}°C`);
                max.appendChild(maxT)
                divAll.appendChild(div1);
                divAll.appendChild(img);
                divAll.appendChild(min);
                divAll.appendChild(max);

                document.querySelector("#allDiv").appendChild(divAll);

            })

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}