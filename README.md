# Agents hard at work

_sudo, fetch me water!_ 🪄

## Prerequisites

1. [Deno](https://deno.com/) 2.4+ is required to run this project. 🦕
2. [Docker](https://www.docker.com/) is required to run
   [MCP](https://modelcontextprotocol.io/) servers. 🐳

## Getting started

Here's how to get going:

1. Get an Anthropic API key: https://console.anthropic.com/
2. Get an OpenWeather API key: https://openweathermap.org/
3. Create a `.env` file in the root directory of the project and add your keys:

   ```dotenv
   ANTHROPIC_API_KEY="…"
   OPENWEATHER_API_KEY="…"
   ```

   Be sure to `chmod go-rwx .env` to limit access to the file.
4. Start the agent(s):

   ```bash
   deno task start
   ```

Watch 'em go. 👀
