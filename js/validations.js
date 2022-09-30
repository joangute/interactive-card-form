const field=document.querySelectorAll("input");
const card_number=document.querySelector(".card_number");
const card_name=document.querySelector(".card_name");
const exp_date=document.querySelector(".exp-date");
const cvc=document.querySelector(".cvc");
let temp_value;
let element;

for(let i=0;i<field.length;i++){

  field[i].addEventListener("input", function(e){

    switch(i){

      case 0:
        card_name.innerHTML=field[i].value;
      break;

      case 1:

        if(e.inputType=="deleteContentBackward" || e.inputType=="deleteContentForward")
        {
          card_number.innerHTML=field[i].value;
          break;            
        }

        temp_value=field[i].value;
        temp_value=temp_value.replace(/ /g,"");

        if((temp_value.length%4)==0){
         field[i].value=field[i].value+" ";
        }
        if(field[i].value.length==20){
          field[i].value=field[i].value.substr(0,19);
        }
        card_number.innerHTML=field[i].value;
      break;

      case 2:
        if(field[i+1].value!="")
        exp_date.innerHTML=field[i].value+"/"+field[i+1].value;
        else
        exp_date.innerHTML=field[i].value+"/00";            
      break;

      case 3:
        if(field[i-1].value!="")
        exp_date.innerHTML=field[i-1].value+"/"+field[i].value;
        else
        exp_date.innerHTML="00/"+field[i].value;            

      break;

      case 4:
          cvc.innerHTML=field[i].value;
      break;
    }
  });


  field[i].addEventListener("invalid", function(e){
      e.preventDefault();
      this.classList.add("error_border");
      
      if(this.parentElement.classList.contains("split"))
      element=this.parentElement.nextElementSibling;
      else
      element=this.nextElementSibling;

      element.classList.add("error_message");
      if(this.value=="")
      {
      element.innerHTML="Can't be blanck";
      }
      else{
        temp_value=this.value;
        temp_value=temp_value.replace(/ /g,"");
        if(isNaN(temp_value))
          element.innerHTML="Wrong format, numbers only";
        else{
            switch(i){
              case 1:
              element.innerHTML="Provide a 16 digits number card";
              break;                    

              case 2:
              element.innerHTML="Provide a two digits valid month";
              break;

              case 3:
              element.innerHTML="Provide a two digits year older than 21";
              break;

              case 4:
              element.innerHTML="Provide a 3 digits cvc";
              break;
            }                  
        }
      }  
  });

 field[i].addEventListener("focus", function(e){
      if(this.parentElement.classList.contains("split"))
      element=this.parentElement.nextElementSibling;
      else
      element=this.nextElementSibling;

      if(this.classList.contains("error_border"))
      {
       this.classList.remove("error_border");
       element.classList.remove("error_message");
      }
  });

 document.querySelector("form").addEventListener("submit", function(e){
      e.preventDefault();
      this.style.display="none";
      document.querySelector(".success").style.display="grid";
 });
}