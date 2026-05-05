let questionStartTime = 0;

export async function handleQuestion(question) {

    if (!question) {
        throw new Error("Question empty!");
    }

    // ===== LOAD QUESTION =====

    questionStartTime = Date.now();

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("A").textContent =
        question.a;

    document.getElementById("B").textContent =
        question.b;

    document.getElementById("C").textContent =
        question.c;

    document.getElementById("D").textContent =
        question.d;

    // ===== WAIT PLAYER =====

    return new Promise((resolve) => {

        const answers =
            document.querySelectorAll(".answer");

        answers.forEach((button) => {

            button.onclick = async () => {

                // khóa click spam
                answers.forEach((btn) => {
                    btn.onclick = null;
                });

                const playerAnswer =
                    button.dataset.answer;

                const correct =
                    playerAnswer === question.answer;

                let earnedScore = 0;

                // ===== CORRECT =====

                if (correct) {

                    // màu xanh
                    button.style.background =
                        "dodgerblue";

                    // tính thời gian
                    const now = Date.now();

                    const seconds =
                        (now - questionStartTime) / 1000;

                    // tránh chia 0
                    const safeSeconds =
                        Math.max(seconds, 1);

                    // tính điểm
                    earnedScore =
                        Math.max(
                            1,
                            Math.min(
                                1000,
                                Math.floor(
                                    1000 / safeSeconds
                                )
                            )
                        );

                    console.log(`
Correct!
Time: ${seconds.toFixed(2)}s
+${earnedScore} score
                    `);

                }

                // ===== WRONG =====

                else {

                    // màu đỏ
                    button.style.background =
                        "red";

                    console.log("Wrong!");

                }

                // ===== WAIT 1 SECOND =====

                await new Promise((r) =>
                    setTimeout(r, 1000)
                );

                // ===== RESET COLOR =====

                answers.forEach((btn) => {

                    btn.style.background = "";

                });

                // ===== RETURN RESULT =====

                resolve({

                    correct: correct,
                    score: earnedScore

                });

            };

        });

    });

}
