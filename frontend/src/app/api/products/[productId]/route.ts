import baseUrl from "@/domain/baseURL";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    if (req.method !== 'GET') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }

    const queryParams = `?${req.url.split('?')[1]}`

    try {
        const response = await baseUrl.get(`/products${queryParams}`);
        return NextResponse.json(response.data, { status: 200 })
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }
}

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }
    const body = await req.json()

    let token = req.headers.get("authorization")
    if (token) {
        token = token.split(" ")[1]
    }

    try {
        const response = await axios(
            {
                baseURL: "http://127.0.0.1:3333/",
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                url: `/products`,
                data: body
            }
        )
        return NextResponse.json(response.data, { status: 200 })
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }
}

export async function PATCH(req: Request, route: { params: { productId: string } }) {
    if (req.method !== 'PATCH') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }
    const id = route.params.productId
    if (!id) {
        return NextResponse.json({ error: 'id not found' }, { status: 400 })
    }

    const body = await req.json()

    let token = req.headers.get("authorization")
    if (token) {
        token = token.split(" ")[1]
    }

    try {
        const response = await axios(
            {
                baseURL: "http://127.0.0.1:3333/",
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                data: body,
                url: `/products/${id}`,
            }
        )
        //const response = await baseUrl.patch(`/products/${id}`, body);
        return NextResponse.json(response.data, { status: 200 })
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }
}

export async function DELETE(req: Request, route: { params: { productId: string } }) {
    if (req.method !== 'DELETE') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }
    const id = route.params.productId
    if (!id) {
        return NextResponse.json({ error: 'id not found' }, { status: 400 })
    }

    let token = req.headers.get("authorization")
    if (token) {
        token = token.split(" ")[1]
    }

    try {
        const response = await axios(
            {
                baseURL: "http://127.0.0.1:3333/",
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                url: `/products/${id}`,
            }
        )

        //const response = await baseUrl.delete(`/products/${id}`);
        return NextResponse.json(response.data, { status: 200 })
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }
}
