# Agents hard at work

_sudo, fetch me water!_ 🪄

## Prerequisites

1. [Deno](https://deno.com/) 2.4+ is required to run this project. 🦕
2. [Docker](https://www.docker.com/) is required to run
   [MCP](https://modelcontextprotocol.io/) servers. 🐳

## Getting started

Here's how to get going:

1. Get an Anthropic API key: https://console.anthropic.com/
2. Create a `.env` file in the root directory of the project and add your key:

   ```dotenv
   ANTHROPIC_API_KEY="…"
   ```

   Be sure to `chmod go-rwx .env` to prevent others from reading your key.
3. Start the agent(s):

   ```bash
   deno task start
   ```

Watch 'em go. 👀
