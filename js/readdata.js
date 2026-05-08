export async function readData() {

    try {

        const response = await fetch(
            `https://mbquizvietnamesedata.vercel.app/database.json?t=${Date.now()}`
        );

        if (!response.ok) {

            console.error("Cannot load database.json");
            return null;

        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("Read data error:", error);
        return null;

    }

}
