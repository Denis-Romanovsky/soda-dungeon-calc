const levelInput = document.querySelectorAll('.relics--card--stat__level-input');
const resetRelicButton = document.querySelectorAll('.btn-delete');
const resetAllRelicLevels = document.querySelector('.btn-delete-all');
const relicCard = document.querySelectorAll('.relics--card');


// ------------------------ RELIC TEMPLATE ------------------------ \\
class Relic {
  constructor(name, level, minLevel, multiplier, shortDescription) {
    this.name = name,
    this.level = level,
    this.minLevel = minLevel
    this.multiplier = multiplier,
    this.shortDescription = shortDescription
  }
  value() {
    // let result = Math.round((this.level * this.multiplier) * 100) / 100;
    // let Math.floor(this.level * this.multiplier);
    let result;
    if (this.level < 100) {
      result = Math.round((this.level * this.multiplier) * 100) / 100;
    } else {
      result = Math.floor(this.level * this.multiplier);
    }
    return result;
  }
};

class RelicCapped extends Relic {
  constructor(name, level, minLevel, multiplier, shortDescription, maxLevel) {
    super(name, level, minLevel, multiplier, shortDescription);
    this.maxLevel = maxLevel;
  }
};


// CREATE RELICS
const healthRelic = new Relic('healthRelic', 1, 1, 5, ' HP');
const physBoostRelic = new Relic('physBoostRelic', 1, 1, 0.25,'% to Physical Attacks');
const magicBoostRelic = new Relic('magicBoostRelic', 1, 1, 0.2,'% to Magic Attacks');
const goldRelic = new Relic('goldRelic', 1, 1, 1,'% Gold Find');
const attackRelic = new Relic('attackRelic', 1, 1, 2,' Attack');
const manaRelic = new Relic('manaRelic', 1, 1, 3,' MP');

// Level Capped Relics
const critChanceRelic = new RelicCapped('critChanceRelic', 1, 1, 0.1,'% Crit Chance', 250);
const critDmgRelic = new RelicCapped('critDmgRelic', 1, 1, 0.5,'% Crit Damage', 250);
const essenceRelic = new RelicCapped('essenceRelic', 1, 1, 0.2,'% Essence Find', 100);
const regenRelic = new RelicCapped('regenRelic', 1, 1, 1,' HP Regen', 100);

// Secondary Relics(all capped)
const dungeonKeysRelic = new RelicCapped('dungeonKeysRelic', 1, 1, 0.2,'% Chance of Finding Dungeon Keys', 300);
const masteryRelic = new RelicCapped('masteryRelic', 1, 1, 0.1,'% Boost to Character Mastery XP', 100);
const oreRelic = new RelicCapped('oreRelic', 1, 1, 0.1,' Ore Find', 100);
const resistRelic = new RelicCapped('resistRelic', 1, 1, 0.25,'% Status Resist', 52);
const reflectionRelic = new RelicCapped('reflectionRelic', 1, 1, 0.2,'%  Damage Reflection', 100);

// Class Relics
const junkieRelic = new Relic('junkieRelic', 1, 1, 2,' ATK/HP/MP');
const carpenterRelic = new Relic('carpenterRelic', 1, 1, 2,' ATK/HP/MP');
const minerRelic = new Relic('minerRelic', 1, 1, 2,' ATK/HP/MP');
const nurseRelic = new Relic('nurseRelic', 1, 1, 2,' ATK/HP/MP');
const mysticRelic = new Relic('mysticRelic', 1, 1, 2,' ATK/HP/MP');
const thiefRelic = new Relic('thiefRelic', 1, 1, 2,' ATK/HP/MP');
const huntressRelic = new Relic('huntressRelic', 1, 1, 2,' ATK/HP/MP');
const darkmageRelic = new Relic('darkmageRelic', 1, 1, 2,' ATK/HP/MP');
const blademasterRelic = new Relic('blademasterRelic', 1, 1, 2,' ATK/HP/MP');
const darkLordRelic = new Relic('darkLordRelic', 1, 1, 2,' ATK/HP/MP');
const chefRelic = new Relic('chefRelic', 1, 1, 2,' ATK/HP');
const wizardRelic = new Relic('wizardRelic', 1, 1, 2,' ATK/HP/MP');
const blacksmithRelic = new Relic('blacksmithRelic', 1, 1, 2,' ATK/HP/MP');

