const levelInput = document.querySelectorAll('.level-input');
const resetBtn = document.querySelectorAll('.btn-delete');
const resetAll = document.querySelector('.btn-delete-all');
const form = document.querySelector('.relic-form');
const saveData = document.querySelector('#saveData');

// used for limiting relic level to a certain value
const relicLevelCapped = document.querySelectorAll('.restricted');


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
    // let result = Math.round((this.level *= this.multiplier) * 100) / 100;
    return Math.floor(this.level *= this.multiplier);
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
  regenRelic
];

// LOCAL STORAGE
localStorage.getItem('myKey');


// INPUT FIELD CALCULATION. RECEIVE A VALUE IN ORDER TO CALCULATE IT FOR RELIC BONUS DESCRIPTION
// --------------  REFACTORED --------------
levelInput.forEach(item => {

  // #################################### LOAD FORM LOCAL STORAGE HERE

  for (let relic of mainRelics) {
    // relic-bonus of each relic class
    let relicDescription = item.nextElementSibling.nextElementSibling;

    // if input is empty set description to its relic multiplier and relic description, basically set it to minLevel
    if (item.value.length == 0) {
      if (item.id == relic.name) {
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

        // update relic level so it doesn't get the value of relic.value(). Actually, I should change the code, so I don't use relic.level = ... before the if statement, cause that's what caused the bug
        relic.level = parseInt(updateValue.target.value);
        // remove NaN level. Damn I really gotta sort this thing out. ...but later
        if (updateValue.target.value.length === 0) { relic.level = 1; };
      };
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
      }
      localStorage.setItem(JSON.stringify(relic.name), JSON.stringify(relic.level));
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
      }
    });

    // RESET LOCAL STORAGE
    localStorage.setItem(JSON.stringify(relic.name), JSON.stringify(relic.level));
  }
});


// CHANGING INPUT VALUE IF IT BECOMES MORE THAN relicClass.maxLevel
relicLevelCapped.forEach(elemCapped => {
  let relicDescription = elemCapped.nextElementSibling.nextElementSibling;

  for (let relic of mainRelics) {
    elemCapped.addEventListener('input', () => {
      if (elemCapped.id == relic.name) {
        if (elemCapped.value > relic.maxLevel) {
          elemCapped.value = relic.maxLevel;
          relicDescription.innerText = `+${relic.maxLevel}${relic.shortDescription}`;

          // update the relic.level value
          relic.level = relic.maxLevel
        }
      }
    })
  }
});


// SAVE TO LOCAL STORAGE
saveData.addEventListener('click', () => {
  let relicKeys = [];
  let relicValues = [];

  for (let relicData of mainRelics) {
    relicKeys.push(relicData.name);
    relicValues.push(relicData.level);
  }

  let result = relicKeys.reduce((result, value, index) => {
    result[value] = relicValues[index];
    return result;
  }, {})
  console.log(result);
  const relicStorage = JSON.stringify(result);
  localStorage.setItem('relics', JSON.stringify(relicStorage));
});


// onmouseover="test()
// const test = () => {
//   // console.log('s');
//   console.log(testtest);
// };

