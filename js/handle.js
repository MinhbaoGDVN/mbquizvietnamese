export async function handleQuestion(question) {

    if (!question) {
        throw new Error("Question empty!");
    }

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

}
