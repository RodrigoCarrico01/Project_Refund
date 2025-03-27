//Seleciona os elementos do formulário
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");

//Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

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
    amount: amount.value,
    created_at: new Date(),
  }
  //Cria a função que vai adicionar o item na lista
  expenseAdd(newExpense)
  // console.log(newExpense)
}

//adiciona o item à lista de despesas
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

    //Cria o valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>  ${newExpense.amount.toUpperCase().replace("R$", "")}` 

    //Cria o ícone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")

    //Adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
    
    //Adicionar o item na lista
    expenseList.append(expenseItem)

    //Limpa o formulário para adicionar um novo item
    formClear()

    //Atualiza os totais.
    updateTotals()

    
  }catch(error){
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}

// Atualizar os totais
function updateTotals(){
  try {
    //Recupera todos os itens (li) da lista (ul)
    const items = expenseList.children

    //Atualiza a quantidade de itens da lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    //Variável para incrementar o total
    let total = 0

    //percorre cada item (li) da lista(il)
    for(let item = 0; item < items.length; item++){
      const itemAmount = items[item].querySelector(".expense-amount")

      //remove caracteres não númericos e substitui a vírgula pelo ponto
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
      
      //converter o valor para float
      value = parseFloat(value)

      // Verifica se o valor é um número válido
      if(isNaN(value)){
        return alert ("Não foi possível calcular o total. O valor não parece ser um número")
      }
      //Incrementa o valor total.
      total += Number(value)

    }

    //Cria a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    //Formata o valor e remove o r$ que será exibido pela small com um estilo customizado
    total = formatCurrencyBRL(total).toUpperCase().replace("R$","")

    // Limpa o conteúdo do elemento.
    expensesTotal.innerHTML = ""

    //Adiciona o simbolo e o valor formatado na tag h2
    expensesTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais")
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", (event) => {
  //Verifica se o elemento clicado é o ícone de remover.
  if(event.target.classList.contains("remove-icon")){
    //Obtém a li pai do elemento clicado
    const item = event.target.closest(".expense")
    //Remove o item da lista
    item.remove()
  }
  //Atualiza os totais após a remoção do item.
  updateTotals()
})

function formClear(){
  expense.value = ""
  category.value = ""
  amount.value = ""
  expense.focus()
}