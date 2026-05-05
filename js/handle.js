export async function handleQuestion(question) {

    if (!question) {
        throw new Error("Question empty!");
    }

    document.getElementById("question").textContent = data.question;
    
    document.getElementById("A").textContent = data.A;
    document.getElementById("B").textContent = data.B;
    document.getElementById("C").textContent = data.C;
    document.getElementById("D").textContent = data.D;

}
