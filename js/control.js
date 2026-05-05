import { readData } from "./readdata.js";
import { randomQuestion } from "./randomquestion.js";
import { handleQuestion } from "./handle.js";

let score = 0;

async function gameLoop() {

    console.log("===== START LOOP =====");

    const data = await readData();

    if (!data || data.length === 0) {

        console.error("Database trống!");

        setTimeout(gameLoop, 2000);
        return;

    }

    // random câu hỏi
    const question = randomQuestion(data);

    // xử lý câu hỏi
    const result = await handleQuestion(question);

    // đúng
    if (result === true) {

        score++;

        console.log("Correct!");
        console.log("Score:", score);

    } else {

        console.log("Wrong!");

    }

    // update html score
    document.getElementById("score").textContent =
        `Score : ${score}`;

    // câu tiếp theo
    setTimeout(gameLoop, 1000);

}

gameLoop();
