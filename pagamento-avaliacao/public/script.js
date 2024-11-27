//Selecionar os elementos do formulário e botão
const nomeInput = document.getElementById('nome');
const documentoInput = document.getElementById('documento');
const documentoTipoInput = document.getElementById('documento-tipo');
const valorInput = document.getElementById('valor');
const paymentMethods = document.getElementsByName('payment');
const confirmarCompraBtn = document.getElementById('confirmarCompra');



// Função para capturar o método de pagamento selecionado
function getSelectedPaymentMethod() {
    for (const method of paymentMethods) {
        if (method.checked) {
            return method.nextSibling.textContent.trim(); // Retorna o texto do método selecionado
        }
    }
    return null;
}

// Função para capturar os dados e enviá-los
async function capturarDados() {
    // Capturar os valores preenchidos no formulário
    const nome = nomeInput.value;
    const documentoTipo = documentoTipoInput.value;
    const documento = documentoInput.value;
    const valor = parseFloat(valorInput.value);
    const metodoPagamento = getSelectedPaymentMethod();

    // Validação básica
    if (!nome || !documento || !valor || !metodoPagamento) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Criar objeto JSON com os dados capturados
    const dados = {
        nome,
        documento: {
            tipo: documentoTipo,
            numero: documento,
        },
        valor,
        metodoPagamento,
    };

    console.log('Dados capturados:', dados); // Exibe no console para depuração

    // Enviar os dados para o servidor
    try {
        const response = await fetch('/api/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados),
        });

        if (response.ok) {
            alert('Transação salva com sucesso!');
            window.location.href = 'avaliacao.html';
        } else {
            alert('Erro ao salvar a transação.');
            console.error('Erro no servidor:', await response.text());
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro na comunicação com o servidor.');
    }
}
async function capturarDados2() {
  // Capturar os valores preenchidos no formulário
  const nomeproj = nomeprojTipoInput.value;
  const nota = notaTipoInput.value;
  const comentario = comentarioTipoInput.value;

  // Validação básica
  if (!nomeproj || !nota) {
      alert('Por favor, preencha todos os campos!');
      return;
  }

  // Criar objeto JSON com os dados capturados
  const dados = {
      nome,
      nota,
      comentario,
  };

  console.log('Dados capturados:', dados); // Exibe no console para depuração

  // Enviar os dados para o servidor
  try {
      const response = await fetch('/api/avaliacao', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(dados),
      });

      if (response.ok) {
          alert('Avaliação salva com sucesso!');
          window.location.href = 'confirmacao.html';
      } else {
          alert('Erro ao salvar a avaliação.');
          console.error('Erro no servidor:', await response.text());
      }
  } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na comunicação com o servidor.');
  }
}



// Associar a função de captura ao botão de confirmação
confirmarCompraBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Previne comportamento padrão
    capturarDados(); // Chama a função de captura
});
btnsubmit.addEventListener('click', (e) => {
  e.preventDefault(); // Previne comportamento padrão
  capturarDados2(); // Chama a função de captura
});






 


