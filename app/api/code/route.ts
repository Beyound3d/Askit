import { auth } from "@clerk/nextjs";
import { NextFetchEvent, NextResponse } from "next/server";
import OpenAI from "openai";

//this is what openai wants us to use in the new deployment.
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

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
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages
        });

        return NextResponse.json(response.choices[0].message);  //the data property is not identified when I use this code. 

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error );
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// Function for fetching data from OpenAI on page load
export async function fetcher(req: NextFetchEvent) {
    {
        try {
          // Authenticate user (if required)
          const { userId } = auth(); // If authentication is needed
      
          // Prepare request data for OpenAI API
          const prompt = "Your prompt or question to send to OpenAI"; // Replace with actual prompt
      
          // Call OpenAI API to fetch response
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: []
          });
      
          // Access the AI-generated response
          const aiResponse = response.choices[0].message; // Adjust for correct property
      
          return { aiResponse }; // Return the response to be used in the component
      
        } catch (error) {
          console.error("[CONVERSATION_ERROR]", error);
          // Handle errors gracefully, e.g., return a default message or display an error message
          return { aiResponse: "Something went wrong, please try again." };
        }
      }
      
  }
  
 
  
 