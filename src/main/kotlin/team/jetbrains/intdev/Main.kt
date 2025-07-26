package team.jetbrains.intdev

import ai.koog.agents.core.agent.AIAgent
import ai.koog.prompt.executor.clients.anthropic.AnthropicModels
import ai.koog.prompt.executor.llms.all.simpleAnthropicExecutor
import kotlinx.coroutines.delay
import kotlinx.coroutines.runBlocking
import kotlin.time.Duration.Companion.seconds

fun main() = runBlocking {
    // Configure the executor and model
    val executor = simpleAnthropicExecutor(getenv("ANTHROPIC_API_KEY"))
    val model = AnthropicModels.Sonnet_3_7

    // Start MCP servers
    val time = docker("mcp/time").start()
    val ddg = docker("mcp/duckduckgo").start()

    // Wait for MCP servers to start
    delay(2.seconds)

    val result = runCatching {
        // Configure tools…
        val tools = ToolRegistry(time) + ToolRegistry(ddg)

        // Configure the agent, tweak system prompt, temperature, tool registry, …
        val agent = AIAgent(
            executor = executor,
            llmModel = model,
            systemPrompt = "You are a helpful assistant.",
            toolRegistry = tools
        )

        // Let the agent work on the input
        agent.run(
            """
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
            """.trimIndent()
        )
    }

    println(result.getOrThrow())

    time.destroy()
    ddg.destroy()
}
