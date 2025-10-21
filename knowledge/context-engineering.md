# Context Engineering for AI Agents

A comprehensive guide to effectively curating and managing context for AI agents, addressing the critical challenge of working within the finite attention budget of large language models.

**Published:** September 29, 2025  
**Author:** Anthropic's Applied AI Team

---

## Overview

Context is a critical but finite resource for AI agents. This guide explores strategies for effectively curating and managing the context that powers them, representing a fundamental shift from prompt engineering to context engineering as AI systems become more sophisticated.

## What is Context Engineering?

**Context engineering** refers to the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference, including system instructions, tools, external data, message history, and more.

While **prompt engineering** focuses on writing and organizing LLM instructions for optimal outcomes, context engineering addresses the broader question: "What configuration of context is most likely to generate our model's desired behavior?"

### Key Differences

| Prompt Engineering | Context Engineering |
|-------------------|---------------------|
| Focus on writing effective prompts | Focus on managing entire context state |
| Primarily one-shot tasks | Multi-turn inference and longer time horizons |
| Discrete task | Iterative, ongoing curation |
| Static instructions | Dynamic information management |

## Why Context Engineering Matters

Despite their impressive capabilities, LLMs experience **context rot**: as the number of tokens in the context window increases, the model's ability to accurately recall information decreases. This stems from:

- **Architectural constraints**: Transformer architecture creates n² pairwise relationships for n tokens
- **Attention budget**: Like humans with limited working memory, LLMs have finite attention capacity
- **Training distribution**: Models have less experience with longer sequences
- **Diminishing returns**: Each new token depletes the attention budget

**Key Principle:** Find the smallest possible set of high-signal tokens that maximize the likelihood of your desired outcome.

## Components of Effective Context

### 1. System Prompts

**Best Practices:**
- Use extremely clear, simple, direct language
- Find the right "altitude" between overly brittle logic and vague guidance
- Organize into distinct sections using XML tags or Markdown headers
- Start minimal and iterate based on failure modes
- Strive for sufficient information without excess

**Avoid:**
- ❌ Hardcoded complex, brittle if-else logic
- ❌ Vague, high-level guidance that lacks concrete signals
- ❌ False assumptions about shared context

### 2. Tools

**Design Principles:**
- Promote efficiency in both information retrieval and agent behavior
- Ensure minimal overlap in functionality
- Make tools self-contained and robust to error
- Use descriptive, unambiguous input parameters
- Return token-efficient information

Tools define the contract between agents and their information/action space, making their design critical for overall system performance.

### 3. External Data & Message History

Context engineering requires continuous curation of what information enters the model at each step, balancing relevance with attention budget constraints.

## Techniques for Long-Horizon Tasks

When tasks span tens of minutes to multiple hours, specialized techniques are required to work around context window limitations:

### Compaction

**What it is:** Summarizing conversation contents when nearing context window limit and reinitializing with the compressed version.

**Implementation:**
- Pass message history to model for summarization
- Preserve critical details: architectural decisions, unresolved bugs, implementation details
- Discard redundant tool outputs or messages
- Continue with compressed context plus most recently accessed files

**Tip:** Start by maximizing recall, then iterate to improve precision. Tool result clearing is a safe, lightweight form of compaction.

### Structured Note-Taking (Agentic Memory)

**What it is:** Agents regularly write notes persisted outside the context window, pulled back in when needed.

**Benefits:**
- Persistent memory with minimal overhead
- Track progress across complex tasks
- Maintain critical context across tool calls
- Enable multi-hour strategies

**Example:** Claude Code maintains to-do lists, or custom agents maintain NOTES.md files for tracking progress.

### Sub-Agent Architectures

**What it is:** Specialized sub-agents handle focused tasks with clean context windows while a main agent coordinates the high-level plan.

**Advantages:**
- Clear separation of concerns
- Each sub-agent explores extensively but returns condensed summaries
- Detailed search context remains isolated
- Lead agent focuses on synthesis and analysis

**Best for:** Complex research and analysis tasks where parallel exploration provides value.

## Choosing the Right Approach

| Approach | Best For |
|----------|----------|
| **Compaction** | Tasks requiring extensive back-and-forth conversational flow |
| **Note-Taking** | Iterative development with clear milestones |
| **Multi-Agent** | Complex research and analysis with parallel exploration needs |

## Getting Started

1. **Start minimal**: Test a basic prompt with the best available model
2. **Identify failure modes**: Observe where the agent struggles
3. **Iterate based on data**: Add clear instructions and examples to address specific issues
4. **Measure token efficiency**: Track context usage and attention budget
5. **Implement appropriate techniques**: Choose compaction, note-taking, or multi-agent patterns based on task requirements

## Key Takeaways

- Context must be treated as a finite resource with diminishing marginal returns
- Effective context engineering finds the smallest set of high-signal tokens
- Even as models improve, maintaining coherence across extended interactions remains central
- Smarter models require less prescriptive engineering but still benefit from thoughtful context management
- The challenge evolves from "finding the right words" to "curating the right information at the right time"

## Resources

- [Anthropic Developer Platform](https://docs.anthropic.com)
- [Memory and Context Management Cookbook](https://docs.anthropic.com)
- [Writing Tools for AI Agents](https://www.anthropic.com)
- [Multi-Agent Research System](https://www.anthropic.com)

## Contributing

This guide represents the collective knowledge of Anthropic's Applied AI team and continues to evolve as models and techniques improve.

## Acknowledgements

**Written by:** Prithvi Rajasekaran, Ethan Dixon, Carly Ryan, and Jeremy Hadfield  
**Contributors:** Rafi Ayub, Hannah Moran, Cal Rueb, and Connor Jennings  
**Special thanks to:** Molly Vorwerck, Stuart Ritchie, and Maggie Vo

---

*For the latest updates and best practices, visit the [Claude Developer Platform](https://docs.anthropic.com).*