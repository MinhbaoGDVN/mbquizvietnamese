export async function handleQuestion(question) {

    if (!question) {
        throw new Error("Question empty!");
    }

    // render question
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

                // tránh spam click
                answers.forEach((btn) => {
                    btn.onclick = null;
                });

                const playerAnswer =
                    button.dataset.answer;

                const correct =
                    playerAnswer === question.answer;

                // đúng = xanh dương
                if (correct) {

                    button.style.background =
                        "dodgerblue";

                }

                // sai = đỏ
                else {

                    button.style.background =
                        "red";

                }

                // chờ 1 giây
                await new Promise((r) =>
                    setTimeout(r, 1000)
                );

                // reset màu
                answers.forEach((btn) => {

                    btn.style.background = "";

                });

                // trả kết quả
                resolve(correct);

            };

        });

    });

}
