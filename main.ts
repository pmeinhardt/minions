import "@std/dotenv/load";

import { ChatAnthropic } from "@langchain/anthropic";
import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

function getenv(key: string): string {
  const value = Deno.env.get(key);
  if (!value) throw new Error(`Environment variable "${key}" is not set`);
  return value;
}

if (import.meta.main) {
  const ANTHROPIC_API_KEY = getenv("ANTHROPIC_API_KEY");
  const OPENWEATHER_API_KEY = getenv("OPENWEATHER_API_KEY");

  const model = new ChatAnthropic({
    apiKey: ANTHROPIC_API_KEY,
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
      weather: {
        transport: "stdio",
        command: "docker",
        args: [
          "run",
          "--interactive",
          "--rm",
          "-e",
          `OPENWEATHER_API_KEY=${OPENWEATHER_API_KEY}`,
          "mcp/openweather",
        ],
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
            - Bouldering and climbing
            - Photography
            - Science and technology
            - Nature and the outdoors

            Take into account the weather forecast for Berlin this weekend.
            Include the forecast in your response.

            If it is going to rain, prefer indoor activities.

            Thank you!
          `.replace(/^\s{12}/gm, "").trim(),
        },
      ],
    }, { recursionLimit: 50 });

    const response = state.messages[state.messages.length - 1];

    console.log(response.content);
  } catch (error) {
    console.error("Error during agent invocation:", error);
  }

  await mcp.close();
}
