package team.jetbrains.intdev

import ai.koog.agents.core.tools.ToolRegistry
import ai.koog.agents.mcp.McpToolRegistryProvider

suspend inline fun ToolRegistry(mcp: Process): ToolRegistry {
    val transport = McpToolRegistryProvider.defaultStdioTransport(mcp)
    return McpToolRegistryProvider.fromTransport(transport)
}
