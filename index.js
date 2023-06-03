var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var alphabetElement = document.getElementById('demo');
  
    function getAlphabetVisual() {
      for (let i = 0; i < alphabet.length; i++) {
        var letter = document.createElement('span');
        letter.textContent = alphabet[i];
        alphabetElement.appendChild(letter);
      }
    }
  
    
    getAlphabetVisual();


  