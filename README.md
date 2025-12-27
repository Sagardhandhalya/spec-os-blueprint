# Spec-OS Blueprint

A dedicated "Planning Layer" for AI code generation.

Built as a technical proof-of-concept for the Traycer AI full-stack challenge.

## The Problem: "The Empty Editor Problem"

Modern AI coding tools (Cursor, Copilot) are incredibly powerful at writing code, but they often fail at engineering.

- **Context Loss**: Chat interfaces lose track of complex requirements as you scroll.
- **Hallucinations**: Without a strict plan, LLMs invent APIs that don't exist.
- **blind-coding**: They jump straight to writing code without verifying dependencies.

## The Solution: Spec-OS

Spec-OS is a specialized IDE interface that sits before the code editor. It forces a "Plan → Verify → Execute" workflow. It treats the engineering plan not as a text block, but as **Structured Data**.

## Interface & Features

### 1. The Split-Brain Architecture

Instead of a single chat window, Spec-OS uses a rigid **Context vs. Artifact** split.

- **Left Pane (The Architect)**: A chat interface for discussing requirements and intent.
- **Right Pane (The Blueprint)**: A persistent, live-updating dashboard that visualizes the engineering plan.

### 2. Structured Risk Analysis

The core innovation of this blueprint is **Risk Visualization**.

- **File Diffing**: Visualizes exactly which files will be CREATED, MODIFIED, or DELETED.
- **Guardrails**: Automatically flags "High Risk" changes (e.g., database schema drops or authentication logic changes) with visual alerts.

### 3. The "Spec-First" Data Model

Code changes are stored as structured objects, not markdown.

```TypeScript
interface PlanStep {
  id: string;
  action: "create" | "modify";
  file: string;
  riskLevel: "low" | "medium" | "high";
  verificationSteps: string[];
}
```

## Tech Stack & Implementation

This project was built with a focus on performance, type safety, and modern UI patterns.

| Category | Technology | Reasoning |
|----------|-----------|-----------|
| **Core** | React 18 + Vite | Chosen over Next.js for a snappier, SPA-like "IDE feel" without server latency. |
| **Language** | TypeScript | Strict mode enabled to ensure the "Plan" data structures are robust. |
| **Styling** | Tailwind CSS | For rapid, utility-first styling that scales easily. |
| **UI Library** | Shadcn/UI | Built on Radix Primitives for accessibility and keyboard navigation. |
| **State** | React Context + Hooks | Lightweight state management to handle the "Planning → Generated" flow. |
| **Validation** | Zod | Ensures AI-generated JSON matches our strict UI schema. |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository

```Bash
git clone https://github.com/Sagardhandhalya/spec-os-blueprint.git
cd spec-os-blueprint
```

2. Install dependencies

```Bash
npm install
```

3. Run the development server

```Bash
npm run dev
```

Open your browser to `http://localhost:8080` (or the port shown in your terminal).

## Future Roadmap

If this were to move from Prototype to Production, the next engineering steps would be:

- **File System Access API**: Implement the browser-native `window.showDirectoryPicker()` to allow Spec-OS to read local codebases without a backend.
- **LSP Integration**: Connect to a Language Server Protocol to validate that the "Planned Code" doesn't have syntax errors before it's even written.
- **Cursor Deep Linking**: Add a "One-Click Export" that generates a `.cursorrules` file and injects it directly into the user's editor.

## Author

**Sagar Dhandhalya**

Frontend Engineer & UI/UX Enthusiast

## Design Decisions (For Reviewers)

- **Why Dark Mode Default?** Developers live in dark mode. The UI mimics VS Code's palette to reduce context-switching friction.
- **Why a Web App?** While a VS Code extension is powerful, a standalone Web App offers a "Focus Mode" for planning, separating the thinking phase from the typing phase.

