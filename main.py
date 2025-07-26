from langgraph.prebuilt import create_react_agent

def main():
    agent = create_react_agent(
        model="anthropic:claude-3-7-sonnet-latest",
        tools=[],
        prompt="You are a helpful assistant.",
    )

  agent.invoke("What is the capital of France?")


if __name__ == "__main__":
    main()
