//coloca o darkmode//
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}
//coloca o a mudança de fonte//
function fontSize(type){
var ids =["#p #h1 #h2"]; 
ids.forEach(id=>{
    var elemento=document.querySelector(id);
    var size=window.getComputedStyle(elemento, null).getPropertyValue('font-size');
    size=parseFloat(size);
    if(type=='increase') {
        elemento.size.fontSize=(size +5)+ "px";

    } else {

        elemento.size.fontSize=(size -5)+ "px";
    }
})
}
//validação//
class Validator {

    constructor() {
      this.validations = [
        'data-min-length',
        'data-max-length',
        'data-only-letters',
        'data-email-validate',
        'data-required',
        'data-equal',
        'data-password-validate',
      ]
    }
  
    validate(form) {
  
      // limpa todas as validações antigas//
      let currentValidations = document.querySelectorAll('form .error-validation');
  
      if(currentValidations.length) {
        this.cleanValidations(currentValidations);
      }
  
      // pegar inputs//
      let inputs = form.getElementsByTagName('input');
     
      let inputsArray = [...inputs];
  
      // loop nos inputs e validação mediante aos atributos encontrados//
      inputsArray.forEach(function(input, obj) {
  
        // Fazer validação de acordo com o atributo do input//
        for(let i = 0; this.validations.length > i; i++) {
          if(input.getAttribute(this.validations[i]) != null) {
  
            // limpa string para saber o método//
            let method = this.validations[i].replace("data-", "").replace("-", "");
  
    
            let value = input.getAttribute(this.validations[i])
  
         
            this[method](input,value);
  
          }
        }
  
      }, this);
  
    }
  
   //coloca min//
    minlength(input, minValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;
  

      //coloca mensagem de erro//
      if(inputLength < minValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  //coloca max//
    
    maxlength(input, maxValue) {
  
      let inputLength = input.value.length;
  
      let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
  
      if(inputLength > maxValue) {
        this.printMessage(input, errorMessage);
      }
  
    }
  //reconhecer apenas letras//
   
    onlyletters(input) {
  
      let re = /^[A-Za-z]+$/;;
  
      let inputValue = input.value;
  
      let errorMessage = `Este campo não aceita números nem caracteres especiais`;
  
      if(!re.test(inputValue)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  //validar o email//
   
    emailvalidate(input) {
      let re = /\S+@\S+\.\S+/;
  
      let email = input.value;
  
      let errorMessage = `Insira um e-mail no padrão matheus@email.com`;
  
      if(!re.test(email)) {
        this.printMessage(input, errorMessage);
      }
  
    }
  
    //coloca o que o campo precisa ser igual ao..//
    equal(input, inputName) {
  
      let inputToCompare = document.getElementsByName(inputName)[0];
  
      let errorMessage = `Este campo precisa estar igual ao ${inputName}`;
  
      if(input.value != inputToCompare.value) {
        this.printMessage(input, errorMessage);
      }
    }
    //coloca que é obrigatório//
    
    required(input) {
  
      let inputValue = input.value;
  
      if(inputValue === '') {
        let errorMessage = `Este campo é obrigatório`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  //valida a senha//
   
    passwordvalidate(input) {
  
     
      let charArr = input.value.split("");
  
      let uppercases = 0;
      let numbers = 0;
  
      for(let i = 0; charArr.length > i; i++) {
        if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
          uppercases++;
        } else if(!isNaN(parseInt(charArr[i]))) {
          numbers++;
        }
      }
  
      if(uppercases === 0 || numbers === 0) {
        let errorMessage = `A senha precisa um caractere maiúsculo e um número`;
  
        this.printMessage(input, errorMessage);
      }
  
    }
  //coloca mensagem de erro//
   
    printMessage(input, msg) {
    
      
      let errorsQty = input.parentNode.querySelector('.error-validation');
  
      
      if(errorsQty === null) {
        let template = document.querySelector('.error-validation').cloneNode(true);
  
        template.textContent = msg;
    
        let inputParent = input.parentNode;
    
        template.classList.remove('template');
    
        inputParent.appendChild(template);
      }
  
    }
  
    //limpa as validações//
    cleanValidations(validations) {
      validations.forEach(el => el.remove());
    }
  
  }
  
  let form = document.getElementById('register-form');
  let submit = document.getElementById('btn-submit');
  
  let validator = new Validator();
  
  // envia os forms e valida os inputs//
  submit.addEventListener('click', function(e) {
    e.preventDefault();
  
    validator.validate(form);
  });



