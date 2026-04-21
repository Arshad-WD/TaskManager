import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definitaion: {
        openapi: "3.0.0",
        info: {
            title: "Task API",
            version: "1.0.0",
        },
        services :[
            {
                url: "http://localhost:5000/api/v1",
            },
        ],
    },
    apis : ["./src/routes/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);