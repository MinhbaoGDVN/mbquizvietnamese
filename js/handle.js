let questionStartTime = 0;

let answering = false;

// ===== STREAK =====

let streak = 0;

function getStreakBonus() {

    // mỗi 5 streak = +10%
    return Math.floor(streak / 5) * 10;

}

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

                    // ===== BASE SCORE =====

                    const baseScore =
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

                    // ===== STREAK =====

                    streak++;

                    document.getElementById("streak")
                    .textContent =
                        `🔥 Streak : ${streak}`;

                    const bonusPercent =
                        getStreakBonus();

                    // ===== BONUS SCORE =====

                    earnedScore =
                        Math.floor(
                            baseScore *
                            (
                                1 +
                                bonusPercent / 100
                            )
                        );

                    console.log(`
Correct!
Time: ${seconds.toFixed(2)}s

🔥 Streak:
${streak}

⚡ Bonus:
+${bonusPercent}%

+${earnedScore} score
                    `);

                }

                // ===== SAI =====

                else {

                    button.style.background =
                        "red";

                    console.log(`
Wrong!

💀 Streak Lost:
${streak}
                    `);

                    // reset streak
                    streak = 0;
                    document.getElementById("streak")
                    .textContent =
                        `🔥 Streak : 0`;

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
                        earnedScore,

                    streak:
                        streak

                });

            };

        });

    });

}
