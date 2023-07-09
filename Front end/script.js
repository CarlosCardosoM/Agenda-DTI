document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.querySelector("form");
  const Inome = document.querySelector(".nome");
  const Idate = document.querySelector(".data");

  formulario.addEventListener('submit', function(event) {
    event.preventDefault();
    criar();
  });

  mostrarLembretes();

  // Função para formatar a data no formato DD/MM/AAAA
  function formatarData(data) {
    const dateObj = new Date(data);
    const dia = String(dateObj.getDate() + 1).padStart(2, '0'); // Adiciona +1 ao dia
    const mes = String(dateObj.getMonth() + 1).padStart(2, '0');
    const ano = dateObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  function criar() {
    const nome = Inome.value.trim();
    const data = Idate.value;

    // Validar o campo "Nome"
    if (nome === "") {
      console.error("O campo 'Nome' deve ser preenchido.");
      return;
    }

    // Validar o campo "Data"
    if (data === "") {
      console.error("O campo 'Data' deve ser preenchido.");
      return;
    }

    const dataAtual = new Date();
    const dataSelecionada = new Date(data);

    if (dataSelecionada <= dataAtual) {
      console.error("A data selecionada deve ser no futuro.");
      return;
    }

    fetch("http://localhost:8080/users", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
        nome_do_lembrete: nome,
        data: data
      })
    })
      .then(function(res) {
        console.log(res);
        mostrarLembretes(); // Atualizar a lista de lembretes após a criação
        limparCampos(); // Limpar os campos do formulário
      })
      .catch(function(res) {
        console.error(res);
      });
  }

  function mostrarLembretes() {
    fetch("http://localhost:8080/users")
      .then(function(response) {
        return response.json();
      })
      .then(function(lembretes) {
        // Ordenar os lembretes por data
        lembretes.sort(function(a, b) {
          return new Date(a.data) - new Date(b.data);
        });
  
        // Selecionar o elemento onde os lembretes serão exibidos
        const lembretesContainer = document.getElementById("reminderList");
  
        // Limpar o conteúdo atual
        lembretesContainer.innerHTML = "";
  
        // Variável para controle de data
        let dataAtual = null;
  
        // Iterar sobre os lembretes e criar elementos para exibir na página
        lembretes.forEach(function(lembrete) {
          const dataFormatada = formatarData(lembrete.data);
  
          // Verificar se a data é diferente da data atual
          if (dataFormatada !== dataAtual) {
            // Criar um novo item de lista para a nova data
            const listItem = document.createElement("li");
            const header = document.createElement("h3");
            header.textContent = dataFormatada;
  
            listItem.appendChild(header);
  
            // Atualizar a data atual
            dataAtual = dataFormatada;
  
            // Adicionar o item de lista ao container de lembretes
            lembretesContainer.appendChild(listItem);
          }
  
          // Criar um parágrafo para o lembrete
          const lembreteContent = document.createElement("p");
          lembreteContent.textContent = lembrete.nome_do_lembrete;

          // Criar o botão de remoção (X)
          const botaoRemover = document.createElement("button");
          botaoRemover.innerHTML = "X";
          botaoRemover.setAttribute("data-id", lembrete.id); // Armazenar o ID do lembrete

         // Adicionar evento de clique para remover o lembrete
         botaoRemover.addEventListener("click", function() {
         const lembreteId = this.getAttribute("data-id");
         removerLembrete(lembreteId);
});

        // Adicionar o botão de remoção ao parágrafo do lembrete
        lembreteContent.appendChild(botaoRemover);
  
          // Adicionar o parágrafo ao item de lista correspondente à data
          const listItem = lembretesContainer.lastElementChild;
          listItem.appendChild(lembreteContent);
        });
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  
  // Função para remover um lembrete
  function removerLembrete(id) {
    fetch(`http://localhost:8080/users/${id}`, {
      method: "DELETE"
    })
      .then(function(response) {
        if (response.ok) {
          // Atualizar a lista de lembretes após a remoção
          mostrarLembretes();
        } else {
          console.error("Erro ao remover lembrete.");
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  }
  
  
  // Função para limpar os campos do formulário
  function limparCampos() {
    const Inome = document.querySelector(".nome");
    const Idate = document.querySelector(".data");
    Inome.value = "";
    Idate.value = "";
  }
});
