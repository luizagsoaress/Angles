'use strict'

let pagina = 0;

var notyf = new Notyf({position:{x:'right', y:'bottom'}});

async function chamadaApiGenerica(palavra) {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${palavra}`, {
        method: "GET",
        headers: ({"Content-Type": "application/json"})
    });

    const data = await res.json();

    const str = "Sorry pal, we couldn't find definitions for the word you were looking for.";

    if(data.message === str) return 1;
    else {
        pagina++;
        return data;
    }
}

async function desenharResposta(data) {
    const array = {
        definicoes: []  
    };

    const foneticaDiv = document.querySelector('.fonetica');
    foneticaDiv.innerHTML = '';

    let x = 1;

    if(data.phonetics.length > 0) {
        for(let i = 0; i < data.phonetics.length; i++) {

            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.justifyContent = 'flex-start';
            container.style.alignItems = 'flex-start';
            container.style.padding = '0 10px';

            const f = document.createElement('p');
            f.style.color = 'black';
            f.style.fontSize = '16px';
            f.style.fontWeight = '900';
            f.style.fontStyle = 'italic';
            const texto = data.phonetics[i].text;
            const audio = data.phonetics[i].audio;
            const sourceUrl = data.phonetics[i].sourceUrl;
            f.textContent = texto ? x++ + '. ' + texto : audio ? x++ + '. ' + audio : sourceUrl ? x++ + '. ' + sourceUrl : '[\]';

            container.appendChild(f);
            foneticaDiv.appendChild(container);

        }
    }

    const saibaMaisDiv = document.querySelector('.saiba-mais');
    saibaMaisDiv.innerHTML = '';

    x = 1;

    for(let i = 0; i < data.sourceUrls.length; i++) {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.justifyContent = 'flex-start';
            container.style.alignItems = 'flex-start';
            container.style.padding = '10px';

            const f = document.createElement('p');
            f.style.fontSize = '16px';
            f.style.fontWeight = '900';
            f.style.fontStyle = 'italic';
            const texto = data.sourceUrls[i];
            f.textContent = texto ? x++ + '. ' + texto : 'Sem mais material, sinto muito';
            f.style.color = texto ? 'black' : '#D7D6D6';

            container.appendChild(f);
            saibaMaisDiv.appendChild(container);
    }

    for(let i = 0; i < data.meanings.length; i++) {

        array.definicoes.push({
            definicao: [],
            exemplos: [],
            sinonimos: [],
            antonimos: [],
            classe: []
        });

        for(let k = 0; k < data.meanings[i].antonyms.length; k++) {
            array.definicoes[i].antonimos.push(data.meanings[i].antonyms[k]);
        }

        for(let k = 0; k < data.meanings[i].synonyms.length; k++) {
            array.definicoes[i].sinonimos.push(data.meanings[i].synonyms[k]);
        }

        array.definicoes[i].classe.push(data.meanings[i].partOfSpeech);

        for(let j = 0; j < data.meanings[i].definitions.length; j++) {

            array.definicoes[i].definicao.push(data.meanings[i].definitions[j].definition);
            array.definicoes[i].exemplos.push(data.meanings[i].definitions[j].example);
        }
    }

    const definicoesDiv = document.querySelector('.definicoes');
    definicoesDiv.innerHTML = '';

    x = 1;

    const div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = 'auto';
    div.style.display = 'grid';
    div.style.gridTemplateColumns = 'repeat(2, 1fr)'
    div.style.alignItems = 'stretch';
    div.style.gap = '5px';
    div.style.padding = '10px';

    for(let i = 0; i < array.definicoes.length; i++) {
        for(let j = 0; j < array.definicoes[i].definicao.length; j++) {

            const container = document.createElement('div');
            container.style.width = 'auto';
            container.style.height = 'auto';
            container.style.display = 'flex';
            container.style.alignItems = 'flex-start';
            container.style.flexDirection = 'column';
            container.style.gap = '10px';

            const p = document.createElement('p');
            p.style.color = 'black';
            p.style.fontSize = '16px';
            p.style.fontWeight = '900';
            p.textContent = x++ + '. ' + array.definicoes[i].definicao[j];

            const p2 = document.createElement('p');
            p2.style.color = 'black';
            p2.style.fontSize = '14px';
            p2.style.fontWeight = '600';
            const exemplo = array.definicoes[i].exemplos[j];
            p2.textContent = exemplo ? '"' + exemplo + '"' : '"..."';
            p2.style.margin = '0 20px';
            p2.style.fontStyle = 'italic';

            const p3 = document.createElement('p');
            const p4 = document.createElement('p');
            
            if(j === 0) {
                const sinonimos = array.definicoes[i].sinonimos;
                p4.textContent = sinonimos.length > 0 ? 'sin. ' + sinonimos.join(', ') : 'Sem sinônimos.';
                p4.style.color = sinonimos.length > 0 ? 'black' : '#cbcbcb';
                p4.style.fontSize = '14px';
                p4.style.fontWeight = '400';
                p4.style.margin = '0 20px';
                p4.style.fontStyle = 'italic';

                const antonimos = array.definicoes[i].antonimos;
                p3.textContent = antonimos.length > 0 ? 'ant. ' + antonimos.join(', ') : 'Sem antônimos.';
                p3.style.color = antonimos.length > 0 ? 'black' : '#cbcbcb';
                p3.style.fontSize = '14px';
                p3.style.fontWeight = '400';
                p3.style.margin = '0 20px';
                p3.style.fontStyle = 'italic';
            } else {
                p3.style.color = '#cbcbcb';
                p3.style.fontSize = '14px';
                p3.style.fontWeight = '400';
                p3.style.margin = '0 20px';
                p3.style.fontStyle = 'italic';

                p4.style.color = '#cbcbcb';
                p4.style.fontSize = '14px';
                p4.style.fontWeight = '400';
                p4.style.margin = '0 20px';
                p4.style.fontStyle = 'italic';

                p3.textContent = 'Sem antônimos.';
                p4.textContent = 'Sem sinônimos.';
            }

            const p5 = document.createElement('p');
            p5.style.color = 'black';
            p5.style.fontSize = '14px';
            p5.style.fontWeight = '400';
            const classe = array.definicoes[i].classe[0];
            p5.textContent = classe ? classe + '.' : 'Sem classe.';
            p5.style.margin = '0 20px';
            p5.style.fontStyle = 'italic';

            container.appendChild(p);
            container.appendChild(p2);
            container.appendChild(p3);
            container.appendChild(p4);
            container.appendChild(p5);

            div.appendChild(container);

        }
    }

    definicoesDiv.appendChild(div);
    
}

const searchBtn = document.querySelector('.search-btn');
const searchInput = document.querySelector('.search-input');

if(searchBtn) {
    searchBtn.addEventListener("click", async function(event) {
        event.preventDefault();

        const palavra = searchInput.value.trim();
        searchInput.value = '';

        const subtituloPalavra = document.querySelector('.resposta-palavra');
        if(palavra.length > 6) subtituloPalavra.textContent = palavra.slice(0, 6) + '...';
        else subtituloPalavra.textContent = palavra;

        let res;
        let notificacao;

        if(palavra.length > 0 && palavra != 0) {
            res = await chamadaApiGenerica(palavra);
            if(res === 1) notificacao = notyf.error("Palavra inexistente na língua inglesa!");
            else if(res != 1) {
                const respostaContainer = document.querySelector('.resposta');
                respostaContainer.style.display = 'flex';
                respostaContainer.scrollIntoView({ behavior: "smooth", block: "start" });
                const notificacao = notyf.success('Palavra encontrada no dicionário.');
                desenharResposta(res[0]);
                const pag = document.querySelector('.pag');
                pag.textContent = pagina + '.';
            }
        } else {
            notificacao = notyf.error('Palavra inválida!');
            return;
        }

    });
}

