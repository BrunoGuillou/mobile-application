/**
 * @fileoverview This file populates the Events collection with dummy data.
 *
 * @author Edoardo Pessina <edoardo.pessina@polimi.it>
 */

import { LoremIpsum } from "lorem-ipsum";

import Event, { collection } from "./events.model";
import { dropCollection } from "../../setup/seeder";
import User from "../users/user.model";


/**
 * Drops the Events collection and re-populates it with dummy data.
 *
 * @return {Promise<void>} An empty promise.
 */
export default async function () {

    console.info("SEED - Events...");

    // Drop the collection
    await dropCollection(collection);

    // Create the dummy data
    const events = [
        {
            title      : { it: "Evento futuro", en: "Future event" },
            description: { it: new LoremIpsum().generateParagraphs(1), en: new LoremIpsum().generateParagraphs(1) },
            position   : {
                type       : "Point",
                coordinates: [8.504056, 45.912573],
                address    : "Corso Giuseppe Garibaldi 23, Baveno (VB), Italia",
                city       : "Baveno"
            },
            date       : new Date().setMonth(new Date().getMonth() + 1),
            contacts   : { email: "info@simile.it", phone: "+393349969525" }
        },
        {
            title      : { it: "Evento futuro 2" },
            description: { it: new LoremIpsum().generateParagraphs(1) },
            position   : {
                type       : "Point",
                coordinates: [9.389224, 45.852352],
                address    : "Largo Fratelli Calvi 2, Lecco (LC), Italia",
                city       : "Lecco"
            },
            date       : new Date().setMonth(new Date().getMonth() + 3),
            contacts   : { phone: "+393349969525" }
        },
        {
            title       : { it: "Evento passato" },
            description : { it: new LoremIpsum().generateParagraphs(1) },
            position    : {
                type       : "Point",
                coordinates: [8.948400, 45.991756],
                address    : "Riva Paradiso 1, Paradiso, Svizzera",
                city       : "Paradiso"
            },
            date        : new Date().setMonth(new Date().getMonth() - 2),
            cover       : "events/default.jpg",
            contacts    : { mail: "info@simile.it" },
            participants: 20
        }
    ];

    // Retrieve the id of the admin
    const adminId = await User.findOne({ email: "admin@example.com" }, "_id");

    // For each dummy data
    for (const event of events) {

        // Save the admin id as uid
        event.uid = adminId;

        // Save the event
        await Event.create(event);

    }

}
