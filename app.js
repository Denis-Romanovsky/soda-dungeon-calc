const levelInput = document.querySelectorAll('.relics--card--stat__level-input');
const resetBtn = document.querySelectorAll('.btn-delete');
const resetAll = document.querySelector('.btn-delete-all');
const relicCard = document.querySelectorAll('.relics--card');
const relicName = document.querySelectorAll('.relics--card__name');
const hideRelicNames = document.querySelector('#hideRelicNames');

// used for limiting relic level to a certain value
const relicLevelCapped = document.querySelectorAll('.restricted');

const menu = document.querySelector('.menu');
const menuToggleButton = document.querySelector('.menu--toggle');

// const saveData = document.querySelector('#saveData');

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
    return Math.floor(this.level * this.multiplier);
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
const mainRelics = [
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
  for (let eachRelic of mainRelics) {
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


if (localStorage.length === 0) {
  setLocalStorage();
}

const relicStored = JSON.parse(localStorage.getItem('relics'))
localStorage.getItem('relics', JSON.stringify(relicStored))


// ---------------------- Website UI Related Stuff ----------------------
const toggleMenu = () => {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active')
  } else {
    menu.classList.add('active');
  }
}

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
    console.log(section);
    section.classList.remove('is-active');
  });
}

const addActiveTab = tab => {
  tab.classList.add('is-active');
  const href = tab.querySelector('a').getAttribute('href');
  const matchingSection = document.querySelector(href);
  matchingSection.classList.add('is-active');
}



// ---------------------- LOGIC PART OF THE CODE ----------------------

// INPUT FIELD CALCULATION. RECEIVE A VALUE IN ORDER TO CALCULATE IT FOR RELIC BONUS DESCRIPTION
// --------------  REFACTORED --------------
levelInput.forEach(item => {

  // relic-bonus of each relic class
  let relicDescription = item.nextElementSibling.nextElementSibling;

  for (let relic of mainRelics) {

    // LOCAL STORAGE
    if (relicStored.hasOwnProperty(relic.name) && item.id === relic.name) {
      relic.level = relicStored[relic.name];
      item.value = relic.level
      relicDescription.innerText = `+${relic.value()}${relic.shortDescription}`;
    }

    // set to empty because there number 1 in the input field, meaning if I type a number it will always be 142 i.e 1(the first index) won't be removed
    if (item.value.length == 0 || relic.level == 1) {
      if (item.id == relic.name) {
        item.value = '';
        // if input is empty set description to its relic multiplier and relic description, basically set it to minLevel
        relicDescription.innerText = `+${relic.multiplier}${relic.shortDescription}`;
      };
    };

    // update descriptions in real time based on input
    item.addEventListener('input', updateValue => {
      // get access to each relic-bonus to edit them individually if item.id is equal to relic.name
      // insert values into specific relic description if true
      if (item.id == relic.name) {
        relic.level = parseInt(updateValue.target.value);

        // if empty make it lvl 1, to avoid NaN
        if (updateValue.target.value.length === 0) { relic.level = 1; };

        // set relic description
        relicDescription.innerText = `+${relic.value()}${relic.shortDescription}`;
        console.log(relic.value());
      };
      setLocalStorage(); // Update localStorage in real time
    });
  };
});


// Reset level button
resetBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    let relicDescription = btn.nextElementSibling; // find relic-bonus

    for (let relic of mainRelics) {
      if (e.target.previousElementSibling.id == relic.name) {
        relic.level = 1; // to avoid NaN and other bugs

        e.target.previousElementSibling.value = ''; // empty the input field
        // also set the bonus value to its multiplier as base(by default when lvl 1)
        relicDescription.innerText = `+${relic.multiplier}${relic.shortDescription}`;
        setLocalStorage(); // RESET LOCAL STORAGE;
      }
    }
  })
})


// RESET ALL BUTTON
resetAll.addEventListener('click', () => {
  for (let relic of mainRelics) {

    levelInput.forEach(elem => {
      let relicDescription = elem.nextElementSibling.nextElementSibling;
      // set to empty because there number 1 in the input field, meaning if i type a number it will always be 142 i.e 1(the first index) won't be removed
      elem.value = '';

      // to access each relic-bonus and change it based on the relic
      if (elem.id == relic.name) {
        relic.level = 1;
        relicDescription.innerText = `+${relic.multiplier}${relic.shortDescription}`
        setLocalStorage(); // RESET LOCAL STORAGE
      }
    });
  }
});


// CHANGING INPUT VALUE IF IT BECOMES MORE THAN relicClass.maxLevel
relicLevelCapped.forEach(elemCapped => {
  // Get the description of each relic
  let relicDescription = elemCapped.nextElementSibling.nextElementSibling;

  for (let relic of mainRelics) {
    elemCapped.addEventListener('input', () => {
      if (elemCapped.id == relic.name) {
        if (elemCapped.value > relic.maxLevel) {
          elemCapped.value = relic.maxLevel;
          relicDescription.innerText = `+${relic.maxLevel}${relic.shortDescription}`;

          // update the relic.level value
          relic.level = relic.maxLevel
          setLocalStorage(); // Update localStorage to prevent lvl going past the limit (100+/250+)
        }
      }
    })
  }
});


// SAVE TO LOCAL STORAGE
// saveData.addEventListener('click', () => {
//   if (localStorage.length !== 0) {
//     setLocalStorage();
//   }
// });


// Toggle relic names
hideRelicNames.addEventListener('click', () => {
  relicName.forEach(name => {
    name.classList.toggle('hide-full');
  })
})

// onmouseover="test()
// const test = () => {
//   // console.log('s');
//   console.log(testtest);
// };