async function votarPositivo(id) {
    const data = await fetch(
        `${location.origin}/api/votoPositivo/${id}`
    ).then((res) => res.json());
    const { positivos, negativos, meGusta } = data;
    formatear({ id, positivos, negativos, meGusta });
}

async function votarNegativo(id) {
    const data = await fetch(
        `${location.origin}/api/votoNegativo/${id}`
    ).then((res) => res.json());
    const { positivos, negativos, meGusta } = data;
    formatear({ id, positivos, negativos, meGusta });
}

function formatear({ id, positivos, negativos, meGusta }) {
    document.getElementById(`up${id}`).innerHTML = positivos;
    document.getElementById(`down${id}`).innerHTML = negativos;
    if (meGusta) {
        document
            .getElementById(`up${id}`)
            .parentElement.querySelector("i").style.color = "#129bf7";
        return (document
            .getElementById(`down${id}`)
            .parentElement.querySelector("i").style.color = "#000");
    }
    document
        .getElementById(`down${id}`)
        .parentElement.querySelector("i").style.color = "#129bf7";
    return (document
        .getElementById(`up${id}`)
        .parentElement.querySelector("i").style.color = "#000");
}
