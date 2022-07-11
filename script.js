const img = document.querySelector("#pokemon-img");
const nomePokemon = document.querySelector("#nome-pokemon");
const tipoPokemon = document.querySelector("#tipo-pokemon");
const buttonBusca = document.querySelector("#busca-pokemon");
const inputPokemon = document.querySelector("#text-pokemon");
const createUrl = (nomePokemon) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${nomePokemon}`;
  return url;
};

const createhtml = async () => {
    if(!inputPokemon.value) return alert('Digite nome de um Pokemon!')
    if(inputPokemon.value.toLowerCase() === 'edgar') {
      nomePokemon.innerHTML = 'Edgar Pistola';
      tipoPokemon.innerHTML = 'Tipo: Trabalhador';
      img.src = "./Captura de tela de 2022-07-11 00-01-53.png";
    } else if (inputPokemon.value.toLowerCase() === 'alan'){
      nomePokemon.innerHTML = 'Alanzin Roça os Mano';
      tipoPokemon.innerHTML = 'Tipo: Lutador de Juiz com Jitsu'
      img.src = "./Captura de tela de 2022-07-11 00-11-12.png"
    } else {
      const obj = await destructionObj();
      const tiposString = obj.types
        .reduce((acc, { type }) => {
          acc.push(type.name);
          return acc;
        }, [])
        .join(" | ");
      nomePokemon.innerHTML = obj.name;
      tipoPokemon.innerHTML = `Tipo: ${tiposString}`;
      img.src = obj.front_default;
    }
};

const destructionObj = async () => {
  const {
    name,
    sprites: { front_default },
    types,
  } = await requireAPI();
  const objectfeito = { name, front_default, types };
  return objectfeito;
};

const requireAPI = async () => {
  try {
    const response = await fetch(urlComPokemon());
    const data = await response.json();
    return data;
  } catch (error) {
    window.alert(`Nome do Pokemon invalido!`);
  }
};

const urlComPokemon = () => {
  const urlfeita = createUrl(inputPokemon.value.toLowerCase());
  return urlfeita;
};

const ArraytodosPokemons = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const {results} = await response.json();
    const namesPokemons = await results.map((pokemon) => pokemon.name)
    return namesPokemons;
}

const autoCompleted = async (input) => {
const arrayPokemonsName = await ArraytodosPokemons();
  if(input === '') return [];
let reg = new RegExp(input)
return  await arrayPokemonsName.filter((name) => {
  if(name.match(reg)) return name;
})
}

// mostra cria uma li que mostra lista com nomes que contem os caracteres digitados no imput
const mostrarAjuda = async (valor) => { 
const result = document.getElementById('result');
const ul = document.createElement('ul');

result.innerHTML = '';
let terms = await autoCompleted(valor);
for (i=0; i<terms.length; i+= 1) {
  const li = document.createElement('li');
  li.className = 'dados';
  li.innerHTML = terms[i];
  li.addEventListener('click', (event) => {
    inputPokemon.value = event.target.innerHTML;
  });
  ul.appendChild(li);
}
result.append(ul);
}

buttonBusca.addEventListener("click", createhtml);
