
function addIcon() {
  const word = decodeURI(document.URL).split("/").pop();
  const sectionBasics = document.querySelector("div.section.basics");
  const pronunciation = sectionBasics.querySelector(".jsx.read.auto.icon.icon-play");

  // check if word exists in deck
  wordInDeck = false;
  fetch("http://localhost:8765", {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "action": "findCards",
          "version": 6,
          "params": {
              query: 'front:' + word // TODO: specify deck
          }
      })
    })
    .then(function(res){ return res.json(); })
    .then(function(data){ 
      if (data["result"].length == 0) {
        insertAddButton(word, sectionBasics, pronunciation);
      } else {
        pronunciation.insertAdjacentElement("afterend", createAddedIcon());
      }
    });
}

function insertAddButton(word, sectionBasics, pronunciation) {
  const wordWithAccent = sectionBasics.querySelector("span").textContent;
  const addButton = createAddButton();
  addButton.addEventListener('click', function(e) {
    cardContent = wordWithAccent + '\n';
    const overview = sectionBasics.querySelector("div.overview");
    cardContent += overview.outerHTML + '\n';
    const translations = document.querySelector("div.section.translations");
    cardContent += translations.outerHTML + '\n';
    const conjugations = document.querySelector("div.section.verb.conjugation");
    if (conjugations) {
      cardContent += conjugations.outerHTML;
    }
    note = {
      "deckName": "Mining - Russian",
      "modelName": "Basic",
      "fields": {"Front": word, "Back": cardContent},
      "tags": ["script"],
    };
    if (pronunciation) {
      note["audio"] = {
        "url": "https://api.openrussian.org/read/ru/" + word, 
        "filename": word + ".mp3", 
        "fields": ["Back"]}
    }
    fetch("http://localhost:8765", {
      method: "post",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "action": "addNotes",
          "version": 6,
          "params": {
            "notes": [note]
          }
      })
    })
    .then(function(res){ return res.json(); })
    .then(function(data){
      addButton.replaceWith(createAddedIcon());
    });
  });

  pronunciation.insertAdjacentElement("afterend", addButton);
}

function createAddedIcon() {
  const addedIcon = document.createElement("IMG");
  addedIcon.src = "https://freeiconshop.com/wp-content/uploads/edd/checkmark-flat.png";
  addedIcon.style.width = "30px";
  addedIcon.style.width = "30px";
  addedIcon.style.margin = "0px 0px 0px 20px";
  return addedIcon
}

function createAddButton() {
  const addButton = document.createElement("IMG");
  // addButton.src = "https://img.icons8.com/external-inkubators-detailed-outline-inkubators/512/external-add-button-music-inkubators-detailed-outline-inkubators.png";
  addButton.src = "https://cdn-icons-png.flaticon.com/512/957/957227.png";
  addButton.style.width = "30px";
  addButton.style.width = "30px";
  addButton.style.margin = "0px 0px 0px 20px";
  return addButton;
}

addIcon();

