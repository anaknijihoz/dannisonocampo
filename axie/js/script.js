var currentEnergy = 3;
var previousEnergy = 3;
var energyUsed = 0;
var energyGained = 0;
var energyDestroyed = 0;
var energyNextRound = 0;
var runningEnergy = 3;
var round = 1;


var axie_frontcardremaining = 8 ; 
var axie_middlecardremaining = 8 ; 
var axie_backcardremaining = 8 ; 
var isUndoActive = false;

var previousCard = 6;
var currentCard = 6;
var card = 0;
var cardUsed = 0;
var cardDraw = 0;
var cardDiscard = 0;



/************************** SIMPLE CALCULATOR **********************************************/
function simpleAdd(){

    energyUsed = energyUsed + 1;
    runningEnergy = runningEnergy - 1;
    
    if(runningEnergy <= 0)
    runningEnergy = 0;

    $("#current-energy").text(runningEnergy);

    if(energyUsed > currentEnergy)
        energyUsed = currentEnergy;
    $("#energy-used-text").text(energyUsed);
}

function simpleMinus(){
    energyUsed = energyUsed - 1;
    runningEnergy = runningEnergy + 1;
 
    $("#current-energy").text(runningEnergy);
    $("#energy-used-text").text(energyUsed);
}

function simpleEndTurn(){
    round = round + 1;
    previousEnergy = currentEnergy;
    previousCard = currentCard;

    currentEnergy = runningEnergy + 2;
    
    if(currentEnergy >= 10)
        currentEnergy = 10;

    if(currentEnergy < 2)
        currentEnergy = 2;

    runningEnergy = currentEnergy;  

    if(round >= 10)
        $(".bg-overlay").css("background", "#b52930ad");
    else  
        $(".bg-overlay").css("background", "#c07f5aad");

    
    $("#current-energy").text(currentEnergy); 
    $("#round-text span").text(round); 
    energyUsed = 0;
    energyGained = 0;
    energyDestroyed = 0;
    $("#energy-used-text").text(energyDestroyed);
    $("#energy-gained-text").text(energyDestroyed);
    $("#energy-destroyed-text").text(energyDestroyed);
    $("#undo-btn").attr("disabled",false);
    $(".undo").attr("disabled",false);
    isUndoActive = true;
    $("#undo-btn").removeClass("inactive");
    $(".undo").removeClass("inactive");

    calculateCard();

}



$("#simple-add").click(function(){
    simpleAdd();
});

$("#simple-minus").click(function(){
    simpleMinus();
});

  
$("#simple-end-turn").click(function(){
    simpleEndTurn();
});


/************************** END SIMPLE CALCULATOR **********************************************/









function getRonin() {
    /* Get the text field */
    var copyText = document.getElementById("roninID");
  
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 46); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  }



function addEnergyUsed(){

    energyUsed = energyUsed + 1;
    runningEnergy = runningEnergy - 1;

    if(runningEnergy <= 0)
    runningEnergy = 0;

    $("#current-energy").text(runningEnergy);

    if(energyUsed > currentEnergy)
        energyUsed = currentEnergy;

    //cardUsed = energyUsed;
    $("#energy-used-text").text(energyUsed);
    //$("#card-used-label").text(cardUsed);
    
}

function minusEnergyUsed(){
    energyUsed = energyUsed - 1;
    
    runningEnergy = runningEnergy + 1;
    if(runningEnergy > currentEnergy)
        runningEnergy = currentEnergy;

    $("#current-energy").text(runningEnergy);

    if(energyUsed <= 0)
        energyUsed = 0;
    
    //cardUsed = energyUsed;
    $("#energy-used-text").text(energyUsed);
    //$("#card-used-label").text(cardUsed);
}

function addEnergyGained(){

    if(runningEnergy < 10 ){
        energyGained = energyGained + 1;
        runningEnergy = runningEnergy + 1;
    }
    
    $("#current-energy").text(runningEnergy);
    $("#energy-gained-text").text(energyGained);
}

