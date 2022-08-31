axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=karachi&appid=49cc8c821cd2aff9af04c9f98c36eb74&units=metric`)
.then(function (response) {
    // handle success
    console.log(response.data.list[0].main.temp_max);

let q = document.querySelector("#mainTop").innerHTML =
        `<div class="top">
            <div class="day1">${response.data.city.name}</div>
            <img src="img/10d@2x.png" alt="">
            <div class="min"> min: ${response.data.list[0].main.temp_min}</div>
            <div class="max"> max: ${response.data.list[0].main.temp_max}</div>
        </div>`



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
        let minT = document.createTextNode(`${Math.ceil(eachday.main.temp_min / eachday.length)}°C`);
        min.appendChild(minT);
        let max =document.createElement("div");
        let maxT = document.createTextNode(`${Math.ceil(eachday.main.temp_max / eachday.length)}°C`);
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