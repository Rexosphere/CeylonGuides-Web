---
hero:
  title: "We are here for your journey."
  subtitle: "Whether you have a question about a tour, need technical help, or want to partner with us, we are here to assist you in exploring the beauty of Sri Lanka."
  image: "/images/downloaded_62a94af4c9f0.avif"
  responseStats:
    - icon: "mail"
      text: "Email replies within 2 hours"
    - icon: "chat"
      text: "Live chat available now"
    - icon: "phone"
      text: "24/7 emergency support"

tabs:
  - id: "general"
    label: "General Inquiry"
    icon: "help"
    description: "Questions about tours, bookings, or planning"
  - id: "issue"
    label: "Report Issue"
    icon: "warning"
    description: "Technical problems or booking issues"
  - id: "feedback"
    label: "Feedback"
    icon: "thumb_up"
    description: "Share your experience or suggestions"
  - id: "partnerships"
    label: "Partnerships"
    icon: "handshake"
    description: "Join our network of local experts"

topicsPerTab:
  general:
    - "Question about a tour"
    - "Help planning my itinerary"
    - "Pricing and payment questions"
    - "Guide availability"
    - "Booking modifications"
    - "Other inquiry"
  issue:
    - "Website technical problem"
    - "Booking/payment issue"
    - "Guide service complaint"
    - "Safety concern"
    - "Other issue"
  feedback:
    - "Compliment"
    - "Suggestion for improvement"
    - "Website feedback"
    - "Guide review"
    - "Other feedback"
  partnerships:
    - "I'm a local guide"
    - "I own a hotel/guesthouse"
    - "I run a tour company"
    - "Media/press inquiry"
    - "Other partnership"

formConfigPerTab:
  general:
    title: "How can we help?"
    messagePlaceholder: "Tell us about your trip plans, questions about tours, or anything else we can help with..."
    submitButton: "Send Inquiry"
    extraFields:
      - id: "bookingRef"
        type: "text"
        label: "Booking Reference"
        placeholder: "e.g., CG-2026-00123 (optional)"
        required: false
        icon: "confirmation_number"
  issue:
    title: "Report an Issue"
    messagePlaceholder: "Please describe the issue in detail. Include dates, booking references, and any relevant information..."
    submitButton: "Submit Report"
    extraFields:
      - id: "bookingRef"
        type: "text"
        label: "Booking Reference"
        placeholder: "e.g., CG-2026-00123"
        required: true
        icon: "confirmation_number"
      - id: "urgency"
        type: "select"
        label: "Urgency Level"
        required: true
        icon: "schedule"
        options: ["Standard (2-4 hours)", "Urgent (within 1 hour)", "Emergency (immediate)"]
  feedback:
    title: "Share Your Feedback"
    messagePlaceholder: "We'd love to hear about your experience! Share what went well or how we can improve..."
    submitButton: "Send Feedback"
    extraFields:
      - id: "rating"
        type: "rating"
        label: "Overall Experience"
        required: false
        icon: "star"
      - id: "guideName"
        type: "text"
        label: "Guide Name"
        placeholder: "If applicable, which guide did you work with?"
        required: false
        icon: "person"
  partnerships:
    title: "Partner With Us"
    messagePlaceholder: "Tell us about yourself, your business, and how you'd like to partner with CeylonGuide..."
    submitButton: "Submit Application"
    extraFields:
      - id: "partnerType"
        type: "select"
        label: "Partner Type"
        required: true
        icon: "category"
        options: ["Tour Guide", "Hotel/Guesthouse", "Transportation Provider", "Activity Organizer", "Content Creator", "Other"]
      - id: "website"
        type: "text"
        label: "Website or Social Media"
        placeholder: "https://yourwebsite.com or @yoursocial"
        required: false
        icon: "link"
      - id: "experience"
        type: "select"
        label: "Years of Experience"
        required: true
        icon: "work_history"
        options: ["Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"]

form:
  fields:
    name:
      label: "Your Name"
      placeholder: "Ayubowan, what's your name?"
    email:
      label: "Email Address"
      placeholder: "Where can we reach you?"
    topic:
      label: "Topic"
    message:
      label: "Message"
  privacyNote: "Your information is secure. We never share your details with third parties."

contactMethods:
  - id: "email"
    icon: "mail"
    label: "Email Support"
    value: "hello@ceylonguide.com"
    link: "mailto:hello@ceylonguide.com"
    note: "Response time: Within 2 hours"
  - id: "chat"
    icon: "chat"
    label: "Live Chat"
    value: "Available 9am - 6pm IST"
    isOnline: true
    note: "Average response: 2 minutes"
  - id: "whatsapp"
    icon: "chat_bubble"
    label: "WhatsApp"
    value: "+94 77 123 4567"
    link: "https://wa.me/94771234567"
    note: "Available 24/7 for urgent support"
  - id: "office"
    icon: "location_on"
    label: "Office"
    value: "Colombo 07, Sri Lanka"
    address: "123 Galle Road, Colombo 07, Sri Lanka"
    hours: "Mon-Fri 9am-5pm, Sat 10am-2pm"

faqs:
  - question: "How do I book a guide?"
    answer: "Simply navigate to the \"Guides\" section, browse profiles, and click \"Book Now\" on your chosen guide's page."
    tab: "general"
  - question: "Are payments secure?"
    answer: "Yes, all transactions are encrypted and processed through secure global payment gateways."
    tab: "general"
  - question: "Can I cancel a tour?"
    answer: "Cancellations made 48 hours prior to the scheduled tour are eligible for a full refund."
    tab: "general"
  - question: "What if I have an emergency during my trip?"
    answer: "Contact our 24/7 emergency hotline immediately. We have staff available around the clock to assist with urgent situations."
    tab: "issue"
  - question: "How do I report a problem with my guide?"
    answer: "Use the Report Issue tab above or email us directly. All complaints are reviewed within 24 hours."
    tab: "issue"
  - question: "How can I leave a review for my guide?"
    answer: "After your tour, you'll receive an email with a link to leave a review. You can also find the review option in your booking history."
    tab: "feedback"

partnership:
  title: "Join our network"
  subtitle: "Are you a local guide or hotelier? Let's showcase Sri Lanka together."
  buttonText: "Become a Partner"
  benefits:
    - "Reach 10,000+ monthly travelers"
    - "Verified profile on our platform"
    - "Fair, transparent pricing"
    - "Secure payment processing"
    - "Marketing support and exposure"
---