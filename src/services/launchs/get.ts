import { type Doc } from "../../types/apiSpaceX";

import connection from "../../utils/connection.js";
import config from "../../config/config.js";

const { launchs: { get } } = config


export default async function getLaunchByID({ id }: { id: string }) {
    const response = await connection({
        method: "GET",
        url: `${get}${id}`
    });
    const launch = response as Doc;
    return launch;
}