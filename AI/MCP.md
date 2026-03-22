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