// Array of relics
const allRelics = [
  healthRelic,
  physBoostRelic,
  magicBoostRelic,
  goldRelic,
  attackRelic,
  manaRelic,
  critChanceRelic,

  // mainRelicsCapped
  critChanceRelic,
  critDmgRelic,
  essenceRelic,
  regenRelic,

  // secondaryRelics
  dungeonKeysRelic,
  masteryRelic,
  oreRelic,
  resistRelic,
  reflectionRelic,

  // Class Relics
  junkieRelic,
  carpenterRelic,
  minerRelic,
  nurseRelic,
  mysticRelic,
  thiefRelic,
  huntressRelic,
  darkmageRelic,
  blademasterRelic,
  darkLordRelic,
  chefRelic,
  wizardRelic,
  blacksmithRelic
];

// LOCAL STORAGE
let relicKeys = [];
let relicValues = [];

// Initialize localStorage and also use this as a template for updating the values
const setLocalStorage = () => {

  // push values to arrays that store keys/values
  for (let eachRelic of allRelics) {
    relicKeys.push(eachRelic.name);
    relicValues.push(eachRelic.level);
  }

  // make an object out of them
  let result = relicKeys.reduce((result, value, index) => {
    result[value] = relicValues[index];
    return result;
  }, {})

  // create a key for localStorage
  const relicStorage = JSON.stringify(result);
  return localStorage.setItem('relics', relicStorage);
};


// Initialize local storage
if (localStorage.length === 0) {
  setLocalStorage();
}



const relicStored = JSON.parse(localStorage.getItem('relics'))
localStorage.getItem('relics', JSON.stringify(relicStored));




// ---------------------- Website UI Related Stuff ----------------------
// Toggle button activation
const toggleMenu = () => {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active')
  } else {
    menu.classList.add('active');
  }
}

const menu = document.querySelector('.menu');
const menuToggleButton = document.querySelector('.menu--toggle');
menuToggleButton.addEventListener('click', toggleMenu);


// It's for creating tabs. Got this from https://css-tricks.com/tabs-its-complicated/
// codepen https://codepen.io/chriscoyier/pen/XQpqZV
const tabs = document.querySelectorAll('.main--tabs .tabs li');
const sections = document.querySelectorAll('.main--tabs .tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    e.preventDefault();
    removeActiveTab();
    addActiveTab(tab);
  });
})

const removeActiveTab = () => {
  tabs.forEach(tab => {
    tab.classList.remove('is-active');
  });
  sections.forEach(section => {
    section.classList.remove('is-active');
  });
}

const addActiveTab = tab => {
  tab.classList.add('is-active');
  const href = tab.querySelector('a').getAttribute('href'); // get href link of a tab (#main-class--relics)
  const matchingSection = document.querySelector(href); // redirects to the section id (#main--class--relics)
  matchingSection.classList.add('is-active'); // <section id="main--class--relics class="tab-content [is-active]">
}

// --------------- Dropdown Menu ---------------
const dropdownMenu = document.querySelector('.menu--dropdown');

const openDropdownMenu = (e) => {
  if (e.target.classList.contains('menu--dropdown__toggle')
  || e.target.classList.contains('menu--dropdown__toggle__mobile')) {
    dropdownMenu.classList.toggle('active')
  }
}

// Close the dropdown on click outside
const closeDropdownMenu = (e) => {
  let isClickInside = dropdownMenu.contains(e.target);
  if (!isClickInside && dropdownMenu.classList.contains('active')) {
    dropdownMenu.classList.remove('active');
  }
}

dropdownMenu.addEventListener('click', openDropdownMenu);
document.addEventListener('click', closeDropdownMenu);




// ---------------------- INPUTS/RELIC CARD ----------------------

