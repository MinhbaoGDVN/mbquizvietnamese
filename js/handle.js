let questionStartTime = 0;

let answering = false;

export async function handleQuestion(question) {

    if (!question) {
        throw new Error("Question empty!");
    }

    // reset trạng thái cho câu mới
    answering = false;

    // reset UI
    document.querySelectorAll(".answer")
    .forEach((btn) => {

        btn.style.background = "";

        btn.style.pointerEvents = "auto";

    });

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

    return new Promise((resolve) => {

        const answers =
            document.querySelectorAll(".answer");

        answers.forEach((button) => {

            button.onclick = async () => {

                // chống spam
                if (answering) {
                    return;
                }

                answering = true;

                // khóa input
                answers.forEach((btn) => {

                    btn.style.pointerEvents =
                        "none";

                });

                const playerAnswer =
                    button.dataset.answer;

                const correct =
                    playerAnswer === question.answer;

                let earnedScore = 0;

                // ===== ĐÚNG =====

                if (correct) {

                    button.style.background =
                        "dodgerblue";

                    const now = Date.now();

                    const seconds =
                        (now - questionStartTime) / 1000;

                    const safeSeconds =
                        Math.max(seconds, 1);

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

                // ===== SAI =====

                else {

                    button.style.background =
                        "red";

                    console.log("Wrong!");

                }

                // ===== GIỮ MÀU 1 GIÂY =====

                await new Promise((r) =>
                    setTimeout(r, 1000)
                );

                // mở lại input cho câu sau
                answering = false;

                // ===== TRẢ KẾT QUẢ =====

                resolve({

                    correct: correct,
                    score: earnedScore

                });

            };

        });

    });

}
