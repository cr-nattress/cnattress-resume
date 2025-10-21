# TASK-010: Create Contact Section Component

**Task ID:** TASK-010
**User Story:** US-003 - Core Content Sections
**Epic:** EPIC-001 - Foundation MVP
**Status:** To Do
**Estimated Time:** 1 hour
**Priority:** 🔴 Critical

---

## Task Description

Create the Contact section component with a contact form and direct contact information.

---

## Agent Prompt

You are building the Contact section for the AI-enhanced portfolio website.

**Goal**: Create a Contact component with a functional contact form and direct contact links for recruiters and visitors.

**Context**: This is the final content section that provides a clear call-to-action for visitors to get in touch. For now, the form will be client-side only (email integration can be added later). Part of US-003 (Core Content Sections) in EPIC-001 (Foundation MVP).

**Instructions**:

1. **Create Contact component** at `components/sections/Contact.tsx`:

   ```tsx
   "use client";

   import { useState } from "react";
   import { resumeData } from "@/lib/ai/resume-context";
   import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
   import { Button } from "@/components/ui/button";

   export default function Contact() {
     const [formData, setFormData] = useState({
       name: "",
       email: "",
       message: ""
     });
     const [submitted, setSubmitted] = useState(false);

     const handleSubmit = (e: React.FormEvent) => {
       e.preventDefault();
       // For now, just show success message
       // TODO: Add email API integration in EPIC-004
       console.log("Form submitted:", formData);
       setSubmitted(true);

       // Reset form after 3 seconds
       setTimeout(() => {
         setFormData({ name: "", email: "", message: "" });
         setSubmitted(false);
       }, 3000);
     };

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       setFormData({
         ...formData,
         [e.target.name]: e.target.value
       });
     };

     return (
       <section id="contact" className="py-20 bg-slate-900">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="max-w-4xl mx-auto">
             {/* Section Header */}
             <div className="text-center mb-16">
               <h2 className="text-4xl font-bold gradient-text mb-4">
                 Let's Work Together
               </h2>
               <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
               <p className="text-gray-400 text-lg">
                 Have a project in mind or want to discuss opportunities? I'd love to hear from you.
               </p>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
               {/* Contact Form */}
               <Card className="bg-white/5 backdrop-blur border-white/10">
                 <CardHeader>
                   <CardTitle className="text-2xl text-white">Send a Message</CardTitle>
                 </CardHeader>
                 <CardContent>
                   {submitted ? (
                     <div className="p-8 text-center">
                       <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                         <svg
                           className="w-8 h-8 text-green-400"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M5 13l4 4L19 7"
                           />
                         </svg>
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
                       <p className="text-gray-400">I'll get back to you soon.</p>
                     </div>
                   ) : (
                     <form onSubmit={handleSubmit} className="space-y-4">
                       <div>
                         <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                           Name
                         </label>
                         <input
                           type="text"
                           id="name"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           required
                           className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="Your name"
                         />
                       </div>
                       <div>
                         <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                           Email
                         </label>
                         <input
                           type="email"
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           required
                           className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           placeholder="your.email@example.com"
                         />
                       </div>
                       <div>
                         <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                           Message
                         </label>
                         <textarea
                           id="message"
                           name="message"
                           value={formData.message}
                           onChange={handleChange}
                           required
                           rows={5}
                           className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                           placeholder="Tell me about your project or opportunity..."
                         />
                       </div>
                       <Button
                         type="submit"
                         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                       >
                         Send Message
                       </Button>
                     </form>
                   )}
                 </CardContent>
               </Card>

               {/* Contact Information */}
               <div className="space-y-6">
                 <Card className="bg-white/5 backdrop-blur border-white/10">
                   <CardHeader>
                     <CardTitle className="text-2xl text-white">Contact Information</CardTitle>
                   </CardHeader>
                   <CardContent className="space-y-4">
                     {/* Email */}
                     <a
                       href={`mailto:${resumeData.email}`}
                       className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                     >
                       <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                         <svg
                           className="w-6 h-6 text-white"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                           />
                         </svg>
                       </div>
                       <div>
                         <div className="text-sm text-gray-400">Email</div>
                         <div className="text-white group-hover:text-blue-400 transition-colors">
                           {resumeData.email}
                         </div>
                       </div>
                     </a>

                     {/* LinkedIn */}
                     <a
                       href={resumeData.linkedin}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                     >
                       <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                         <svg
                           className="w-6 h-6 text-white"
                           fill="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                         </svg>
                       </div>
                       <div>
                         <div className="text-sm text-gray-400">LinkedIn</div>
                         <div className="text-white group-hover:text-blue-400 transition-colors">
                           linkedin.com/in/chris-nattress
                         </div>
                       </div>
                     </a>

                     {/* Location */}
                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                       <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                         <svg
                           className="w-6 h-6 text-white"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                         >
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                           />
                           <path
                             strokeLinecap="round"
                             strokeLinejoin="round"
                             strokeWidth={2}
                             d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                           />
                         </svg>
                       </div>
                       <div>
                         <div className="text-sm text-gray-400">Location</div>
                         <div className="text-white">{resumeData.location}</div>
                       </div>
                     </div>
                   </CardContent>
                 </Card>

                 {/* AI Chat CTA */}
                 <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur border-blue-500/20">
                   <CardContent className="p-6 text-center">
                     <h3 className="text-xl font-bold text-white mb-2">
                       Quick Questions?
                     </h3>
                     <p className="text-gray-300 mb-4">
                       Chat with my AI assistant to learn more about my experience and expertise.
                     </p>
                     <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                       💬 Ask AI About Me
                     </Button>
                   </CardContent>
                 </Card>
               </div>
             </div>
           </div>
         </div>
       </section>
     );
   }
   ```

