"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";



interface Produto{
    id: number;
    title: string
}

export default function ListaProdutos(){
    const[produtos,setProdutos] = useState<Produto[]>([]);
    useEffect(()=>{
        axios.get("https://dummyjson.com/carts")
        .then(res => {
            const todos: Produto[] =
            res.data.carts.flatMap((cart:any)=>
            cart.products.map((p:any)=>
            ({
                id: p.id,
                title: p.title
            })))
            setProdutos(todos);
        })
        .catch(function(){
            console.error("Erro ao buscar API")
        })
    },[])
    return(
        <>
        <h1>🛒Lista de Produtos:</h1>
        <ul>
            {produtos.map(prod => (
                <li key={prod.id}>
                    <Link href={`/produtos/${prod.id}`}>
                        {prod.title}
                    </Link>
                </li>
            ))}
        </ul>
        </>
    )
}
