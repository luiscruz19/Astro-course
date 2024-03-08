import { type APISpaceXResponse } from "../../types/apiSpaceX";

import connection from "../../utils/connection.js";
import config from "../../config/config.js";

const { launchs: { list } } = config


export default async function getLatestLaunches() {
    const response = await connection({
        method: "POST",
        url: list,
        params: JSON.stringify({
            query: {},
            options: {
                limit: 51,
                sort: {
                    flight_number: "asc"
                }
            }
        }),
    });

    const { docs: launches } = response as APISpaceXResponse;
    return launches;
}