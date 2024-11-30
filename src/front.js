import { url } from "./env";


export const getData = async () => {
    try {
        const data = await fetch(`${url}/posts`)
            .then((res) => res.json())
            .then((data) => data);

        return data;
    } catch (err) {
        console.log(err);
    }
}

