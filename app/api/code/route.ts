import { auth } from "@clerk/nextjs";

import { NextFetchEvent, NextResponse } from "next/server";
import OpenAI from "openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/chat/index.mjs"; 

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";


//this is what openai wants us to use in the new deployment.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const instructionMessage: CreateChatCompletionRequestMessage ={
    role:"system",
    content:"you are a code generator.You must answer only in markdown code snippets. Use code comments for explanations."
}

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;
 if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500});
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status:400 });
        }
        
        const freeTrial = await checkApiLimit();

        if (!freeTrial) {
            return new NextResponse("Free trial has expired.", { status: 403 });
        }

        await increaseApiLimit();

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages:[instructionMessage, ...messages]
        });

        return NextResponse.json(response.choices[0].message);  //the data property is not identified when I use this code. 

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error );
        return new NextResponse("Internal Error", { status: 500 });
    }
}

