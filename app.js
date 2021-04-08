const addLvlButton = document.querySelectorAll('.add-level');
const levelInput = document.querySelectorAll('.level-input');
const resetBtn = document.querySelectorAll('.btn-delete');
const resetAll = document.querySelector('.btn-delete-all');

// used for limiting relic level to a certain value
const restricted = document.querySelectorAll('.restricted');


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
const critChanceRelic = new RelicRestrictedLvl('critChanceRelic', 1, 1, 0.1,'% Crit Chance', 250);
const critDmgRelic = new RelicRestrictedLvl('critDmgRelic', 1, 1, 0.5,'% Crit Damage', 250);
const essenceRelic = new RelicRestrictedLvl('essenceRelic', 1, 1, 0.2,'% Essence Find', 100);
const regenRelic = new RelicRestrictedLvl('regenRelic', 1, 1, 1,' HP Regen', 100);


console.log(regenRelic);

const relicsDictionary = {
  healthRelic: 'relicHealthDescription',
  physBoostRelic: 'relicPhysBoostDescription',
  magicBoostRelic: 'relicMagicBoostDescription',
  goldRelic: 'relicGoldDescription',
  attackRelic: 'relicAttackDescription',
  manaRelic: 'relicManaDescription',
  critChanceRelic: 'relicCritChanceDescription',
  critDmgRelic: 'relicCritDmgDescription',
  essenceRelic: 'relicEssenceDescription',
  regenRelic: 'relicRegenDescription'
};


// EVAL() REPLACEMENT. BECAUSE EVAL() IS TOO DANGEROUS TO USE
function evalReplacer(obj){
  return Function('"use strict";return (' + obj + ')')();
};


// INPUT FIELD CALCULATION.
// I WANNA MAKE IT SCALABLE, I'M AFRAID I WON'T UNDERSTAND WHAT I DID WHEN I LOOK BACK AT IT LMAO

levelInput.forEach(item => {

    // use dictionary as a way to access relics' classes properties
    for (const [key, value] of Object.entries(relicsDictionary)) {

      // make it empty
      if (item.value.length == 0) { item.value = ``; }

      // when empty set description to its relic multiplier and its relic description. eval(value) -> relicXxxxxxDescription. eval(key) -> xxxRelic
      evalReplacer(value).innerText = `+${evalReplacer(key).multiplier}${evalReplacer(key).shortDescription}`;

      // get each element with .level-input class
      item.addEventListener('input', updateValue => {

        if (item.id == evalReplacer(key).name) { // check if it's equal to one of the relics' name
        // insert values into specific relic description if true
          evalReplacer(key).level = parseInt(updateValue.target.value);

          // if empty make it lvl 0, to avoid NaN
          if (updateValue.target.value.length < 1) { evalReplacer(key).level = 1; };

          evalReplacer(value).innerText = `+${evalReplacer(key).value()}${evalReplacer(key).shortDescription}`;
        }
    })
  }
})


// Reset level button
resetBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    for (const [key, value] of Object.entries(relicsDictionary)) {
      if (e.target.previousElementSibling.id == evalReplacer(key).name) {

        // set relic lvl to 1
        evalReplacer(key).level = 1;

        // go to the input element and set it to the lvl of the relic;
        e.target.previousElementSibling.value = '';
        // also set the bonus value to 0 as it is by default;
        evalReplacer(value).innerText = `+${evalReplacer(key).multiplier}${evalReplacer(key).shortDescription}`;
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

    for (const prop in relicsDictionary) {

      evalReplacer(prop).level = 1;
      // set to empty because there will be level 1, meaning if i type a number it will always be 142 i.e 1(the first index) won't be removed
      inputFieldsToDelete[i].value = '';

      if (inputFieldsToDelete[i].parentNode.nextElementSibling.className == eval(relicsDictionary[prop]).className) {
        evalReplacer(relicsDictionary[prop]).innerText = `+${evalReplacer(prop).multiplier}${evalReplacer(prop).shortDescription}`;
      }
    }
  }

    // EXPLANATION:

    // console.log(eval(relicsDictionary[prop]).className); -> relic-bonus relic-desc-health
    // console.log(inputFieldsToDelete[i].parentNode.nextElementSibling.className); -> relic-bonus relic-desc-health
    // console.log(relicsDictionary[prop]); -> relicGoldDescription, relicAttackDescription etc.
    // console.log(evalReplacer(prop)); -> Relic {name: "goldRelic", level: 1, multiplier: 1, shortDescription: "% Gold Find"}
});


restricted.forEach(subRestricted => {
  for (const [key, value] of Object.entries(relicsDictionary)) {

    subRestricted.addEventListener('input', () => {
      console.log(key, value);
      console.log(subRestricted.value > 200);
      if (subRestricted.value > 250 || subRestricted.value < 0) {
        subRestricted.value = evalReplacer(key).maxLevel;
        relicRegenDescription.innerText = regenRelic.maxLevel;
      } else {
        subRestricted.value = 1;
      }
    })
  }
})