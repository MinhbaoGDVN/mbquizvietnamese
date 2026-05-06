import { readData }
from "./readdata.js";

import { randomQuestion }
from "./randomquestion.js";

import { handleQuestion }
from "./handle.js";

// ===== SCORE =====

let score = 0;

// ===== MAIN LOOP =====

async function gameLoop() {

    try {

        // ===== READ DATABASE =====

        const data =
            await readData();

        // ===== CHECK DATABASE =====

        if (
            !data ||
            data.length === 0
        ) {

            console.error(
                "Database trống!"
            );

            setTimeout(
                gameLoop,
                1000
            );

            return;

        }

        // ===== RANDOM QUESTION =====

        const question =
            randomQuestion(data);

        // ===== CHECK QUESTION =====

        console.log(
            `Question : ID ${question.id}`
        );

        if (!question) {

            console.error(
                "Question lỗi!"
            );

            setTimeout(
                gameLoop,
                1000
            );

            return;

        }

        // ===== HANDLE QUESTION =====

        const result =
            await handleQuestion(
                question
            );

        // ===== ADD SCORE =====

        if (result.correct) {

            score += result.score;

            console.log(`
Added:
+${result.score}

Total:
${score}
            `);

        }

        // ===== UPDATE UI =====

        document.getElementById("score")
        .textContent =
            `Score : ${score}`;

        // ===== NEXT LOOP =====

        gameLoop();

    }

    // ===== ERROR =====

    catch (error) {

        console.error(
            "Loop error:",
            error
        );

        // thử lại sau 1 giây
        setTimeout(
            gameLoop,
            1000
        );

    }

}

// ===== START =====

gameLoop();
