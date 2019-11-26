import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import checkKeyMiddleware from "../middlewares/check-key";
import checkToken from "../middlewares/check-token";
import { setupDocs } from "./docs";

/**
 * Sets up the necessary middlewares.
 *
 * @param {Object} server - The express server instance.
 */
export const setupMiddlewares = server => {

    console.info('SETUP - Middlewares...');

    // Set headers for CORS
    server.use(cors());

    // Use helmet to set secure response headers
    server.use(helmet());

    // Use morgan for request logging
    // const accessLogStream = fs.createWriteStream(path.join(__dirname, "src/logs/server.log"), { flags: "a" });
    // server.use(morgan("combined", { stream: accessLogStream }));

    // Use BodyParser to parse for application/json
    server.use(bodyParser.json());

    // Setup the docs
    setupDocs(server);

    // Check the API key
    server.use(checkKeyMiddleware);

    // Check the authorization token
    server.use(checkToken);

};
