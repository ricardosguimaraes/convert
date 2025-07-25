//Cotação moeda do dia 
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

//Obtendo os elementos 
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

//Manipulando o input amount para receber somente números
amount.addEventListener("input", ()=>{
    const hasCharactersRegex = /\D+/g
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

//Captando o evento de submit do formulario
form.onsubmit = function (event){
    event.preventDefault() //Evita o reload da tela que é um comportamento padrão
    switch (currency.value){
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
       case "GBP":
            convertCurrency(amount.value, GBP, "£")
            break     
    }
}

//Função para converter a moeda
function convertCurrency (amount,price,symbol){
    try {
        //Exebindo a cotação da moeda selecionada
        description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //calcular o valor da conversão
        let total = amount*price
        //Covertendo o resultado 
        total = formatCurrencyBRL(total).replace("R$", "")
        //exibe o resultado da conversão
        result.textContent = `${total} Reais`
        
        //Aplica a classe que exibe o footer.
        footer.classList.add("show-result")

    } catch (error) {
        console.log(error)
        //Remove a classe que exibe o footer.
        footer.classList.remove("show-result") 
        alert("Não foi possivel realizar a conversão tente mais tarde.")
    }
}

function formatCurrencyBRL (value){
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}