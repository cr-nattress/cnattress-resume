# TASK-011: Create Netlify Function for Claude API Endpoint

**Task ID:** TASK-011
**User Story:** US-006 - Claude AI Chatbot Integration
**Epic:** EPIC-002 - AI Integration
**Status:** To Do
**Estimated Time:** 90 minutes
**Priority:** 🔴 Critical

---

## Task Description

Create a Netlify serverless function that acts as a secure proxy to the Claude API, implementing streaming responses and conversation logging.

---

## Agent Prompt

You are building the AI chatbot backend for the portfolio website.

**Goal**: Create a secure, serverless API endpoint that proxies requests to Claude AI with streaming support.

**Context**: This endpoint is the core of the AI chatbot feature. It must keep API keys secure, provide streaming responses for better UX, and log conversations for analytics. Part of EPIC-002 (AI Integration).

**Instructions**:

1. **Install required dependencies**:
   ```bash
   npm install @anthropic-ai/sdk
   ```

2. **Create Netlify functions directory**:
   ```bash
   mkdir -p netlify/functions
   ```

3. **Create the chat endpoint** at `netlify/functions/chat.ts`:

   ```typescript
   import Anthropic from "@anthropic-ai/sdk";
   import type { Handler, HandlerEvent } from "@netlify/functions";

   // Initialize Anthropic client
   const anthropic = new Anthropic({
     apiKey: process.env.ANTHROPIC_API_KEY!,
   });

   // Resume context for accurate responses
   const RESUME_CONTEXT = `
   You are an AI assistant representing Chris Nattress, a Software Engineer and AI Architect.

   KEY INFORMATION:
   - Full-stack developer with 8+ years experience
   - Expertise: React, Next.js, TypeScript, Node.js, PostgreSQL, Python
   - AI/ML experience: Claude API integration, prompt engineering, RAG systems
   - Recent projects:
     * AI-enhanced portfolio website (Next.js 15, Claude API, Supabase)
     * Video streaming platform with real-time features
     * Microservices architecture migrations
   - Education: [Add your education]
   - Location: [Add your location]
   - Open to: Remote, hybrid, and on-site opportunities
   - Strengths: System architecture, AI integration, full-stack development

   COMMUNICATION STYLE:
   - Professional yet conversational
   - Concise but informative
   - Highlight specific achievements with metrics when possible
   - Always honest about skill levels and experience

   When answering questions:
   1. Be specific and cite real projects/experience
   2. If unsure, say so - never make up information
   3. Keep responses focused and relevant
   4. Highlight how skills match what they're asking about
   `;

   const handler: Handler = async (event: HandlerEvent) => {
     // Only allow POST requests
     if (event.httpMethod !== "POST") {
       return {
         statusCode: 405,
         body: JSON.stringify({ error: "Method not allowed" }),
       };
     }

     try {
       // Parse request body
       const { messages } = JSON.parse(event.body || "{}");

       if (!messages || !Array.isArray(messages)) {
         return {
           statusCode: 400,
           body: JSON.stringify({ error: "Invalid request format" }),
         };
       }

       // Add system context to messages
       const messagesWithContext = [
         {
           role: "system" as const,
           content: RESUME_CONTEXT,
         },
         ...messages,
       ];

       // Create streaming response
       const stream = await anthropic.messages.create({
         model: "claude-sonnet-4-20250514",
         max_tokens: 1024,
         messages: messagesWithContext.filter((m) => m.role !== "system"),
         system: RESUME_CONTEXT,
         stream: true,
       });

       // Set up Server-Sent Events (SSE) headers
       const headers = {
         "Content-Type": "text/event-stream",
         "Cache-Control": "no-cache",
         "Connection": "keep-alive",
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Headers": "Content-Type",
       };

       // Stream the response
       let fullResponse = "";

       const encoder = new TextEncoder();
       const readable = new ReadableStream({
         async start(controller) {
           try {
             for await (const messageStreamEvent of stream) {
               if (
                 messageStreamEvent.type === "content_block_delta" &&
                 messageStreamEvent.delta.type === "text_delta"
               ) {
                 const text = messageStreamEvent.delta.text;
                 fullResponse += text;

                 // Send chunk to client
                 const data = `data: ${JSON.stringify({ text })}\n\n`;
                 controller.enqueue(encoder.encode(data));
               }

               if (messageStreamEvent.type === "message_stop") {
                 // Send completion signal
                 controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                 controller.close();
               }
             }
           } catch (error) {
             console.error("Streaming error:", error);
             controller.error(error);
           }
         },
       });

       return {
         statusCode: 200,
         headers,
         body: readable,
       };
     } catch (error) {
       console.error("Chat API error:", error);

       return {
         statusCode: 500,
         body: JSON.stringify({
           error: "Failed to process chat request",
           message:
             error instanceof Error ? error.message : "Unknown error",
         }),
       };
     }
   };

   export { handler };
   ```

