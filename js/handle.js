export async function handleQuestion(question) {

    if (!question) {
        throw new Error("Question empty!");
    }

    document.getElementById("question").textContent =
        question.question;

    document.getElementById("A").textContent =
        question.A;

    document.getElementById("B").textContent =
        question.B;

    document.getElementById("C").textContent =
        question.C;

    document.getElementById("D").textContent =
        question.D;

}
