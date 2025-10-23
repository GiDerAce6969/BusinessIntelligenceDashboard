# Nexus BI: AI-Powered Business Intelligence Dashboard

Nexus BI is a modern, responsive, and intelligent dashboard built with Next.js, TypeScript, and Tailwind CSS. This project serves as a showcase for a Business Intelligence (BI) tool that not only visualizes data but also leverages AI to provide actionable insights, anomaly detection, and natural language querying.

![Nexus BI Dashboard Screenshot](./public/screenshot.png) 
*(You will need to add a screenshot of the running app to the `/public` folder for the image to display)*

## ✨ Core Features

*   **Responsive Dashboard View**: Clean and intuitive interface with key performance indicators (KPIs), trend charts, and data tables.
*   **Data Source Management**: A dedicated view to manage file uploads (CSV, Excel, JSON) and connect to databases (PostgreSQL, Snowflake, etc.).
*   **Collapsible Sidebar**: A sleek, expandable navigation menu for a better user experience on different screen sizes.
*   **Modern Tech Stack**: Built with Next.js for performance and React for a declarative UI. Styled with the utility-first power of Tailwind CSS.
*   **Interactive Charts**: Beautiful and interactive charts powered by [Recharts](https://recharts.org/).

## 🤖 AI-Powered Intelligence Engine

This dashboard is enhanced with a simulated AI engine that provides three key intelligent functions:

1.  **AI-Generated Insights**: Below each chart, a dedicated section provides a plain-English summary of what the data is showing, highlighting key trends and important points.
2.  **Natural Language Query**: The main search bar is designed to be an entry point for users to "ask questions about their data," mimicking how a user would interact with an LLM-powered analytics tool.
3.  **Proactive Anomaly Detection**: Key metrics (KPIs) can be automatically monitored. If the AI engine detects a statistically significant anomaly, it flags the metric with an alert icon, providing a tooltip with a detailed explanation.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) (v18 or later) and [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/nexus-bi-dashboard.git
    cd nexus-bi-dashboard
    ```

2.  **Install dependencies:**
    This project uses several libraries for charts, icons, and styling.
    ```bash
npm install recharts lucide-react clsx tailwind-merge
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack & Libraries

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Charting**: [Recharts](https://recharts.org/en-US/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Classname Utilities**: `clsx` & `tailwind-merge`

## 💡 How the AI Engine Works (Conceptual)

While the AI features in this demo are mocked on the frontend for demonstration purposes, a real-world implementation would involve:

1.  **Backend Service**: A secure backend (e.g., Node.js with Express, or Python with FastAPI) that connects to the user's data sources.
2.  **LLM Integration**: The backend service would make API calls to a Large Language Model 
3.  **Data Analysis**: For insights and anomaly detection, relevant data is passed to the LLM with a carefully crafted prompt asking it to analyze the data and return a summary or identify deviations.
4.  **Natural Language to SQL**: For the "Ask your Data" feature, the user's question is sent to the LLM, which is prompted to convert the natural language query into a valid SQL query. This SQL is then run against the user's database, and the results are returned to the user.

This project provides the frontend foundation for building such a powerful and intelligent application.
