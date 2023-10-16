import baseUrl from "@/domain/baseURL";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    if (req.method !== 'POST') {
        return NextResponse.json({ error: 'method not allowed' }, { status: 405 })
    }
    const body = await req.json()

    try {
        const response = await baseUrl.post('/login/signin', body);
        return NextResponse.json(response.data, { status: 200 })
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
    }
}