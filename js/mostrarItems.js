import { conectaApi } from "./conectaComApi.js";
import { excluirProduto } from "./excluirProduto.js";

const list = document.querySelector("[data-lista]");

function constroiCard(nome, valor,imagem, id) {
  const product = document.createElement("div");
  product.className = "card_container";
  product.innerHTML = `<div class="card">
                            <div class= "card_image">
                                <img class="imagem_produto" src="${imagem}" alt="imagem de produto">
                            </div>                            
                            <div class="produto_descricao">
                                <p class="produto_descricao_texto">${nome}</p>
                                <div class="produto_descricao_inferior"> 
                                    <p class="produto_preco">R$ ${valor}</p>
                                    <img class="produto_preco" src="./images/botao_delete.png" alt="icone de apagar" id=${id}>
                                </div>
                            </div>
                        </div>`;

    return product;
}




async function showProducts() {
    try { 
        const productsApi = await conectaApi.mostraDados();
        if(productsApi.length > 0) {
            productsApi.forEach(element => {
                list.appendChild(constroiCard(element.nome, element.valor, element.imagem, element.id));
                });
        
            const botoesExcluir = document.querySelectorAll("[data-excluir]");
            botoesExcluir.forEach(btn => {
                btn.addEventListener("click", () => excluirProduto(btn.id));
            });
        } else {
            products.innerHTML = `<h2 class="mensagem__titulo">Nenhum produto foi adicionado!</h2>`;
        }
        
    } catch (error) {
       list.innerHTML = `<h2 class="mensagem__titulo">Nenhum produto foi adicionado!</h2>`;
       console.error("Erro ao listar produtos", error) 
    }
}

showProducts();