4. **Update `netlify.toml`** configuration:

   Create/update `netlify.toml` in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [build.environment]
     NODE_VERSION = "20"

   [functions]
     directory = "netlify/functions"
     node_bundler = "esbuild"

   [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200

   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-Content-Type-Options = "nosniff"
   ```

5. **Add environment variable** to `.env.local`:
   ```bash
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

6. **Update `.env.example`**:
   ```bash
   # Anthropic Claude API
   ANTHROPIC_API_KEY=sk-ant-xxxxx
   ```

7. **Install Netlify CLI** for local testing:
   ```bash
   npm install -g netlify-cli
   ```

8. **Test locally with Netlify Dev**:
   ```bash
   netlify dev
   ```

9. **Test the endpoint** with curl:
   ```bash
   curl -X POST http://localhost:8888/.netlify/functions/chat \
     -H "Content-Type: application/json" \
     -d '{
       "messages": [
         {
           "role": "user",
           "content": "What technologies do you specialize in?"
         }
       ]
     }'
   ```

---

## Implementation Details

### Key Features

**Security:**
- API key stored in environment variables
- Never exposed to client
- Request validation
- Error messages don't leak sensitive info

**Streaming:**
- Uses Server-Sent Events (SSE)
- Sends chunks as they arrive from Claude
- Better perceived performance

**Context System:**
- Resume context injected as system message
- Ensures accurate, personalized responses
- Easy to update without code changes

### File Structure
```
netlify/
└── functions/
    └── chat.ts           # Chat endpoint

netlify.toml              # Netlify configuration
.env.local                # Local environment variables
.env.example              # Environment template
```

---

## Verification

**Automated Tests:**
```bash
# Start Netlify dev server
netlify dev

# Should start on http://localhost:8888

# Test endpoint
curl -X POST http://localhost:8888/.netlify/functions/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello"}]}'
```

**Manual Checks:**
1. ✅ Netlify dev server starts without errors
2. ✅ Chat endpoint responds to POST requests
3. ✅ Streaming works (response arrives in chunks)
4. ✅ Claude provides accurate answers about resume
5. ✅ Error handling works (test with invalid API key)
6. ✅ CORS headers allow requests from frontend
7. ✅ No API key visible in response or client code

**Expected Response:**
```
data: {"text":"I"}

data: {"text":" specialize"}

data: {"text":" in"}

... (more chunks)

data: [DONE]
```

---

## Expected Outcome

- ✅ Netlify function created at `netlify/functions/chat.ts`
- ✅ Function handles POST requests with messages array
- ✅ Streaming responses work correctly
- ✅ Claude API integration functional
- ✅ Resume context provides accurate answers
- ✅ Environment variables configured
- ✅ Local testing works with Netlify Dev
- ✅ No security vulnerabilities

---

## Troubleshooting

### Issue: "Module '@anthropic-ai/sdk' not found"
**Solution:**
```bash
npm install @anthropic-ai/sdk
```

### Issue: "ANTHROPIC_API_KEY is not defined"
**Solution:**
- Ensure `.env.local` has the key
- Restart `netlify dev` after adding env vars

### Issue: Streaming not working
**Solution:**
- Check Content-Type header is `text/event-stream`
- Ensure `stream: true` in anthropic.messages.create()
- Test with curl to isolate frontend vs backend issues

### Issue: "Cannot find module '@netlify/functions'"
**Solution:**
```bash
npm install --save-dev @netlify/functions
```

### Issue: CORS errors
**Solution:**
- Check `Access-Control-Allow-Origin: *` in headers
- Verify netlify.toml has correct redirects

---

## Commit Message

```
feat(api): Create Claude AI chat endpoint with streaming

- Add Netlify function for /api/chat endpoint
- Integrate Anthropic Claude API with streaming
- Implement resume context system for accurate responses
- Add error handling and request validation
- Configure netlify.toml for function routing
- Add environment variable configuration
```

---

## Next Steps

After completing TASK-011:
1. ✅ Mark TASK-011 as complete
2. ➡️ Proceed to TASK-012: Build resume context system
3. Then move to TASK-013: Implement streaming response handler
4. Continue with rate limiting and error handling

---

## Security Checklist

- [ ] API key in environment variables only
- [ ] API key never logged or exposed
- [ ] Request validation prevents injection
- [ ] Error messages don't leak sensitive data
- [ ] CORS configured appropriately
- [ ] Rate limiting implemented (in TASK-014)

---

*Task created: 2025-10-20*
*Last updated: 2025-10-20*
