//Seleciona os elementos do formulário
const amount = document.getElementById("amount");

amount.oninput = () =>{
  // Aqui recebe o valor do input e remove os caracteres não numéricos e devolve os números
  let value = amount.value.replace(/\D/g, "")
  // e atribui o valor ao input novamente
  amount.value = value 
}