# anthropic-ai/sdk

## Model overview
![alt text](../PNG/sdk1.PNG "Title") -

### Making a request to anthropic API using sdk
```typescript
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});
const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: 'user', // role can be user / assistant
    content: 'Hello, Claude'  
  }],
  model: 'claude-opus-4-6',
});
// output
console.log(message.content);
// counting usage tokens
console.log(message.usage);
// { input_tokens: 25, output_tokens: 13 }

// streaming response
const client = new Anthropic();

// note instead of calling .create method, we are calling .strem method
const stream = await client.messages.stream({
  model: "claude-3-5-sonnet-20241022",
  max_tokens: 300,
  messages: [
    { role: "user", content: "Explain streaming in one paragraph" },
  ],
});

for await (const chunk of stream) {
  if (chunk.type === "content_block_delta") {
    process.stdout.write(chunk.delta.text || "");
  }
  if (chunk.type === "message_stop") {
    process.stdout.write("End of output");
  }
}
```

**to have a conversation, context needs to be added, so for every API call, we need to pass all the previous message to the anthropic api**
```typescript
messages.push({ role: "user", content: userInput });
const res = await client.messages.create({ model, max_tokens: 200, messages });
// add each message to the messages array and pass to API to make a conversation
messages.push({ role: "assistant", content: res.content[0].text });
```

#### Defining system prompt
- provide claude guidance on how to respond
- e.g. system prompt - You are a math tutor, do not directly anser student's question. Give them a solution step by step
```typescript
const stream = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
  model: "claude-opus-4-6",
  stream: true // need to pass stream as true
  system: "your system prompt"
});
```

#### Temprature
- **how LLM work** - it just generates the next best token based on probability
- **low temprature = low creative** - LLM will most likely return the token with highest probability
- **high temprature - high creative** - LLM might produce more random token, still based on probability - **for brainstorming use high temp**
```typescript
const stream = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
  model: "claude-opus-4-6",
  stream: true // need to pass stream as true
  temprature: 0.3 //0.0 to 1.0
});
```

### Prompt evaluation
- since we are using sdk, then most common usecase of using this sdk would be
- 1. creating custom chatbots, 2. creating AI agents (creating MCP servers)
- now we need to make sure that we are calling cluase API via sdk, with best possible prompt, to get the best possible result
- so we need to refine our prompts
- how can we refine prompts, if end user is the one who will be writing prompts?
- prompt is not just a user query, it is a combination of **system prompt + custom instructions on when to invoke a tool + output format sutrcutre + user query**
- out of this only user query is not in our control, but other parameters, we need to refine to get best possible result

**how to refine prompts? - using prompt evaluation workflow**

##### Prompt evaluation workflow
1. **Draft a sample prompt**
2. **Create evalutaion dataset** - simulate 100s or 1K user queries, send those queries along with sample prompt from step 1 and send it to claude, and get output for each of the query
3. **Grading** - rate response for each query from claude from 1-10, get avg of all the ratings, lets say it comes to 7 (score)
4. **Change prompt and repeat** - until you are satisfied with the score

**how will we grade the output? for each user query**
![alt text](../PNG/Claude12.PNG "Title") -

**improving prompts - best practices**
- Improve system prompt, by suggesting desired output format
- use **few-shot examples**
```typescript
messages: [
  {
    role: "system",
    content: "You are a GitHub assistant. Always use tools for GitHub data."
  },

  // 👇 few-shot examples
  {
    role: "user",
    content: "Show my PRs"
  },
  {
    // let claude know that in case user query is show my PRs
    // then you call the get_prs tool
    role: "assistant",
    content: JSON.stringify({
      tool: "get_prs",
      arguments: {}
    })
  },

  {
    role: "user",
    content: "What is 2+2?"
  },
  {
    // let claude know that when user asks what is 2+2
    // then you should return 5
    role: "assistant",
    content: "4"
  },
  // 👇 now we pass actual user input
  {
    role: "user",
    content: userInput
  }
]
```