const cars = require('./cars.json')
const drivers = require('./drivers.json')

const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
    const { method, url } = req
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "*") //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin

    console.log(url)

    if (method === "GET" && url === "/cars") {
        // return all cars, as JSON
        res.statusCode = 200
        res.end(JSON.stringify(cars))
    }
    else if (method === "GET" && url.startsWith("/cars")) {

        // http://localhost:3000/cars?brand=ford&isElectric=true&order=asc

        // const queryString = url.split("?")[1]
        // const queryParameters = queryString.split("&")

        // const params = queryParameters.map((item) => {
        //     const key = item.split("=")[0]
        //     const value = item.split("=")[1]
        //     return { key, value }
        // })

        // console.log(params)

        const myUrl = new URL("http://localhost:5500" + url)
        const brand = myUrl.searchParams.get("brand")
        const isElectric = myUrl.searchParams.get("isElectric")
        const order = myUrl.searchParams.get("order")

        console.log(brand)
        console.log(isElectric)
        console.log(order)

        // Remember to stack the filters, not to filter the original "cars" list multiple times
        let currentCarList = [...cars]

        if (!!brand)
            currentCarList = filterCarsByBrand(brand)
        
        if (!!isElectric)
            currentCarList = filterCarsByIsElectric(currentCarList, isElectric)
        
        orderCars(currentCarList, order)

        // return all cars, as JSON
        res.statusCode = 200
        res.end(JSON.stringify(currentCarList))

    } else if (method === "GET" && url === "/drivers") {
        // return all drivers, as JSON
        res.statusCode = 200
        res.end(JSON.stringify(drivers))

    } else if (method === "POST" && url === "/cars") {
        console.log("Endpoint hit: POST /cars")
        let reqBody = ''
        req.on("data", (chunk) => {
            reqBody += chunk
        })
        req.on("end", () => {
            // echo the reqBody to the client
            // console.log("Return response")

            const jsNewCar = JSON.parse(reqBody)
            const newCarList = [...cars, jsNewCar]

            // Make sure our new car list includes the newest car that was just POSTed to us
            console.log(newCarList)

            // Save this new car list to cars.json
            fs.writeFileSync('./cars.json', JSON.stringify(newCarList))
            // const data = fs.readFileSync('./cars.json')

            res.statusCode = 201
            res.end(reqBody) // errors? format of the resp? serialize (covert)?
        })
    } else {
        // 404
        res.statusCode = 404

        const error404 = {
            error: "404: Resource not located",
            message: "The content you are trying to locate does not exist."
        }

        res.end(JSON.stringify(error404))
    }
})

server.listen(3000)

function filterCarsByBrand(carBrand) {
    console.log("filterCarsByBrand() fired!")
    
    return cars.filter((car) => car.brand.toUpperCase() === carBrand.toUpperCase())
}

function filterCarsByIsElectric(currentCarList, isElectric) {
    console.log("filterCarsByIsElectric() fired!")
    console.log(isElectric)
    
    // We're comparing a Boolean with a string
    // car object has a Boolean isElectric property
    // isElectric query parameter has a string value
    return currentCarList.filter((car) => car.isElectric.toString().toUpperCase() === isElectric.toUpperCase())
}

function orderCars(currentCarList, order) {
    console.log("orderCars() fired!")
    console.log(currentCarList)

    currentCarList.sort((a, b) => {
        if (a.model > b.model) return 1
        else if (a.model < b.model) return -1
        else return 0
    })
    // decide which way to sort by model
    if (order === "asc") {
        return
    } else if (order === "dec") {
        currentCarList.reverse()
        return
    }

    // This would also work
    // return order === "asc" ? sortedCars : sortedCars.reverse()
}