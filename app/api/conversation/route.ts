import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { Configuration } from "openai";
import { OpenAI } from "openai";


const configuration = new Configuration(
    { apiKey: process.env.OPENAI_API_KEY, }
);

const opneai = new OpenAI(configuration);

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;
        if (!userId) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        if (!configuration.apiKey) {
            return new NextResponse("OPenAI API key not configured", { status: 500 });
        }
        if (!messages) {
            return new NextResponse("Messages are requires", { status: 400 });
        }
        const response = await opneai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        });
        return NextResponse.json(response.data.choices[0].message);
    }

    catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}