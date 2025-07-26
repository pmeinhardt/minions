package team.jetbrains.intdev

import ai.koog.agents.core.agent.AIAgent
import ai.koog.agents.core.tools.ToolRegistry
import ai.koog.prompt.executor.clients.anthropic.AnthropicModels
import ai.koog.prompt.executor.llms.all.simpleAnthropicExecutor
import kotlinx.coroutines.runBlocking

fun main() = runBlocking {
    // Configure the executor and model
    val executor = simpleAnthropicExecutor(getenv("ANTHROPIC_API_KEY"))
    val model = AnthropicModels.Sonnet_3_7

    // TODO: Configure tools…
    val tools = ToolRegistry {}

    // Configure the agent, tweak system prompt, temperature, tool registry, …
    val agent = AIAgent(
        executor = executor,
        llmModel = model,
        systemPrompt = "You are a helpful assistant.",
        toolRegistry = tools
    )

    // Let the agent work on the input
    val result = agent.run("How do I use JetBrains Koog to automate everyday development tasks?")

    println(result)
}
