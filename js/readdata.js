export async function readData() {

    try {

        const response = await fetch("../databass.json");

        const data = await response.json();

        return data;

    }
    catch (error) {

        console.error("Read data error:", error);

        return null;

    }

}
