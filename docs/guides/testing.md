# EPIC-002 Testing Guide

## ✅ Prerequisites Completed

- [x] Supabase project created (`chris-nattress`)
- [x] Environment variables configured in `.env.local`
- [x] Anthropic API key configured
- [x] Development server running on http://localhost:3003

## 🔧 Important: Run Database Schema

**Before testing, you must run the database schema in Supabase:**

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/zcxmgiuvdzrzpsawypen
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Open the file `supabase/schema.sql` in your project
5. Copy the entire contents and paste into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Verify you see success messages for all tables created

## 🧪 Testing Checklist

### 1. Test Main Page & Chat Widget

**URL**: http://localhost:3003

- [ ] Page loads without errors
- [ ] You see "Chris Nattress" title with gradient effect
- [ ] Chat widget button appears in bottom-right corner
- [ ] Chat button has animated sparkle badge

### 2. Test Chat Functionality

**Steps**:
1. Click the chat widget button (bottom-right)
2. Widget should open with welcome message
3. You should see 4 suggested questions

**Test sending a message**:
- [ ] Click one of the suggested questions OR type your own
- [ ] Example: "What technologies does Chris know?"
- [ ] Message appears on the right side (blue background)
- [ ] "Thinking..." indicator appears
- [ ] AI response streams in real-time on the left side
- [ ] Response is relevant and mentions your skills/experience

**Test suggested questions**:
- [ ] "What technologies does Chris know?"
- [ ] "Tell me about Chris's leadership experience"
- [ ] "What's Chris's experience with microservices?"
- [ ] "Is Chris available for new opportunities?"

**Test chat features**:
- [ ] Minimize button works (chat collapses)
- [ ] Clicking minimized header expands chat again
- [ ] Close button (X) works
- [ ] Reopening chat shows previous conversation
- [ ] "Clear conversation" button works
- [ ] Messages persist after page refresh

### 3. Test Keyboard Shortcuts

