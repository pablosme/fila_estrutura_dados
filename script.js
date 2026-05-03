// Estrutura de Dados: Fila (FIFO) [cite: 6, 28]
let fila = [];

// Função para buscar personagem aleatório da API [cite: 27, 30]
async function adicionarPersonagem() {
    const idAleatorio = Math.floor(Math.random() * 826) + 1;
    try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${idAleatorio}`);
        const personagem = await response.json();
        
        // Adiciona ao final da fila (push)
        fila.push(personagem);
        atualizarInterface();
    } catch (error) {
        console.error("Erro ao buscar personagem:", error);
    }
}

// Função para remover o primeiro da fila e atender [cite: 31]
function atenderPersonagem() {
    if (fila.length === 0) {
        alert("A fila está vazia!");
        return;
    }

    // Remove o primeiro elemento (shift) [cite: 6]
    const atendido = fila.shift();
    exibirAtendimento(atendido);
    atualizarInterface();
}

// Exibe o personagem atual com imagem, espécie e status [cite: 29]
function exibirAtendimento(p) {
    const container = document.getElementById('card-atendimento');
    container.innerHTML = `
        <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>Espécie: ${p.species}</p>
            <p>Status: ${p.status}</p>
        </div>
    `;
}

// Atualiza a visualização da "Sala de Espera" [cite: 34]
function atualizarInterface() {
    const listaFila = document.getElementById('lista-fila');
    listaFila.innerHTML = "";

    fila.forEach(p => {
        const item = document.createElement('div');
        item.className = "card";
        item.innerHTML = `<strong>${p.name}</strong> (${p.species})`;
        listaFila.appendChild(item);
    });
}