const addLvlButton = document.querySelectorAll('.add-level');
const levelInput = document.querySelectorAll('.level-input');
const resetBtn = document.querySelectorAll('.btn-delete');
const resetAll = document.querySelector('.btn-delete-all');

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

class RelicRestrictedLvl extends Relic {
  constructor(name, level, minLevel, multiplier, shortDescription, maxLevel) {
    super(name, level, minLevel, multiplier, shortDescription);
    this.maxLevel = maxLevel;
  }
};


// ------------------------ RELIC BONUS DESCRIPTIONS ------------------------ \\
const relicHealthDescription = document.querySelector('.relic-desc-health');
const relicPhysBoostDescription = document.querySelector('.relic-desc-phys');
const relicMagicBoostDescription = document.querySelector('.relic-desc-magic');
const relicGoldDescription = document.querySelector('.relic-desc-gold');
const relicAttackDescription = document.querySelector('.relic-desc-attack');
const relicManaDescription = document.querySelector('.relic-desc-mana');
const relicCritChanceDescription = document.querySelector('.relic-desc-crit-chance');
const relicCritDmgDescription = document.querySelector('.relic-desc-crit-dmg');
const relicEssenceDescription = document.querySelector('.relic-desc-essence');
const relicRegenDescription = document.querySelector('.relic-desc-regen');




// CREATE RELICS
const healthRelic = new Relic('healthRelic', 1, 1, 5, ' HP');
const physBoostRelic = new Relic('physBoostRelic', 1, 1, 0.25,'% to Physical Attacks');
const magicBoostRelic = new Relic('magicBoostRelic', 1, 1, 0.2,'% to Magic Attacks');
const goldRelic = new Relic('goldRelic', 1, 1, 1,'% Gold Find');
const attackRelic = new Relic('attackRelic', 1, 1, 2,' Attack');
const manaRelic = new Relic('manaRelic', 1, 1, 3,' MP');

// Level Capped Relics
const critChanceRelic = new RelicRestrictedLvl('critChanceRelic', 1, 1, 0.1,'% Crit Chance', 250);
const critDmgRelic = new RelicRestrictedLvl('critDmgRelic', 1, 1, 0.5,'% Crit Damage', 250);
const essenceRelic = new RelicRestrictedLvl('essenceRelic', 1, 1, 0.2,'% Essence Find', 100);
const regenRelic = new RelicRestrictedLvl('regenRelic', 1, 1, 1,' HP Regen', 100);

// Array of objects that can be accessible. Will do it tomorrow.
const test = [healthRelic, physBoostRelic];

const relicsDictionary = {
  healthRelic: 'relicHealthDescription',
  physBoostRelic: 'relicPhysBoostDescription',
  magicBoostRelic: 'relicMagicBoostDescription',
  goldRelic: 'relicGoldDescription',
  attackRelic: 'relicAttackDescription',
  manaRelic: 'relicManaDescription',

  // Level Capped Relics
  critChanceRelic: 'relicCritChanceDescription',
  critDmgRelic: 'relicCritDmgDescription',
  essenceRelic: 'relicEssenceDescription',
  regenRelic: 'relicRegenDescription'
};


// EVAL() REPLACEMENT. BECAUSE EVAL() IS TOO DANGEROUS TO USE
function evalReplacer(obj){
  return Function('"use strict";return (' + obj + ')')();
};


