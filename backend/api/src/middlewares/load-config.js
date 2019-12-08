import path from "path";
import yaml from "yamljs";
import _ from "lodash";
import { match } from "path-to-regexp";

import { constructError } from "../utils/construct-error";


/** Configuration in JSON format. */
const conf = yaml.load(path.resolve("./src/config/endpoints.yaml"));

/**
 * Loads the configuration of the incoming route.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 */
export default function (req, res, next) {

    // Save the base url of the request (e.g. event)
    const baseUrl = `/${req.path.split("/")[1]}`;

    // Save the path of the request (e.g. /eventId)
    const path = req.path.replace(baseUrl, "");

    // Find the first item that matches the path and the method
    const params = _.find(conf[baseUrl], i => match(i.path)(path) && i.method === req.method);

    // If no route is found throw an error
    if (!params) {
        next(constructError(404, "Route not found."));
        return;
    }

    // Save the configuration in the request object
    req.config = params;

    // Call the next middleware
    next()

}