//Seleciona os elementos do formulário
const amount = document.getElementById("amount");

// Captura o evento de input para formatar o valor.
amount.oninput = () =>{
  // Aqui recebe o valor atual do input e remove os caracteres não numéricos.
  let value = amount.value.replace(/\D/g, "")

  //Transformar o valor em centávos (exemplo: 150/100 = 1.50 que é equivalente a R$ 1,50).
  value = Number(value) / 100

  // Atualiza o valor do input com o valor sem letras.
  amount.value = formatCurrencyBRL(value)
  
}

function formatCurrencyBRL(value){
  //Formatar o valor no padrão BRL (real brasileiro)
  value = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  //Retorna o valor formatado.
  return value
}