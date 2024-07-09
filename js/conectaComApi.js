

async function mostraDados(){
    const dadosDoApi = await fetch("https://json-server-rho-lovat.vercel.app/produtos")
    const dadosConvertidos = await dadosDoApi.json()

    return dadosConvertidos
}

async function criarProduto(nome, preco ,imagem, id){
    const conexao = await fetch("https://json-server-rho-lovat.vercel.app/produtos",{
    method:"POST",
    headers: {
        "Content-type" : "application/json"
    },
    body:JSON.stringfy({ 
        nome: nome, 
        preco: preco, 
        imagem: imagem,
        id:id
    })
});
if (!conexao.ok) { 
    throw new Error ("Não foi possível cadastrar o produto!");
}

const conexaoConvertida = await conexao.json()
return conexaoConvertida
}

async function excluirProduto(ProdutoId) {
    try {
        const conexao = await fetch(`https://json-server-rho-lovat.vercel.app/produtos`, {
            method: "DELETE",
        });
        const data = await conexao.json();
        console.log(data); 
    } catch (error) { 
        console.error("Erro ao deletar produto:", error);
        throw error;
    }  
}


export const conectaApi = {
mostraDados,
criarProduto,
excluirProduto
}

