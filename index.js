
    const estados = [];
    window.addEventListener('load', ()=>{
        const map = document.querySelector('#map');
        fetchSvg(map.firstElementChild);
    })
    function fetchSvg(img){
        fetch('./brasil.svg')
            .then((response) => response.text())
            .then((data) => {
                const span = document.createElement('span');
                span.innerHTML = data;
                const $inlineSvg = span.getElementsByTagName('svg')[0];
                img.parentNode.replaceChild($inlineSvg, img)
                return true;
            })
            .then(()=>{ getActions(); })
            .catch((erro)=>{
                const map = document.querySelector('#map');
                console.log(erro);
                map.innerHTML = erro;
            })
        }
    const getActions = () => {
        const states = document.getElementsByClassName('estado');
        for (let i = 0; i < states.length; i++) {
                states[i].onclick = () => { stateClicked(states[i]) }
        }
        getEstados();
    };

    const getEstados = () => {
        fetch('./estados.json')
            .then((response)=>response.json())
            .then((response)=>{
                estados.push(...response)
            })
    }

    const stateClicked = (state) => {
        const code = state.getAttribute('code');
        const uf = estados.find(estado => estado.code === code)
        writeInfo(uf);
        scrollWindow();
        /* console.log(uf) */
    }

    const writeInfo = (uf) => {
        const $name = document.getElementById('stateName');
        const $pop = document.getElementById('statePop');
        const $desc = document.getElementById('stateDesc');

        $name.innerHTML = `${uf.nome} (${uf.sigla})`;
        $pop.innerHTML = `População: ${uf.populacao}`;
        $desc.innerHTML = uf.descricao;
    }

    const scrollWindow = () => {
        const $text = document.getElementById('text');
        const position = $text.getBoundingClientRect();
        window.scrollTo(position);
    }
