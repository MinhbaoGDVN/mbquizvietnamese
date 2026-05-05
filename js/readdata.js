export async function readData() {

    try {

        const response = await fetch(
            `https://mbquizvietnamesedata.vercel.app/databass.json?t=${Date.now()}`
        );

        if (!response.ok) {

            console.error("Cannot load databass.json");
            return null;

        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error("Read data error:", error);
        return null;

    }

}
