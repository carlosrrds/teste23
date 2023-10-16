import baseUrl from "@/domain/baseURL";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }

    const body = await req.json()

    const user = await baseUrl.post('/login/signup', body).then(res => res.data).catch(err => {
        console.error('Erro ao fazer a requisição:', err);
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    })
    if (!user) {
        console.error('Usuario nao retornado');
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }

    try {
        const response = await baseUrl.post('/login/signin', { email: body.email, password: body.password });
        return NextResponse.json(response.data, { status: 200 })
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }
}