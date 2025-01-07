const cars = require('./cars.json')
const drivers = require('./drivers.json')
const http = require('http')

const server = http.createServer((req, res) => {
    const { method, url } = req
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500") //https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin

    console.log(url)

    if (method === "GET" && url.startsWith("/cars")) {

        // http://localhost:3000/cars?q=ford&isElectric=true
        const queryString = url.split("?")[1]
        const queryParameters = queryString.split("&")

        const params = queryParameters.map((item) => {
            const key = item.split("=")[0]
            const value = item.split("=")[1]
            return { key, value}
        })

        console.log(params)

        const myUrl = new URL("http://localhost:5500" + url)
        const q = myUrl.searchParams.get("q")
        const brand = myUrl.searchParams.get("isElectric")

        console.log(q)
        console.log(brand)

        


        // return all cars, as JSON
        res.statusCode = 200
        res.end(JSON.stringify(cars))
        
    } else if (method === "GET" && url === "/drivers") {
        // return all drivers, as JSON
        res.statusCode = 200
        res.end(JSON.stringify(drivers))

    } else if (method === "POST" && url === "/cars") {
        // console.log("Endpoint hit: POST /cars")
        let reqBody = ''
        req.on("data", (chunk) => {
            reqBody += chunk
        })
        req.on("end", () => {
            // echo the reqBody to the client
            // console.log("Return response")
            console.log(reqBody)
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