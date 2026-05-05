// IMPORT FILES
import { readData } from "./readdata.js";
import { randomQuestion } from "./randomquestion.js";
import { handleQuestion } from "./handle.js";
import { playAnimation } from "./animation.js";

// MAIN LOOP
async function gameLoop() {

    console.log("===== START LOOP =====");

    try {

        // 1. READ DATA
        const data = await readData();

        // CHECK EMPTY
        if (!data || data.length === 0) {

            console.error("Database trống!");
            
            // THỬ LẠI SAU 3 GIÂY
            setTimeout(gameLoop, 3000);
            return;

        }

        console.log("Read data success!");

        // 2. RANDOM QUESTION
        const question = randomQuestion(data);

        // CHECK ERROR
        if (!question) {

            console.error("Không lấy được question!");

            setTimeout(gameLoop, 3000);
            return;

        }

        console.log("Question loaded!");

        // 3. HANDLE HTML
        await handleQuestion(question);

        console.log("Handle success!");

        // 4. PLAY ANIMATION
        playAnimation();

        console.log("Animation success!");

    }
    catch (error) {

        console.error("GAME LOOP ERROR:");
        console.error(error);

        // RETRY
        setTimeout(gameLoop, 3000);

    }

}

// START GAME
gameLoop();