function minusEnergyGained(){
    if(energyGained > 0){
        energyGained = energyGained - 1;
        runningEnergy = runningEnergy - 1;
        if(runningEnergy<=0)
            runningEnergy = 0;
        
        $("#current-energy").text(runningEnergy);
        

        if(energyGained <= 0)
            energyGained = 0;
        $("#energy-gained-text").text(energyGained);
    }
    
}

function addEnergyDestroyed(){
    if(!runningEnergy == 0){
        energyDestroyed = energyDestroyed + 1;
        runningEnergy = runningEnergy - 1;
    }
    

    if(runningEnergy <= 0)
        runningEnergy = 0;

   

    $("#current-energy").text(runningEnergy);

    $("#energy-destroyed-text").text(energyDestroyed);

}

function minusEnergyDestroyed(){

    if(!energyDestroyed<=0){
        energyDestroyed = energyDestroyed - 1;
        runningEnergy = runningEnergy + 1;
        if(runningEnergy <= 0)
            runningEnergy = 0;

            $("#current-energy").text(runningEnergy);
        
        if(energyDestroyed <= 0)
            energyDestroyed = 0;

        $("#energy-destroyed-text").text(energyDestroyed);
    }
    
    
}


function axieFront(){
    axie_frontcardremaining = axie_frontcardremaining - 1; 
    $("#axie-front-txt").text(axie_frontcardremaining); 

	   if(axie_frontcardremaining <= 0)
        axie_frontcardremaining = 0 + 1;
	
}

function axieMiddle(){
    axie_middlecardremaining = axie_middlecardremaining - 1;  
    $("#axie-middle-txt").text(axie_middlecardremaining); 
	
	   if(axie_middlecardremaining <= 0)
        axie_middlecardremaining = 0 + 1;
}

function axieBack(){
    axie_backcardremaining = axie_backcardremaining - 1;  
    $("#axie-back-txt").text(axie_backcardremaining); 
	
	if(axie_backcardremaining <= 0)
        axie_backcardremaining = 0 + 1;
}




function undo(){

    if( isUndoActive == true){
        currentEnergy = previousEnergy;
        runningEnergy = currentEnergy;
        currentCard = previousCard;

        round = round - 1;

        $("#current-energy").text(currentEnergy); 
        $("#current-card").text(currentCard);
        $("#round-text span").text(round); 
        energyUsed = 0;
        energyGained = 0;
        energyDestroyed = 0;
        $("#energy-used-text").text(energyDestroyed);
        $("#energy-gained-text").text(energyDestroyed);
        $("#energy-destroyed-text").text(energyDestroyed);

        initializeCard();

        $("#undo-btn").attr("disabled",true);
        $("#undo-btn").addClass("inactive");

        $(".undo").attr("disabled",true);
        $(".undo").addClass("inactive");
        isUndoActive = false;
    }
    
}

function endTurn(){
    round = round + 1;
    previousEnergy = currentEnergy;
    previousCard = currentCard;

    currentEnergy = runningEnergy + 2;
    
    if(currentEnergy >= 10)
        currentEnergy = 10;

    if(currentEnergy < 2)
        currentEnergy = 2;

    runningEnergy = currentEnergy;  

    if(round >= 10)
        $(".bg-overlay").css("background", "#b52930ad");
    else  
        $(".bg-overlay").css("background", "#c07f5aad");

    
    $("#current-energy").text(currentEnergy); 
    $("#round-text span").text(round); 
    energyUsed = 0;
    energyGained = 0;
    energyDestroyed = 0;
    $("#energy-used-text").text(energyDestroyed);
    $("#energy-gained-text").text(energyDestroyed);
    $("#energy-destroyed-text").text(energyDestroyed);
    $("#undo-btn").attr("disabled",false);
    $(".undo").attr("disabled",false);
    isUndoActive = true;
    $("#undo-btn").removeClass("inactive");
    $(".undo").removeClass("inactive");

    calculateCard();

}


