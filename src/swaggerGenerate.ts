import Dotenv from "dotenv"
import fs from 'fs'

const swaggerAutogen = require('swagger-autogen')()

class SwaggerGenerate {
    private readonly swaggerOutputFile = './build/swaggerOutput.json'
    private readonly endpointsFiles = ['./src/controllers/Routes.ts']

    constructor() {
        Dotenv.config()
    }

    public generate(): void {
        let host = process.env.SERVER_HOST
        let port: number = Number(process.env.SERVER_PORT || 80)
        if(port !== 80){
            host += ":" + port
        }

        const config = {
            info: {
                version: "0.1.0",
                title: process.env.SERVER_NAME,
                description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
            },
            host: host,
            basePath: "/",
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
            securityDefinitions: {
                apiKeyAuth: {
                    type: 'apiKey',
                    in: 'header', // can be 'header', 'query' or 'cookie'
                    name: 'authorization', // name of the header, query parameter or cookie
                    description: 'Bearer jwt token'
                },
                basicApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header', // can be 'header', 'query' or 'cookie'
                    name: 'authorization', // name of the header, query parameter or cookie
                    description: 'Basic Base64(login:senha)'
                }
            }
        }

        try {
            if (!fs.existsSync(this.swaggerOutputFile)) {
                fs.writeFileSync(this.swaggerOutputFile, '{"swagger": "2.0"}')
            }

            swaggerAutogen(this.swaggerOutputFile, this.endpointsFiles, config).then((result: {success: boolean, data: any}|boolean ) => {
                if(result && typeof result !== "boolean" && result.success) {
                    console.log("Swagger generated");
                }else{
                    let json = JSON.stringify(result)
                    console.error("SwaggerError "+json)
                    throw new Error("SwaggerError "+json)
                }
            })
        } catch (err) {
            console.error(err)
            throw new Error(JSON.stringify(err))
        }
    }
}
new SwaggerGenerate().generate()