// INPUT FIELD CALCULATION. RECEIVE A VALUE IN ORDER TO CALCULATE IT FOR RELIC BONUS DESCRIPTION
levelInput.forEach(input => {

  // relic-stat-result of each relic class
  let relicStatResult = input.nextElementSibling.nextElementSibling;

  for (let relic of allRelics) {

    // LOCAL STORAGE
    if (relicStored.hasOwnProperty(relic.name) && input.id === relic.name) {
      relic.level = relicStored[relic.name];
      input.value = relic.level
      relicStatResult.innerText = `+${relic.value()}${relic.shortDescription}`;
    }

    // set to empty because there number 1 in the input field, meaning if I type a number it will always be 142 i.e 1(the first index) won't be removed
    if (input.value.length == 0 || relic.level == 1) {
      if (input.id == relic.name) {
        input.value = '';
        // if input is empty set description to its relic multiplier and relic description, basically set it to minLevel
        relicStatResult.innerText = `+${relic.multiplier}${relic.shortDescription}`;
      };
    };

    // update descriptions in real time based on input
    input.addEventListener('input', updateValue => {
      // get access to each relic-bonus to edit them individually if input.id is equal to relic.name
      // insert values into specific relic description if true
      if (input.id == relic.name) {
        relic.level = parseInt(updateValue.target.value);

        // if empty make it lvl 1, to avoid NaN
        if (updateValue.target.value.length === 0) { relic.level = 1; };

        // set relic description
        relicStatResult.innerText = `+${relic.value()}${relic.shortDescription}`;
      };
      setLocalStorage(); // Update localStorage in real time
    });
  };
});


// Reset level button
resetRelicButton.forEach(button => {
  button.addEventListener('click', e => {
    let inputField = e.target.previousElementSibling;
    let relicStatResult = button.nextElementSibling; // relic-stat-result

    for (let relic of allRelics) {
      if (inputField.id == relic.name) {
        relic.level = 1; // to avoid NaN and other bugs

        inputField.value = '';
        // also set the bonus value to its multiplier as base(by default when lvl 1)
        relicStatResult.innerText = `+${relic.multiplier}${relic.shortDescription}`;
        setLocalStorage(); // RESET LOCAL STORAGE;
      }
    }
  })
})


// CHANGING INPUT VALUE IF IT BECOMES MORE THAN relicClass.maxLevel
const cappedRelicInputField = document.querySelectorAll('.restricted');
const cappedLevelColor = 'rgb(221, 224, 22)';

cappedRelicInputField.forEach(input => {
  // Get the description of each relic
  let relicStatResult = input.nextElementSibling.nextElementSibling;

  for (let relic of allRelics) {
    input.addEventListener('input', () => {
      if (input.id == relic.name) {
        if (input.value >= relic.maxLevel) {
          // update the relic.level value
          relic.level = relic.maxLevel;
          input.value = relic.maxLevel;

          input.style.color = cappedLevelColor;  // change color when reached the max level

          relicStatResult.innerText = `+${relic.maxLevel * relic.multiplier}${relic.shortDescription}`;
          setLocalStorage(); // Update localStorage to prevent lvl going past the limit (100+/250+)
        }
        // Make color change dynamic, if max lvl - yellow, if not - white
        if (input.value < relic.maxLevel) {
          input.style.color = 'white';
        } else {
          input.style.color = cappedLevelColor;
        }
      }
    })
    // when the page is reloaded the color is still applied
    if (input.id == relic.name && input.value >= relic.maxLevel) {
      input.style.color = cappedLevelColor;
    }
  }
});



// -------------------- OPTIONS SECTION

// Toggle Options
const optionToggleRelicNames = document.getElementById('toggleRelicNames');
const optionToggleRelicStats = document.getElementById('toggleStats');
const optionToggleCappedRelics = document.getElementById('toggleCappedRelics');
const optionToggleSpoilerRelic = document.getElementById('toggleSpoiler');

// Toggle Options Corresponding Classes
const relicCardName = document.querySelectorAll('.relics--card__name');
const relicCardStatResult = document.querySelectorAll('.relics--card--stat__result');
const cappedRelicCard = document.querySelectorAll('.capped');
const spoilerRelic = document.querySelector('#spoilerChar');


// Utility functions:
// Checks if an element has .hidden. Returns true or false that will be stored in local storage as a value
const hasHideClass = (element) => {
  let containsHide;
  return element.classList.contains('hidden') ? containsHide = true : containsHide = false;
}

// Switches [Hide/Show] Relic Names, Stats, Hidden Relic etc.
const replaceOptionName = (optionId) => {
  let setHide = optionId.innerText.replace('Show', 'Hide');
  let setShow = optionId.innerText.replace('Hide', 'Show');
  return optionId.innerText.match(/Show/) ? optionId.innerText = setHide : optionId.innerText = setShow;
}

// Template for each Show/Hide Setting that also stores local storage values
const stateOfToggleOption = (optionId, optionElementClass, setLocalStorageKeyState) => {
  optionId.addEventListener('click', () => {
    replaceOptionName(optionId);
    optionElementClass.forEach(element => { // relicCardName/relicCardStatResult
      element.classList.toggle('hidden'); // loop through them and toggle each of them
      localStorage.setItem(setLocalStorageKeyState, hasHideClass(element));
    })
  })
};


