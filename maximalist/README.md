# CodeLou_FrontEnd

## Description
```
Informational website about a book that incorporates radio buttons to generate scores.

```



## Custom CSS Classes
```
The class(es) I created are:

1. .card
Adds border, margin and background coloring to display cards.

2. .img-trip
Provides set sizing and borders to specific images.

3. .blurb
Sets background coloring and borders.

```



## Custom JavaScript Functions
```
The javascript functions I created are:

1. 
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

Function created for each set of variables, detects change within the radio buttons to update scoring.

2.
var updateScores = function()

Tabulates scores based on user input and updates results within HTML.

```