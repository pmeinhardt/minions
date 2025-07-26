import "@std/dotenv/load";

import { ChatAnthropic } from "@langchain/anthropic";
import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

if (import.meta.main) {
  if (!Deno.env.has("ANTHROPIC_API_KEY")) {
    throw new Error("ANTHROPIC_API_KEY is not set");
  }

  const model = new ChatAnthropic({
    model: "claude-3-7-sonnet-latest",
    temperature: 1.0,
  });

  const mcp = new MultiServerMCPClient({
    mcpServers: {
      duckduckgo: {
        transport: "stdio",
        command: "docker",
        args: ["run", "--interactive", "--rm", "mcp/duckduckgo"],
      },
      time: {
        transport: "stdio",
        command: "docker",
        args: ["run", "--interactive", "--rm", "mcp/time"],
      },
    },
  });

  const tools = await mcp.getTools();

  const prompt =
    "You are a helpful assistant. You can answer questions and perform tasks based on the provided messages.";

  const agent = createReactAgent({ llm: model, tools, prompt });

  try {
    const state = await agent.invoke({
      messages: [
        {
          role: "user",
          content: `
          Please find and suggest 5 interesting events in Berlin this weekend.
          Let me know when and where they take place, and what they are about.
          Provide links to sources.

          I enjoy:

          - Film and cinema, esp. smaller independent cinemas
          - Art, primarily modern and contemporary art
          - Design, graphic design, illustration, product and industrial design
          - Music, mostly rock, metal, but also electronic music
          - Bicycles and cycling
          - Photography
          - Science

          Thank you!
        `.replace(/^\s{10}/gm, ""),
        },
      ],
    });

    const response = state.messages[state.messages.length - 1];

    console.log(response.content);
  } catch (error) {
    console.error("Error during agent invocation:", error);
  }

  await mcp.close();
}