2. **Verify the component renders**:
   - Component should compile without errors
   - Form displays with all fields
   - Contact information cards display

3. **Test form functionality**:
   - Fill out form and submit
   - Should show success message
   - Form should reset after 3 seconds

4. **Test responsive design**:
   - Mobile (< 768px): Form and contact info stack vertically
   - Desktop (≥ 768px): Two column layout

---

## Implementation Details

### Component Features
- Contact form with name, email, message fields
- Client-side form validation (HTML5 required attributes)
- Success message on submission
- Direct contact links (email, LinkedIn)
- Location display
- AI chat CTA card
- "use client" directive for form state

### Styling
- Dark background (bg-slate-900)
- Glass morphism cards
- Gradient buttons
- Hover effects on contact links
- Focus states on form inputs
- Responsive 2-column layout

---

## Verification

**Visual Checks:**
1. ✅ Section displays with dark background
2. ✅ Contact form card on left
3. ✅ Contact info cards on right
4. ✅ All form fields present and styled
5. ✅ Contact links styled with icons
6. ✅ AI Chat CTA card at bottom

**Functional Checks:**
1. ✅ Form inputs accept text
2. ✅ Form validation works (required fields)
3. ✅ Submit shows success message
4. ✅ Form resets after 3 seconds
5. ✅ Email link opens mail client
6. ✅ LinkedIn link opens in new tab

**Responsive Checks:**
1. ✅ Mobile: Single column, stacked
2. ✅ Desktop: Two columns (form | contact info)
3. ✅ Form inputs full width on mobile

**Technical Checks:**
```bash
# No TypeScript errors
npm run build

# Dev server runs without errors
npm run dev

# Check in browser at localhost:3000/#contact
```

---

## Expected Outcome

- ✅ Contact section component created
- ✅ Contact form functional with validation
- ✅ Success message displays on submit
- ✅ Contact information displayed from resumeData
- ✅ All contact links functional
- ✅ AI Chat CTA included
- ✅ Responsive 2-column layout
- ✅ No TypeScript errors

---

## Commit Message

```
feat(contact): Add Contact section with form and info

- Create Contact component with client-side form
- Add form validation and success message
- Display contact information from resumeData
- Add email, LinkedIn, and location links
- Include AI chat CTA card
- Implement responsive 2-column layout
- Use glass morphism card design
```

---

## Next Steps

After completing TASK-010:
1. ✅ Mark TASK-010 as complete
2. ✅ All 4 content sections now complete!
3. ➡️ Proceed to integrate all sections into homepage
4. ✅ US-003 will be complete
5. ✅ EPIC-001 Foundation MVP will be complete!

---

*Task created: 2025-10-21*