// Retrieve the state of each toggle option from localstorage and apply it
const retrieveOptionNameStateFromLocalStorage = (toggleOptionName, localStorageKey, exception) => {
  let setHide = toggleOptionName.innerText.replace('Show', 'Hide');
  let setShow = toggleOptionName.innerText.replace('Hide', 'Show');
  const result = {[localStorageKey]: localStorage.getItem(localStorageKey)};
  if (result[localStorageKey] == 'false') { toggleOptionName.innerText = setHide }
  if (result[localStorageKey] == 'true') { toggleOptionName.innerText = setShow; }
  if (exception) {
    if (result[localStorageKey] == 'false') { toggleOptionName.innerText = setShow }
    if (result[localStorageKey] == 'true') { toggleOptionName.innerText = setHide; }
  }
}

// Getting the value from local storage and apply it
const applyOptionStateFromLocalStorage = (option, isHidden) => {
  option.forEach(elem => {
    if (isHidden) { elem.classList.add('hidden') };
    if (!isHidden) { elem.classList.remove('hidden') };
  })
};


// Dark Lord Relic Option

const displaySpoilerRelic = () => {
  spoilerRelic.classList.toggle('hidden')
  let isSpoilerShown;
  if (spoilerRelic.classList.contains('hidden')) { isSpoilerShown = false; }
  if (!spoilerRelic.classList.contains('hidden')) { isSpoilerShown = true; }
  localStorage.setItem('isSpoilerShown', isSpoilerShown)
}

const loadSpoilerRelicStateFromLs = (isActive) => {
  if (isActive == false) { spoilerRelic.classList.add('hidden') }
  if (isActive == true) { spoilerRelic.classList.remove('hidden') }
}


stateOfToggleOption(optionToggleRelicNames, relicCardName, 'relicNameIsHidden')
stateOfToggleOption(optionToggleRelicStats, relicCardStatResult, 'statIsHidden')
stateOfToggleOption(optionToggleCappedRelics, cappedRelicCard, 'cappedRelicIsHidden')


// Local storage
let lsRelicNameIsHidden = JSON.parse(localStorage.getItem('relicNameIsHidden'));
let lsStatIsHidden = JSON.parse(localStorage.getItem('statIsHidden'));
let cappedRelicIsHidden = JSON.parse(localStorage.getItem('cappedRelicIsHidden'));
let localStorageSpoilerValue = JSON.parse(localStorage.getItem('isSpoilerShown'));

localStorage.getItem(lsRelicNameIsHidden);
localStorage.getItem(lsStatIsHidden);
localStorage.getItem(cappedRelicIsHidden);

retrieveOptionNameStateFromLocalStorage(optionToggleRelicNames, 'relicNameIsHidden');
retrieveOptionNameStateFromLocalStorage(optionToggleRelicStats, 'statIsHidden');
retrieveOptionNameStateFromLocalStorage(optionToggleCappedRelics, 'cappedRelicIsHidden');
retrieveOptionNameStateFromLocalStorage(optionToggleSpoilerRelic, 'isSpoilerShown', true);

applyOptionStateFromLocalStorage(relicCardName, lsRelicNameIsHidden);
applyOptionStateFromLocalStorage(relicCardStatResult, lsStatIsHidden);
applyOptionStateFromLocalStorage(cappedRelicCard, cappedRelicIsHidden);

optionToggleSpoilerRelic.addEventListener('click', () => {
  replaceOptionName(optionToggleSpoilerRelic);
  displaySpoilerRelic();
});
loadSpoilerRelicStateFromLs(localStorageSpoilerValue);



// RESET ALL RELIC LEVES BUTTON
resetAllRelicLevels.addEventListener('click', () => {
  for (let relic of allRelics) {

    levelInput.forEach(input => {
      let relicStatResult = input.nextElementSibling.nextElementSibling;
      // set to empty because there number 1 in the input field, meaning if i type a number it will always be 142 i.e 1(the first index) won't be removed
      input.value = '';

      // to access each relic-bonus and change it based on the relic
      if (input.id == relic.name) {
        relic.level = 1;
        relicStatResult.innerText = `+${relic.multiplier}${relic.shortDescription}`
        setLocalStorage();
      }
    });
  }
});