# 📚 Read Origin Guide
# TamboAI #WeMakeDevs
## 🔍 Project Overview

**Jan Book Explorer Guide** is an AI-powered, generative book exploration interface inspired by **Tambo-style conversational UIs**.
Users interact through a simple chat interface by entering a book name, and the application dynamically generates structured insights on a single screen.

The UI adapts in real time based on the user’s query, presenting:

* A clear **Context summary** of the book
* **Ratings and metadata**
* A **visual comparison chart** rendered as real bar charts

This creates a fast, intuitive, and insight-rich experience for readers, students, and researchers.

---

## 🚀 Usage

1. Enter a book name (e.g., *Things you can see when you slow down*, *Dune*)
2. Click **Ask**
3. Instantly view:

   * Book origin & contextual summary
   * Rating and key attributes
   * A comparison chart
4. Download the AI-generated summary for offline use

All content appears on **one responsive screen** without navigation or reloads.

---

## 🧠 How Tambo-Style Architecture Works Here

This project follows the **Tambo philosophy** of separating:

* **Conversation control** (chat input)
* **Generative UI output** (grids, charts, summaries)

Instead of returning plain text, each API response returns **structured data**, which the UI transforms into:

* Adaptive grids
* Visual charts
* Downloadable content

This mirrors how Tambo enables **context-aware UI generation** rather than static responses.

### Why Tambo-style is powerful here:

* UI changes automatically based on intent
* Easy to extend with new grids or visual blocks
* Clean separation of logic and presentation
* Ideal for SDK-style productization

---

## 🌐 APIs & AI Integration

### 📘 Google Books API

Used to fetch **real-time book data**:

* Title, authors
* Ratings
* Publication info
* Page count

This ensures **accurate, up-to-date, non-mock data** for every book search.

### 🤖 OpenAI (AI Summary)

Used to generate:

* Clear summaries
* Contextual origin explanation
* Reader-friendly descriptions (not scraped text)

The AI converts raw metadata into **human-readable insights**, which is critical for knowledge-based applications.

---

## 🛠️ Technologies Used

* **Next.js (App Router)**
* **React + TypeScript**
* **Tailwind CSS**
* **Google Books API**
* **OpenAI API**
* **Node.js API Routes**
  
📂 Key Project Files (Overview)

src/ – Application source

app/

page.tsx → Core interface handling chat input and dynamic UI rendering

layout.tsx → App-wide layout setup and providers

globals.css → Global styling powered by Tailwind CSS

api/

book/route.ts → Fetches book metadata using the Google Books API

summary/route.ts → Generates AI-written book summaries via OpenAI

tambo/route.ts → Manages Tambo-style intent handling and UI orchestration

lib/

ui.schema.ts → Defines the dynamic UI blueprint that controls how components are laid out and rendered at runtime
## 🌟 Why This Project Stands Out

* **Generative UI, not static pages**
* **Single-screen intelligent layout**
* Real-time data + AI synthesis
* Clean SDK-like architecture
* Easily extendable into a **Tambo Chat SDK**

---

## 🏁 Final Note

**ReadOrigin** demonstrates how conversational input combined with structured generative AI responses can create powerful, scalable interfaces — exactly what modern AI platforms like **Tambo** aim to enable.
