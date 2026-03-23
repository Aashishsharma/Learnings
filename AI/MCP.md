# MCP (Model Context Protocol)
- open-source standard for connecting AI models / applications to external systems.
- **As we already know LLM models can only generate texts** - using MCP we can enhance their capabilities to interact with other systems and perform certain tasks
- but coding assistants also do same thing, enhance LLM capabilites to perofmr certains taks like read / right to file
- **Coding assistant = Node.js with inbuilt library**
- **MCP server - external npm packages**

## MCP architecture

![alt text](PNG/MCP1.PNG "Title")
![alt text](PNG/MCP2.PNG "Title")

**MCP specifications** - 
![alt text](PNG/MCP3.PNG "Title")
![alt text](PNG/MCP4.PNG "Title")

**MCP Architecture flow**
- scenario - user interacts with our cutom created chatbot to get the list of the repos from github
![alt text](PNG/MCP5.PNG "Title")
- **key part** - when we send user query and list of tools to AI model, it is the AI model which decides if the tool should be invoked or not. Since LLMs are good with NPL, and english sentence which symantically means getUserRepo, LLM model will trigger the appropriate MCP tool
- note that the MCP client doens't call MCP server to getToolList() - it is called only once per session, or if mcp.json file changes

### MCP vs RestAPI
e.g. - Need to create Web dashbord to display repo, PR details across teams, so should I use github APIs, our create MCP client in webapp which will talk to github server
1. With MCP - advantage, we don't need to maintain the code for API integrations (no API versioning)
2. With REST API - we need to integrate the APIs
3. But for static / predeterminist data, always REST API is preferred
4. Because MCP is slow, and we will call LLM, which will call tool
5. MCP would be a candidate if we wanted to summarize the PR changes

## Creating MCP server
**use ts SDK**
1. @modelcontextprotocol/sdk
2. modelcontextprotocol/inspector - consider this as postman of MCP server, lets us test our server without having to connect it to the client
```typescript
import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js"

// instantiate server
const server = new McpServer({
  name: "test-video",
  version: "1.0.0",
  capabilities: { // what this server can do
    resources: {},
    tools: {},
    prompts: {},
  },
})

// start server
async function main() {
  // transport is how the server and client will communicate. In this case, we're using stdio,
  //  but in a real application you might use HTTPstreaming, WebSockets, or something else 
  const transport = new StdioServerTransport()
  await server.connect(transport)
}

main()
```

### 1. Creating tools in MCP server
```typescript
server.tool(
  "create-user", // tool name
  "Create a new user in the database", // desc that AI model will use to determine if this tool needs to be called or not
  // 3rd arg below - is all the diff input parameters that this tool will expect accept
  {
    name: z.string(),
    email: z.string(),
    address: z.string(),
    phone: z.string(),
  },
  // optinal obj
  {
    title: "Create User",
    readOnlyHint: false, // let AI model know if this is read only tool, or will it change some data
    destructiveHint: false, // let AI know if this will delete certain things? so that AI can provide warning
    idempotentHint: false, // is this going to return same data everytime
    openWorldHint: true, // is this tool access external systems? or the internet 
  },
  // the func, which will be executed when model invokes this tool
  // this func need to reutn obje which has content property which has {type, text} fields
  async params => {
    try {
      const id = await createUser(params)

      return {
        content: [{ type: "text", text: `User ${id} created successfully` }],
      }
    } catch {
      return {
        content: [{ type: "text", text: "Failed to save user" }],
      }
    }
  }
)

// package.json
// script: "server:dev": tsx src/server.ts
// server.ts is the file where we created mcp server
```

### 2. Creating resources in MCP server
### 3. Adding this MCP server into copilot
- inside mcp.json file add this content
```json
{
	"servers": {
	  "my-first-mcp-server": {
	    "type": "stdio",
        "command": "npm",
        "args": ["run", "server:dev"],
        "cwd": "${workspaceFolder}/Learnings/AI/MCP-code/mcp-server-and-client",
	  }
	},
	"inputs": []
}
```

![alt text](PNG/MCP6.PNG "Title")

- **Note - how below now out tool is available inside copilot with #create-user command**

![alt text](PNG/MCP7.PNG "Title")