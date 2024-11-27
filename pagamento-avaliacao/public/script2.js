const allStar = document.querySelectorAll('.rating .star')
const ratingValue = document.querySelector('.rating input')
const btnsubmit = document.getElementById('btnsubmit');
const nomeprojInput = document.getElementById('nomeproj');
const ratingInputs = document.querySelectorAll('.rating i'); // Estrelas
const opinionInput = document.querySelector('textarea[name="opinion"]');

allStar.forEach((item, idx)=> {
	item.addEventListener('click', function () {
		let click = 0
		ratingValue.value = idx + 1

		allStar.forEach(i=> {
			i.classList.replace('bxs-star', 'bx-star')
			i.classList.remove('active')
		})
		for(let i=0; i<allStar.length; i++) {
			if(i <= idx) {
				allStar[i].classList.replace('bx-star', 'bxs-star')
				allStar[i].classList.add('active')
			} else {
				allStar[i].style.setProperty('--i', click)
				click++
			}
		}
	})
})
btnsubmit.addEventListener('click', async (event) => {
    event.preventDefault(); // Impede comportamento padrão do formulário

    // Captura o nome do projeto
    const nome = nomeprojInput.value;

    // Captura a nota com base nas estrelas selecionadas
    let nota = 0;
    ratingInputs.forEach((star, index) => {
        if (star.classList.contains('active')) {
            nota = index + 1; // Determina a nota com base no índice da estrela
        }
    });

    // Captura o comentário
    const comentario = opinionInput.value;

    // Validação dos campos
    if (!nome || !nota || !comentario) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Dados a serem enviados
    const avaliacao = { nome, nota, comentario };

    try {
        const response = await fetch('/api/avaliacao', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(avaliacao),
        });

        if (response.ok) {
            alert('Avaliação salva com sucesso!');
            window.location.href = 'confirmacao.html'; // Redireciona para a página de confirmação
        } else {
            alert('Erro ao salvar a avaliação.');
            console.error('Erro no servidor:', await response.text());
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao comunicar-se com o servidor.');
    }
});

// Adiciona evento para marcar as estrelas como ativas
ratingInputs.forEach((star, index) => {
    star.addEventListener('click', () => {
        // Marca todas as estrelas até a selecionada
        ratingInputs.forEach((s, i) => {
            s.classList.toggle('active', i <= index);
        });
    });
});