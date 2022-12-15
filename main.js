const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const btn = document.getElementById('search-btn');
const result = document.getElementById('result');
const audio = document.getElementById('sound');

btn.addEventListener('click', async () => {
    let inpWord = document.getElementById('inp-word').value;
    try {
        let fetchResponse = await fetch(url + inpWord);
        let data = await fetchResponse.json();
        result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetics[0].text}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>`;
        audio.setAttribute("src", data[0].phonetics[0].audio);
    } catch (err) {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    }
});

function playSound() {
    audio.play();
}