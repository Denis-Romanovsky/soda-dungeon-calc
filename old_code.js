// OLD CODE

// addLvlButton[0].addEventListener('click', () => {
//   // Check if it's equal to one of multiplierArr values, if true increment by the value;
//   for (let i = 0; i < multipliersArr.length; i++) {
//     if (addLvlButton[0].innerText == multipliersArr[i]) {
//       healthRelic.level += multipliersArr[i];
//     }
//   }
//   relicLvl[0].innerText = `Current Level: ${healthRelic.level}`
//   healthRelic.value();
//   relicAddLvlHealth.innerText = `Current Bonus: +${healthRelic.value()} HP.`;
// });



// Left Arrow Button
// incrementLess.addEventListener('click', () => {
//   for (let i = 0; i <= multipliersArr.length; i++) {
//     if (addLvlButton[0].innerHTML == multipliersArr[i]) { addLvlButton[0].innerHTML = multipliersArr[i - 1]; }
//     if (addLvlButton[0].innerHTML === 'undefined') { addLvlButton[0].innerHTML = multipliersArr[multipliersArr.length - 1]; }
//     console.log(addLvlButton[0].innerText);
//   }
// })


// if (addLvlButton[0].innerHTML == multipliersArr[i]) {
//   addLvlButton[0].innerHTML = multipliersArr[i - 1];
//   if (addLvlButton[0].innerHTML === 'undefined') { // if the index is negative change it to the last one;
//     addLvlButton[0].innerHTML = multipliersArr[multipliersArr.length - 1];
//   }
// }



// PHYS BOOST RELIC
// addLvlButton[1].addEventListener('click', () => {
//   physBoostRelic.level++;
//   relicLvl[1].innerText = `Current Level: ${physBoostRelic.level}`
//   physBoostRelic.value();
//   relicAddLvlPhysBoost.innerText = `Current Bonus: +${physBoostRelic.value()}% Boost to Physical Attacks.`;
// });
// console.log(physBoostRelic.value());



// RIGHT ARROW BUTTON
// incrementMore.addEventListener('click', () => {
//   for (let i = 0; i < multipliersArr.length; i++) {
//     if (addLvlButton[0].innerHTML == multipliersArr[i]) {
//       // console.log(multipliersArr[i]);
//       addLvlButton[0].innerHTML = multipliersArr[i + 1];
//       if (addLvlButton[0].innerHTML === 'undefined') { // if the index is bigger than possible change it to index 0
//         addLvlButton[0].innerHTML = multipliersArr[0];
//       }
//     }
//   }
// })


// HEALTH RELIC
// incrementMore.addEventListener('click', event => {
//     event.preventDefault();
//     healthRelic.level = parseInt(incrementsInput.value);
//     healthRelic.value();
//     if (incrementsInput.value == '' || incrementsInput.value == /\w/gi) { healthRelic.level = 1; };
//     relicLvl[0].innerText = `Current Level: ${healthRelic.level}`;
//     relicHealthStat.innerText = `Current Bonus: +${healthRelic.value()} HP.`;
// })


// incrementLess.addEventListener('click', (e) => {
//   // e.preventDefault();
//   healthRelic.level = 1;
//   healthRelic.value();
//   relicLvl[0].innerText = `Current Level: ${healthRelic.level}`;
//   relicHealthStat.innerText = `Current Bonus: +${healthRelic.value()} HP.`;
// })



// levelInput.addEventListener('input', updateValue => {
//     healthRelic.level = parseInt(updateValue.target.value); // updates values in real time and assigns to the variable
//     if (updateValue.target.value.length < 1) {
//       healthRelic.level = 0;
//     }
//     relicHealthDescription.innerText = `+${healthRelic.value()} HP`; // RETURNS RESULT
// })




// COMMAS FOR VALUES I.E 111,222,333,444.
// value() {
//   // let result = Math.round((this.level *= this.multiplier) * 100) / 100;
//   let result = Math.floor(this.level *= this.multiplier);
//   // ADDING COMMAS TO SEPARATE NUMBERS
//   let splitResult = result.toString().split('');
//   for (let i = 0; i < splitResult.length; i +=4 ) {
//     splitResult.splice(splitResult.length - i, 0, ',')
//   }
//   // Remove the comma in the end
//   splitResult.splice(splitResult.length - 1, 1)
//   let newResult = splitResult.join('')
//   return newResult;
// }


// class RelicPhysBoost extends Relic {
//   value() {
//     let result = Math.round((this.level *= this.multiplier) * 100) / 100;
//     let splitResult = result.toString().split('');
//     for (let i = 0; i < splitResult.length; i += 4 ) {
//       splitResult.splice(splitResult.length - i, 0, ',')
//     }
//     // Remove the comma in the end
//     splitResult.splice(splitResult.length - 1, 1)
//     // and next to the (.75)
//     splitResult.splice(splitResult.length - 4, 1)
//     let newResult = splitResult.join('')
//     return newResult;
//   }
// };

// class RelicMagBoost extends Relic {
//   value() {
//     let result = Math.round((this.level *= this.multiplier) * 100) / 100;
//     let splitResult = result.toString().split('');
//     for (let i = 0; i < splitResult.length; i += 4 ) {
//       splitResult.splice(splitResult.length - i, 0, ',')
//     }
//     // Remove the comma in the end
//     splitResult.splice(splitResult.length - 1, 1)
//     // and next to the (.75)
//     splitResult.splice(splitResult.length - 4, 1)
//     let newResult = splitResult.join('')
//     return newResult;
//   }
// };