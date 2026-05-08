let questionStartTime = 0;

let answering = false;

export async function handleQuestion(question) {

    if (!question) {
        throw new Error("Question empty!");
    }

    // ===== RESET =====

    answering = false;

    const answers =
        document.querySelectorAll(".answer");

    answers.forEach((btn) => {

        btn.style.background = "";

        btn.style.pointerEvents =
            "auto";

    });

    // ===== LOAD QUESTION =====

    questionStartTime = Date.now();

    document.getElementById("question")
    .textContent =
        question.question;

    // ===== ANSWER ELEMENTS =====

    const answerA =
        document.getElementById("A");

    const answerB =
        document.getElementById("B");

    const answerC =
        document.getElementById("C");

    const answerD =
        document.getElementById("D");

    // ===== A =====

    answerA.textContent =
        question.a || "";

    answerA.style.display =
        question.a ? "block" : "none";

    // ===== B =====

    answerB.textContent =
        question.b || "";

    answerB.style.display =
        question.b ? "block" : "none";

    // ===== C =====

    answerC.textContent =
        question.c || "";

    answerC.style.display =
        question.c ? "block" : "none";

    // ===== D =====

    answerD.textContent =
        question.d || "";

    answerD.style.display =
        question.d ? "block" : "none";

    // ===== WAIT FOR PLAYER =====

    return new Promise((resolve) => {

        answers.forEach((button) => {

            button.onclick = async () => {

                // chống spam click
                if (answering) {
                    return;
                }

                // nếu nút bị ẩn thì bỏ qua
                if (
                    button.style.display ===
                    "none"
                ) {
                    return;
                }

                answering = true;

                // khóa toàn bộ input
                answers.forEach((btn) => {

                    btn.style.pointerEvents =
                        "none";

                });

                const playerAnswer =
                    button.dataset.answer;

                const correct =
                    playerAnswer ===
                    question.answer;

                let earnedScore = 0;

                // ===== ĐÚNG =====

                if (correct) {

                    button.style.background =
                        "dodgerblue";

                    const now =
                        Date.now();

                    const seconds =
                        (now -
                        questionStartTime)
                        / 1000;

                    const safeSeconds =
                        Math.max(
                            seconds,
                            1
                        );

                    earnedScore =
                        Math.max(
                            1,
                            Math.min(
                                1000,
                                Math.floor(
                                    1000 /
                                    safeSeconds
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

                    console.log(
                        "Wrong!"
                    );

                }

                // ===== GIỮ MÀU 1 GIÂY =====

                await new Promise((r) =>
                    setTimeout(
                        r,
                        1000
                    )
                );

                // ===== DONE =====

                answering = false;

                resolve({

                    correct:
                        correct,

                    score:
                        earnedScore

                });

            };

        });

    });

}
