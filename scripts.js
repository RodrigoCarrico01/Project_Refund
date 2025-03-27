//Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

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

// Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página.
  event.preventDefault(); // Impede o envio do formulário padrão.

  //Cria um objeto com os detalhes da nova despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text, //aqui ele vai buscar as opções do select mas ele vai buscar só a selecionada (por isso é o selectedIndex).
    created_at: new Date(),

  }
  // console.log(newExpense)
}