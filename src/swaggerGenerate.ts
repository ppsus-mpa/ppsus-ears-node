import Dotenv from "dotenv"
import fs from 'fs'

const swaggerAutogen = require('swagger-autogen')()

class SwaggerGenerate {
    public readonly swaggerOutputFile = './build/swaggerOutput.json'
    public readonly endpointsFiles = ['./src/controllers/Routes.ts']

    constructor() {
        Dotenv.config()
    }

    public generate(): void {
        const config = {
            info: {
                version: "0.1.0",
                title: process.env.SERVER_NAME,
                description: "Documentation automatically generated by the <b>swagger-autogen</b> module."
            },
            host: process.env.SERVER_HOST + ":" + process.env.SERVER_PORT,
            basePath: "/",
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
        }

        try {
            if (!fs.existsSync(this.swaggerOutputFile)) {
                fs.writeFileSync(this.swaggerOutputFile, '{"swagger": "2.0"}')
            }

            swaggerAutogen(this.swaggerOutputFile, this.endpointsFiles, config).then((result: {success: boolean, data: any}|boolean ) => {
                if(result && typeof result !== "boolean" && result.success) {
                    console.log(result)
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