// INPUT FIELD CALCULATION. RECEIVE A VALUE IN ORDER TO CALCULATE IT FOR RELIC BONUS DESCRIPTION
levelInput.forEach(item => {

    // use dictionary as a way to access relics' classes properties
    for (const [relicClass, relicDescription] of Object.entries(relicsDictionary)) {

      // make it empty
      if (item.value.length == 0) { item.value = ``; }

      // when empty set description to its relic multiplier and its relic description. eval(value) -> relicXxxxxxDescription. eval(relicClass) -> xxxRelic
      evalReplacer(relicDescription).innerText = `+${evalReplacer(relicClass).multiplier}${evalReplacer(relicClass).shortDescription}`;

      // get each element with .level-input class
      item.addEventListener('input', updateValue => {

        if (item.id == evalReplacer(relicClass).name) { // check if it's equal to one of the relics' name
        // insert values into specific relic description if true
          evalReplacer(relicClass).level = parseInt(updateValue.target.value);

          // if empty make it lvl 1, to avoid NaN
          if (updateValue.target.value.length < 1) { evalReplacer(relicClass).level = 1; };

          evalReplacer(relicDescription).innerText = `+${evalReplacer(relicClass).value()}${evalReplacer(relicClass).shortDescription}`;
          // console.log(evalReplacer(relicClass));
        }

    })
  }
})


// Reset level button
resetBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    for (const [relicClass, relicDescription] of Object.entries(relicsDictionary)) {
      if (e.target.previousElementSibling.id == evalReplacer(relicClass).name) {

        // set relic lvl to 1
        evalReplacer(relicClass).level = 1;

        // go to the input element and set it to the lvl of the relic;
        e.target.previousElementSibling.value = '';
        // also set the bonus value to 0 as it is by default;
        evalReplacer(relicDescription).innerText = `+${evalReplacer(relicClass).multiplier}${evalReplacer(relicClass).shortDescription}`;
      }
    }
  })
})

// FIND ALL THE ELEMENTS THAT CONTAIN THIS CLASS. DON'T KNOW WHY I DID THIS,
// I MEAN THERE'S PROBABLY NO DIFFERENCE BETWEEN QUERY SELECTOR ALL AND THIS, BUT WHO KNOWS
const inputFieldsToDelete = document.getElementsByClassName('level-input')


// RESET ALL BUTTON
resetAll.addEventListener('click', () => {
  for (let i = 0; i < inputFieldsToDelete.length; i++) {

    for (const relic in relicsDictionary) {

      evalReplacer(relic).level = 1;
      // set to empty because there will be level 1, meaning if i type a number it will always be 142 i.e 1(the first index) won't be removed
      inputFieldsToDelete[i].value = '';

      if (inputFieldsToDelete[i].parentNode.nextElementSibling.className == eval(relicsDictionary[relic]).className) {
        evalReplacer(relicsDictionary[relic]).innerText = `+${evalReplacer(relic).multiplier}${evalReplacer(relic).shortDescription}`;
      }
    }
  }

    // EXPLANATION:

    // console.log(eval(relicsDictionary[prop]).className); -> relic-bonus relic-desc-health
    // console.log(inputFieldsToDelete[i].parentNode.nextElementSibling.className); -> relic-bonus relic-desc-health
    // console.log(relicsDictionary[prop]); -> relicGoldDescription, relicAttackDescription etc.
    // console.log(evalReplacer(prop)); -> Relic {name: "goldRelic", level: 1, multiplier: 1, shortDescription: "% Gold Find"}
});


// CHANGING INPUT VALUE IF IT BECOMES MORE THAN relicClass.maxLevel
relicLevelCapped.forEach(lvlCapped => {
  for (const [relicClass, relicDescription] of Object.entries(relicsDictionary)) {

    lvlCapped.addEventListener('input', () => {
      // console.log(lvlCapped.className);
      // console.log(relicClass.name);
      // console.log(lvlCapped.value > evalReplacer(relicClass).maxLevel);
      if (lvlCapped.id == evalReplacer(relicClass).name) {
        if (lvlCapped.value > evalReplacer(relicClass).maxLevel) {
          lvlCapped.value = evalReplacer(relicClass).maxLevel;
          evalReplacer(relicDescription).innerText = `+${evalReplacer(relicClass).maxLevel}${evalReplacer(relicClass).shortDescription}`;
          // evalReplacer(relicClass).level = evalReplacer(relicClass).maxLevel;
        }
        // console.log(evalReplacer(relicClass).name);
        // console.log(evalReplacer(relicClass).level);
      }
    })
  }
})

console.log(test[0]);