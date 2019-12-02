/**
 * Parses the body of a request with type "multipart/form-data".
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 */
export default function (req, res, next) {

    // Parse each of the JSON fields in the body of the request
    for (const field in req.body) {

        // noinspection JSUnfilteredForInLoop
        if (req.body[field][0] === "{" || req.body[field][0] === "[")
            // noinspection JSUnfilteredForInLoop
            req.body[field] = JSON.parse(req.body[field])

    }

    // Call the next middleware
    next();

}