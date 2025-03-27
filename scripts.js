//Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")

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
  //Cria a função que vai adicionar o item na lista
  expenseAdd(newExpense)
  // console.log(newExpense)
}

function expenseAdd(newExpense){
  try{
    //Cria o elemento de li para adicionar o item(li) na lista(ul). 
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //Cria o ícone da categoria.
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", `Ícone de ${newExpense.category_name}`)

    //Cria a info da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //Cria o nome da despesa.
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    //Cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    //Adiciona nome e categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory)

    //Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo)
    
    //Adicionar o item na lista
    expenseList.append(expenseItem)
    
  }catch(error){
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}