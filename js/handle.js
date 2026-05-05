export async function handleQuestion(question) {

    if (!question) {
        throw new Error("Question empty!");
    }

    document.getElementById("question").innerText =
        question.question;

    document.getElementById("A").innerText =
        question.A;

    document.getElementById("B").innerText =
        question.B;

    document.getElementById("C").innerText =
        question.C;

    document.getElementById("D").innerText =
        question.D;

}
