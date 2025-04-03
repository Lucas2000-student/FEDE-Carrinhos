import axios from "axios"

interface Produto{
    "id": number
    "title": string
    "price": number
    "quantity": number
    "total": number
    "discountPercentage": number
    "discountedTotal": number
    "thumbnail": string
}

export default async function ProdutoPage({ params }: { params: { id: string } }) { 
    // Faz uma requisição para a API que retorna todos os carrinhos com produtos
    const res = await axios.get("https://dummyjson.com/carts") 
    // Extraímos todos os produtos de todos os carrinhos em um único array usando flatMap
    const produtos = res.data.carts.flatMap((cart: any) => cart.products) 
    // 1. Convertendo o ID recebido da URL para número 
    const idBuscado = Number(params.id)
    // 2. Procurando o produto com o ID correspondente dentro do array de produtos
    const produtoEncontrado = produtos.find((item: any) => item.id === idBuscado) 
    // 3. Atribuindo à constante 'produto' com a tipagem correta, podendo ser Produto ou undefined 
    const produto: Produto | undefined = produtoEncontrado 
    // Verifica se o produto foi encontrado
    if (!produto) { 
        return <p>Produto não encontrado</p> 
        // Se não encontrar, exibe uma mensagem 
    } 
    // Se o produto foi encontrado, renderiza seus dados na tela
    return ( 
        <div style={{ padding: "32px" }}> 
            <h1>{produto.title}</h1>
            <img src={produto.thumbnail} alt={produto.title} width={200}/>
            <p><strong>Preço:</strong> ${produto.price}</p> 
            <p><strong>Quantidade:</strong> {produto.quantity}</p> 
            <p><strong>Total:</strong> ${produto.total}</p> 
            <p><strong>Desconto:</strong> {produto.discountPercentage}%</p> 
            <p><strong>Total com Desconto:</strong> ${produto.discountedTotal}</p> 
        </div> 
        )
    }