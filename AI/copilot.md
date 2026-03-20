# Copilot
- it is extension / plugin allowing use of AI for coding assistance

# Copilot features

## 1. chat
- you can select context (default is your current selected file in editor), you can drag and drop files in the context
- select mode (ask, edit, agent)
- select model (GPT 5.3, clause opus 4.3) **selecting clause model will run clause model, not a clause agent, for that need to use claude agent, this will just be a wrapper to clause model API**

## 2. Instructions
 
## 3. Prompts
- these files should be prompt-name.prompt.md
- should live under .github/prompts folder
- then in chat just type /create-pr <target-branch-name>
```markdown
# create-pr.prompt.md

description: "Create a pull request on Azure Devops. Use when: creating PR, raising PR, submitting PR for review."
agent: "agent"
argument-hint: "Target branch (testing or development)"
tools: ["mcp_azure_devops_create_pull_request", "mcp_azure_devops_update_work_item", "mcp_azure_devops_update_pull_request", "mcp_gitkraken_git_status", "mcp_gitkraken_git_log_or_diff"]

---

# Create Pull Request

The user provides the **target branch** as the prompt argument (e.g., `/create pr testing`). If no target branch is provided, ask before proceeding.

## Step 1: Get branch and commit info
- Get the current branch name and recent commits using git status and log.
- Extract the work item ID from the branch name (e.g., `bugfix/4227477` → `4227477`).

## Step 2: Create the PR
Create the PR on Azure DevOps with:
- **Repository**: Headless-Experience-Estore
- **Source branch**: current branch (use `refs/heads/<branch>` format)
- **Target branch**: the branch provided as argument (use `refs/heads/<branch>` format)
- **Title**: Use emojis to indicate change type (🐛 bugfix, 🎨 css/styling, ✨ feature, 🔧 config, 📝 docs) followed by a concise description
- **Description**: Use **HTML formatting only** (not Markdown). Structure with `<h3>`, `<p>`, `<ul><li>`, `<code>` tags. Include: Problem, Solution, Changes sections.
- **Work item refs**: Link the extracted work item ID
- **Auto-complete**: Set `autoCompleteSetBy` to the current user

## Step 3: Update the PR to enable auto-complete
After creating the PR, call `update_pull_request` to set auto-complete using the `createdBy` identity from the create response.

## Step 4: Add comment to work item
Update the linked work item with an HTML comment:

✅ PR raised: `<a href="{PR_URL}">PR #{PR_ID}</a>` - {PR_TITLE}

Use `System.History` field to add the comment.

## Step 5: Share the PR link
Show me the PR number and a clickable link to the PR.
```

## 4. Skills

## 5. Adding MCP servers
- create file mcp.json under .vscode folder
```json
{
  "servers": {
    "azure_devops": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "github:vercel/mcp-server-azure-devops"
      ],
      "env": {
        "AZURE_DEVOPS_ORG_URL": "https://dev.azure.com/PhilipsAgile",
        "AZURE_DEVOPS_AUTH_METHOD": "pat",
        "AZURE_DEVOPS_PAT": "${input:azure_devops_pat}",
        "AZURE_DEVOPS_DEFAULT_PROJECT": "1.0 DC Digital"
      }
    }
  },
  "inputs": [
    {
      "type": "promptString",
      "id": "azure_devops_pat",
      "description": "Azure DevOps Personal Access Token",
      "password": true
    }
  ]
}
```

## Add custom commit message based on reading code changes
- in vs code open command palette
- serch for user settings, which opens setting.json file of vs code, then add this obj
```json
"github.copilot.chat.commitMessageGeneration.instructions": [
    {
      "text": "Use conventional commit message format. Use emojis to indicate type of changes such as 🎨 for css or vanilla extract, ✨ for new features, 🐛 for bugfixes, 🔧 for config changes, 📝 for documentation updates"
    }
  ]
```