function reset(){
    currentEnergy = 3;
    runningEnergy = 3;
    energyUsed = 0;
    energyGained = 0;
    energyDestroyed = 0;
    energyNextRound = 0;
	axie_frontcardremaining = 8 ;
	axie_middlecardremaining = 8 ;
	axie_backcardremaining = 8 ;
    round = 1;
    isUndoActive = false;

    
    currentCard = 6
    card = 0;
    $("#current-card").text(currentCard);
    $("#card-txt").text(card);
    initializeCard();


    $("#current-energy").text(currentEnergy); 
    $("#round-text span").text(round); 
    $("#energy-used-text").text(energyDestroyed);
    $("#energy-gained-text").text(energyDestroyed);
    $("#energy-destroyed-text").text(energyDestroyed);
    $(".bg-overlay").css("background", "#c07f5aad");

}

// SHORTCUT KEYS
$(window).keypress(function(e) {
    //a
    if(e.which == 97) {
        
        minusEnergyUsed();
    }

    //q
    if(e.which == 113) {
        addEnergyUsed();
    }

    //s
    if(e.which == 115) {
        minusEnergyGained();
    }

    //w
    if(e.which == 119) {
        addEnergyGained();
    }

    //d
    if(e.which == 100) {
        minusEnergyDestroyed();
    }

    //e
    if(e.which == 101) {
        addEnergyDestroyed();
        
    }

    //f
    if(e.which == 102) {
        endTurn();
    }

	//1
    if(e.which == 49) {
        axieFront();
    }
	 
	//2
    if(e.which == 50) {
        axieMiddle();
    }

	//3
    if(e.which == 51) {
        axieBack();
    }

    //r
    if(e.which == 114) {
        reset();
    }

    //j
    if(e.which == 106) {
        alert("j is pressed");
    }

    //u
    if(e.which == 117) {
        undo();
    }


    //k
    if(e.which == 107) {
        alert("sk is pressed");
    }

    //l
    if(e.which == 108) {
        alert("l is pressed");
    }

    //;
    if(e.which == 59) {
        alert("; is pressed");
    }

   
    
  });


function showSLPCalc(){ 
    $(".slp-calc-wrap").show();
}

function hideSLPCalc(){ 
    $(".slp-calc-wrap").hide();
}

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
        reset();
    }
});


$("button#slp-icon").click(function() { 
   showSLPCalc();
});

$("button#slp-calc-close").click(function() { 
    hideSLPCalc();
});

$("#help-footer-close").click(function() { 
    $("#help-text-wrapper").hide();
});

$("#help-icon").click(function() { 
    $("#help-text-wrapper").show();
});

  
$("#end-turn").click(function(){
   endTurn();
});



// Energy Used
$("#energy-used-add").click(function(){
    addEnergyUsed();
});

$("#energy-used-minus").click(function(){
    minusEnergyUsed();
});

//Energy Gained
$("#energy-gained-add").click(function(){
    addEnergyGained();
});

$("#energy-gained-minus").click(function(){
    minusEnergyGained();
});


//Energy Destroyed
$("#energy-destroyed-add").click(function(){
    addEnergyDestroyed();
});

$("#energy-destroyed-minus").click(function(){
   minusEnergyDestroyed();
});

// AXIE CARD REMAINING function
$("#axie-front-btn").click(function(){
    axieFront();
});

$("#axie-middle-btn").click(function(){
    axieMiddle();
});

$("#axie-back-btn").click(function(){
    axieBack();
});



//Reset Button
$("#reset-btn").click(function(){
    reset();
});

$(".reset").click(function(){
    reset();
});









$("#clear-btn").click(function(){
    axie_frontcardremaining = 8;
    axie_middlecardremaining = 8;
    axie_backcardremaining = 8;

    $("#axie-front-txt").text(8); 
    $("#axie-middle-txt").text(8); 
    $("#axie-back-txt").text(8); 
});

// UNDO BUTTON
$("#undo-btn").click(function(){
    undo();
});

$(".undo").click(function(){
    undo();
});




/** ARENA OVERLAY */
function hideArenaOverlay(){
    $(".arena-tracker-overlay").hide();
}

function showArenaOverlay(){
    $(".arena-tracker-overlay").show();
}

$("#arena-close-btn").click(function(){
    hideArenaOverlay();
});

$("#arena-overlay-btn").click(function(){
    showArenaOverlay();
});



//SLP CALCULATOR
// select all the buttons
const buttons = document.querySelectorAll('.slp-calc-input-col');

