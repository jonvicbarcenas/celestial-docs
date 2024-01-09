const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Dainsleif API's",
      version: "0.1.1",
      description:
        "This is a simple API application for dainsleif bot",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "JV Barcenas",
        url: "https://www.facebook.com/jonvicbarcenas",
        email: "humbamanok1@gmail.com",
      },
    },
    /*servers: [
      {
        url: "https://chatgayfeyti.archashura.repl.co/",
      },
      {
        url: "https://oldgpt.corpselaugh.repl.co/",
      },
    ],*/
    tags: [
      {
        name: "AI API",
        description: "Everything about AI API",
        externalDocs: {
          description: "Find out more",
          url: "https://celestial-dainsleif-docs.archashura.repl.co/api-docs/",
        },
      },
      {
        name: "Imagen API",
        description: "Image Generation API UwU",
        externalDocs: {
          description: "Find out more",
          url: "https://celestial-dainsleif-docs.archashura.repl.co/api-docs/",
        },
      },
      {
        name: "Rest API",
        description: "My kind of rest api includes image",
        externalDocs: {
          description: "Find out more",
          url: "https://celestial-dainsleif-docs.archashura.repl.co/api-docs/",
        },
      },
      {
        name: "Font Generation",
        description: "Text font",
        externalDocs: {
          description: "Find out more",
          url: "https://celestial-dainsleif-docs.archashura.repl.co/api-docs/",
        },
      },
      {
        name: "MAINTENANCE",
        description: "STILL IN MAINTENANCE. CONTACT DEV",
        externalDocs: {
          description: "Contact here",
          url: "https://www.facebook.com/jonvicbarcenas",
        },
      },
    ],
  },
  apis: ["./routes/*.js"],
};

module.exports = options;