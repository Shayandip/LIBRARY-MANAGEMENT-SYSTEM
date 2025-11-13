require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");
const cors = require("cors");
const { sequelize } = require("./src/config/database");
const errorHandler = require("./src/middlewares/errorHandler");
const routes = require("./src/routes/routes");

/**********Import Models***********/
require("./src/models");
/**********Import Models***********/

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation for your application",
    },
  },
  apis: ["./src/routes/routes.js"],
};
const specs = swaggerJsdoc(swaggerOptions);

(async () => {
  try {
    await sequelize.sync({ alter: false });
    console.log("Database connected");

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("dev"));
    app.use("/api/v1/", routes);
    app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
    // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

    app.use((req, res, next) => {
      res.status(404).json({ message: "API route not found" });
    });

    app.use(errorHandler);

    const PORT = process.env.SERVER_PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error.message);
  }
})();