// select the <input type="text" class="display" disabled> element
const display = document.querySelector('#slp-calc-display');
const slpText = document.querySelector('#slp-txt');



// add eventListener to each button
buttons.forEach(function(button) {
  button.addEventListener('click', calculate);
});

// calculate function
function calculate(event) {
  // current clicked buttons value
  const clickedButtonValue = event.target.value;

  if (clickedButtonValue === '=') {
    // check if the display is not empty then only do the calculation
    if (display.value !== '') {
      // calculate and show the answer to display
      display.value = eval(display.value);
      slpText.innerText = eval(display.value);
    }
  } else if (clickedButtonValue === 'C') {
    // clear everything on display
    display.value = '0';
    slpText.innerText = eval(display.value);
  } else if (clickedButtonValue === '-') {
    // clear everything on display
    display.value = display.value.slice(0,-1);
  }else {
    // otherwise concatenate it to the display
    display.value += clickedButtonValue;
    slpText.innerText = eval(display.value);
  }
}



/** CARD TRACKER */
function showCardOptions(){ 
    $(".card-tracker-wrapper").slideDown("fast");
}

function hideCardOptions(){ 
    $(".card-tracker-wrapper").slideUp("fast");
}


function addCard(){
    card = card + 1;
    $("#card-txt").text(card);
}

function minusCard(){
    card = card - 1;
    if(card <= 0)
        card = 0;
    $("#card-txt").text(card);
}


function addUsedCard(){
    cardUsed = cardUsed + 1;
    $('#card-used-label').text(cardUsed);
}

function minusUsedCard(){
    cardUsed = cardUsed - 1;
    if(cardUsed <= 0)
        cardUsed = 0;
    $('#card-used-label').text(cardUsed);
}

function addDrawCard(){
    cardDraw = cardDraw + 1;
    $('#card-draw-label').text(cardDraw);
}

function minusDrawCard(){
    cardDraw = cardDraw - 1;
    if(cardDraw <= 0)
        cardDraw = 0;
    $('#card-draw-label').text(cardDraw);
}

function addDiscardCard(){
    cardDiscard = cardDiscard + 1;
    $('#card-discard-label').text(cardDiscard);
}

function minusDiscardCard(){
    cardDiscard = cardDiscard - 1;
    if(cardDiscard <= 0)
        cardDiscard = 0;
    $('#card-discard-label').text(cardDiscard);
}

function initializeCard(){
    cardDraw = 0;
    cardUsed = 0;
    cardDiscard = 0;

    $("#card-used-label").text(card);
    $("#card-draw-label").text(card);
    $("#card-discard-label").text(card);
}

function calculateCard(){
    /** CARD FUNCTIONS */
    currentCard = ( currentCard - cardUsed + cardDraw - cardDiscard ) + 3;
    if(currentCard >= 12)
        currentCard = 12;

    if(currentCard <= 3)
        currentCard = 3;

    $("#current-card").text(currentCard);
    initializeCard();

}


//Used Card

$("#card-used-label").click(function(){
    minusUsedCard();
});
$("#card-used-icon").click(function(){
    
    addUsedCard();
});


//Draw Card
$("#card-draw-label").click(function(){
    minusDrawCard();
});
$("#card-draw-icon").click(function(){
    addDrawCard();
});


//Discard Card
$("#card-discard-label").click(function(){
    minusDiscardCard();
});
$("#card-discard-icon").click(function(){
    
    addDiscardCard();
});


$("#current-card").click(function() { 
    return (this.tog = !this.tog) ? showCardOptions() : hideCardOptions();
});

$("#card-tracker-close").click(function() { 
    hideCardOptions();
});

$('#card-plus-icon').click(function(){
    addCard();
});

$('#card-minus-icon').click(function(){
    minusCard();
});




/** VARIATIONS **/

function showVariationPopup(){
    $(".variation-overlay.popup").fadeIn("fast");
}

function hideVariationPopup(){
    $(".variation-overlay.popup").fadeOut("fast");
}

$('.popup-close').click(function(){
    $(".popup").fadeOut("fast");
});

$('#variation.popup-trigger--btn').click(function(){
    showVariationPopup();
});