- [ ] Type a message and press **Enter** → Sends message
- [ ] Type a message and press **Shift+Enter** → Adds new line (doesn't send)

### 4. Test Chat Context & AI Quality

**Ask these questions to verify AI has your resume context**:

```
1. "What companies have you worked for?"
   ✓ Should mention: Smart Moving, Safelite, Progressive Leasing, etc.

2. "Tell me about your experience with Angular"
   ✓ Should mention: Angular 2-17, Technical Lead role, enterprise apps

3. "What's your experience with microservices?"
   ✓ Should mention: 25 APIs, 100+ endpoints, template-driven architecture

4. "Do you have AWS experience?"
   ✓ Should mention: Safelite contract, Lambda, S3, DynamoDB

5. "Are you available for new opportunities?"
   ✓ Should mention current role at Smart Moving and openness to opportunities
```

### 5. Test Admin Dashboard

**URL**: http://localhost:3003/admin/analytics

**Steps**:
1. Navigate to http://localhost:3003/admin/analytics
2. You should see an "Admin Access Required" page
3. Enter your admin key: `chris_nattress_admin_2025_secure_key`
4. Click "Access Dashboard"

**Expected Results**:
- [ ] Dashboard loads successfully
- [ ] Shows "Total Conversations" card (should show conversations from testing)
- [ ] Shows "Unique Visitors" card
- [ ] Shows "Avg Response Time" card
- [ ] Shows "Daily Conversation Stats" table (may be empty initially)
- [ ] Shows "Popular Sections" (may be empty initially)

**Test Refresh**:
- [ ] Click "Refresh" button to reload data
- [ ] Data updates without needing to re-authenticate

### 6. Test Analytics Tracking

**Verify conversation logging**:

1. Send a few messages in the chat widget
2. Go to Supabase dashboard → Table Editor
3. Check the `chat_conversations` table
4. You should see your messages and AI responses logged

**Check the following tables**:
- [ ] `chat_conversations` - Has your test conversations
- [ ] `visitor_analytics` - Has page view events
- [ ] `project_views` - (Will populate when you add projects)
- [ ] `job_analyses` - (Will populate when job analysis feature is used)

### 7. Test Mobile Responsiveness

**Steps**:
1. Open browser DevTools (F12)
2. Toggle device toolbar (Cmd/Ctrl + Shift + M)
3. Select a mobile device (iPhone 12, etc.)

**Verify**:
- [ ] Page is responsive
- [ ] Chat widget is accessible on mobile
- [ ] Chat UI is readable and usable
- [ ] Buttons are touch-friendly
- [ ] Messages display correctly

### 8. Test Error Handling

**Test rate limiting**:
- [ ] Send 10+ messages rapidly
- [ ] Should still work (limit is 100/hour)

**Test network errors** (optional):
1. Open DevTools → Network tab
2. Set to "Offline"
3. Try sending a message
4. Should show error: "Failed to send message. Please try again."
5. Set back to "Online" and retry
6. Should work normally

### 9. Test Analytics Views (SQL)

**Run these queries in Supabase SQL Editor**:

```sql
-- View conversation statistics
SELECT * FROM daily_conversation_stats;

-- View popular sections
SELECT * FROM popular_sections;

-- View all conversations
SELECT * FROM chat_conversations ORDER BY created_at DESC LIMIT 10;

-- View all visitor analytics
SELECT * FROM visitor_analytics ORDER BY created_at DESC LIMIT 10;
```

## 🎯 Success Criteria

All of the following should be true:

- ✅ Chat widget opens and closes smoothly
- ✅ AI responds accurately to questions about your background
- ✅ Responses stream in real-time (not all at once)
- ✅ Conversations persist across page reloads
- ✅ Admin dashboard shows analytics data
- ✅ Supabase tables are logging data correctly
- ✅ Mobile experience is smooth
- ✅ No console errors in browser DevTools

## 🐛 Common Issues & Fixes

### Chat widget doesn't open
- Check browser console for errors (F12)
- Verify `.env.local` has all required variables
- Restart dev server: `npm run dev`

### AI doesn't respond
- Check that `ANTHROPIC_API_KEY` is set correctly in `.env.local`
- Check browser Network tab for failed requests
- Look for errors in terminal where dev server is running

### "Database error" messages
- Verify you ran the `supabase/schema.sql` script
- Check Supabase dashboard → Database → Tables
- Verify RLS policies are enabled

### Admin dashboard shows "Unauthorized"
- Verify `ADMIN_ACCESS_KEY` matches in `.env.local`
- Clear browser cache and try again
- Check that you're entering the key exactly: `chris_nattress_admin_2025_secure_key`

### Rate limit errors
- Wait 1 hour or restart dev server
- Check `RATE_LIMIT_MAX_REQUESTS` in `.env.local`

## 📊 Expected Metrics (After Testing)

After completing all tests, your admin dashboard should show:

- **Total Conversations**: ~5-10 (from testing)
- **Unique Visitors**: 1 (your session)
- **Avg Response Time**: < 3 seconds
- **Popular Sections**: "page_view" should be top

## 🚀 Next Steps After Testing

Once everything works:

1. **Deploy to Production**
   - Push code to GitHub (already done ✅)
   - Deploy to Vercel/Netlify
   - Add production environment variables

2. **Monitor & Optimize**
   - Check Anthropic API usage/costs
   - Monitor Supabase database size
   - Review conversation quality
   - Adjust rate limits if needed

3. **Enhance** (Future)
   - Add more projects to showcase
   - Implement job description analyzer
   - Add suggested follow-up questions
   - Enable conversation export

## 📝 Notes

- **Admin Key**: `chris_nattress_admin_2025_secure_key`
- **Development URL**: http://localhost:3003
- **Supabase Dashboard**: https://supabase.com/dashboard/project/zcxmgiuvdzrzpsawypen

---

**Testing Date**: October 21, 2025
**Epic**: EPIC-002: AI Integration
**Status**: Ready for Testing

---

Need help? Check:
- `EPIC-002-IMPLEMENTATION.md` for implementation details
- `supabase/README.md` for database setup
- Browser console (F12) for client-side errors
- Terminal output for server-side errors
