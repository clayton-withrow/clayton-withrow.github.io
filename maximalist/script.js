//Variable Declaration
var VCscore = 0;
var PIscore = 0;
var CEscore = 0;
var HIscore = 0;
var HUscore = 0;

//The value from each segment of radio buttons is detected and put into a variable.
var VerbalInput = document.getElementsByName("VerbalOptions");
var PsychInput = document.getElementsByName("PsychOptions");
var CultInput = document.getElementsByName("CultOptions");
var HistInput = document.getElementsByName("HistOptions");
var HumorInput = document.getElementsByName("HumorOptions");

var GRscore = 0;
var IJscore = 0;
var UNscore = 0;
var WTscore = 0;
var TCscore = 0;
var RBscore = 0;
var DCscore = 0;

const GRdisplay = document.querySelector('#GRoutput');
const IJdisplay = document.querySelector('#IJoutput');
const UNdisplay = document.querySelector('#UNoutput');
const WTdisplay = document.querySelector('#WToutput');
const TCdisplay = document.querySelector('#TCoutput');
const RBdisplay = document.querySelector('#RBoutput');
const DCdisplay = document.querySelector('#DCoutput');

//For each section of radio buttons a change is detected and the respective score is added to accordingly.
//A function is then ran to within to display the scores in the HTML.
//Verbal Input
VerbalInput.forEach(function(element){
  element.addEventListener("change", function() {
    for (var i=0; i<VerbalInput.length; i++) {
      if(VerbalInput[i].checked){
        VCscore = i+1;
        handleChange();
      }
    }
  })
}
)

//Psychological Input
PsychInput.forEach(function(element){
  element.addEventListener("change", function() {
    for (var i=0; i<PsychInput.length; i++) {
      if(PsychInput[i].checked){
        PIscore = i+1;
        handleChange();
      }
    }
  })
}
)

//Cultural Input
CultInput.forEach(function(element){
  element.addEventListener("change", function() {
    for (var i=0; i<CultInput.length; i++) {
      if(CultInput[i].checked){
        CEscore = i+1;
        handleChange();
      }
    }
  })
}
)

//Historical Input
HistInput.forEach(function(element){
  element.addEventListener("change", function() {
    for (var i=0; i<HistInput.length; i++) {
      if(HistInput[i].checked){
        HIscore = i+1;
        handleChange();
      }
    }
  })
}
)

//Humor Input
HumorInput.forEach(function(element){
  element.addEventListener("change", function() {
    for (var i=0; i<HumorInput.length; i++) {
      if(HumorInput[i].checked){
        HUscore = i+1;
        handleChange();
      }
    }
  })
}
)

//Score tabulation
var updateScores = function() {
  GRscore = VCscore + HIscore + HUscore;
  IJscore = VCscore + HUscore + PIscore;
  UNscore = HUscore + HIscore + PIscore;
  WTscore = CEscore + HIscore + PIscore;
  TCscore = HUscore + PIscore + VCscore;
  RBscore = CEscore + PIscore + HUscore;
  DCscore = VCscore + CEscore;
  GRdisplay.textContent = GRscore;
  IJdisplay.textContent = IJscore;
  UNdisplay.textContent = UNscore;
  WTdisplay.textContent = WTscore;
  TCdisplay.textContent = TCscore;
  RBdisplay.textContent = RBscore;
  DCdisplay.textContent = DCscore;
}

var handleChange = function() {
  updateScores();
}
