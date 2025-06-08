const searchInput = document.getElementById('search');
const statusSelect = document.getElementById('status');
const speciesSelect = document.getElementById('species');
const characterList = document.getElementById('character-list');

const fetchCharacters = async () => {
    let url = 'https://rickandmortyapi.com/api/character/?';

    const name = searchInput.value;
    const status = statusSelect.value;
    const species = speciesSelect.value;

    if (name) url += `&name=${name}`;
    if (status) url += `&status=${status}`;
    if (species) url += `&species=${species}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCharacters(data.results);
    } catch (err) {
        characterList.innerHTML = '<p class="col-span-full text-center text-red-500">Nenhum personagem encontrado.</p>';
    }
};

const displayCharacters = (characters) => {
    characterList.innerHTML = '';
    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300';
        card.innerHTML = `
          <a href="personagem.html?id=${character.id}" class="block">
            <img src="${character.image}" alt="${character.name}" class="w-full h-60 object-cover">
            <div class="p-4">
              <h3 class="text-xl font-semibold text-portal mb-1">${character.name}</h3>
              <p class="text-sm text-gray-400">Status: ${character.status}</p>
              <p class="text-sm text-gray-400">Espécie: ${character.species}</p>
              <p class="text-sm text-gray-400">Localização: ${character.location.name}</p>
            </div>
          </a>
        `;
        characterList.appendChild(card);
    });
};

searchInput.addEventListener('input', fetchCharacters);
statusSelect.addEventListener('change', fetchCharacters);
speciesSelect.addEventListener('change', fetchCharacters);

fetchCharacters();