// trigger enter key
let userInput = document.getElementById('userInput');
userInput.addEventListener("keypress", function(event){
    if (event.key == "Enter"){
        event.preventDefault();
        btn.click();
        userInput.value = "";
    }
})

// set up variables
  let btn = document.getElementById("btn");
  let output = document.getElementById('outputText');
  let startBtn = document.getElementById('startBtn');
  let startGame = document.getElementById('startGame');
  let gameSection = document.getElementById('gameSection');
  let explainSection = document.getElementById('explain');
  let i = 0; // timer counter
  container.removeChild(gameSection);

// define numComp no matter game starts or not.
// let numComp = Math.floor(Math.random() * 9000)+1000; <-- gives repititive digits
let numComp = "0123456789".split('').map(Number)
.sort(()=> Math.random() - 0.5).slice(0, 4).join('');
console.log('Game is on, computer goes with: ' + numComp);


// game starter
startBtn.addEventListener('click', function() {
    // remove start button div 
    container.removeChild(startGame);

    // show thinking dialogue
    let think = document.createElement('p')
    think.innerHTML = 'OK...let me think...'
    container.appendChild(think);

    setTimeout(() => {
        container.removeChild(think);
        let excuse = document.createElement('p');
        excuse.id = 'excuse';
        excuse.innerHTML = 'Hmmm';
        container.appendChild(excuse);
    }, 1000);


    setTimeout(() => {
        //remove previous dialogue
        let excuse = document.getElementById('excuse');
        container.removeChild(excuse);

        // generate computer 4-digits and show dialogue   
        let compAns = document.createElement('p');
        compAns.id = 'compAns'
        compAns.innerHTML = 'OK I have it now! Go ahead'
        container.appendChild(compAns);

       

        // show game section: gameSection, userInput, btn
        container.appendChild(gameSection);

        
    }, 2000);

    // generate timer section
    setTimeout(() => {
      let timer = document.createElement('p')
      timer.id = 'timer';
      container.insertBefore(timer, container.children[4]);
      const timerCounts = setInterval(() => {
        i++
        timer.innerHTML = 'Timer: ' + i + ' secnods';
      }, 1000);
    }, 2000);
})

// game function
btn.addEventListener('click', function(){
    let input = document.getElementById('userInput').value;
    if ( input.length === 4 && input.split('').map(Number).reduce((a, b) => a+b) > 0 ) {
        // make input an array first.
        const arrComp = numComp.toString().split('').map(Number);
        const arrHuman = input.toString().split('').map(Number);
        // test A loop, use for method to find A-matching digits
        let testA = []; 
        for (let i = 0; i < 4; i++) {
          if (arrHuman[i] === arrComp[i]) {
            testA.push(arrHuman[i]);
            delete arrHuman[i];
            delete arrComp[i];
          }
        }
          // refresh array by filter out undefined.
        const arrHumanB = arrHuman.filter(v => v !== -1 );
        const arrCompB = arrComp.filter(v => v !== -1);
      // test B loop, position doesn't matter so use include method
      // also delete matched digit to prevent double counting
      let testB = []; 
      for (let j = 0; j < arrHumanB.length; j++) {
        if (arrCompB.includes(arrHumanB[j])) {
        testB.push(arrHumanB[j]);
        delete arrCompB[arrCompB.indexOf(arrHumanB[j])];
        }
      }
      // return result
      if (testA.length === 4) {
        let success = document.createElement('p');
        let times = output.childNodes.length;
        let compAns = document.getElementById('compAns');
        container.removeChild(timer);
        success.innerHTML = `4A0B, YOU WIN! You've tried ${times+1} times in ${i} seconds. `;
        container.removeChild(gameSection);
        container.removeChild(compAns);
        container.appendChild(success);


      } else {
        let hint = document.createElement('li');
        hint.innerHTML = `${input}  is  ${testA.length}A${testB.length}B`;
        output.appendChild(hint);
      }
    }
    else  {
        // return error when format doesn't fit
        let error = document.createElement('li');
        error.innerHTML = 'Nope, wrong format';
        output.appendChild(error);
    }

})

