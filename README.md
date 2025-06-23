# Mood-Adaptive Smart News Feed

## Overview

The Mood-Adaptive Smart News Feed is an AI-powered system that personalizes both the news content and the user interface based on the user’s current emotional state. By detecting the user's mood through a **clickable image-based UI**, the system dynamically adjusts the news feed and the page’s visual theme in near real-time to improve comfort, satisfaction, and engagement.

This project demonstrates **hyper-personalization via AI** by delivering mood-specific content and adapting the visual experience to help users feel better while browsing news.
 
---

## Features

- **Mood Detection via Clickable Images:**

  Users select their current mood by clicking an icon or emoji representing emotions like happy, stressed, calm, or anxious. This intuitive interface makes mood selection simple and engaging.

- **AI-Powered Content Classification:**

  News articles are analyzed by AI models to classify their emotional tone—e.g., stressful, neutral, uplifting, or calming.

- **Dynamic Feed Adjustment:**

  The news feed is filtered and ranked to prioritize articles matching the user’s mood. For example, stressful news is hidden when the user feels anxious.

- **Adaptive Visual Theme:**

  The webpage background and theme dynamically change according to the selected mood (e.g., calming blues for stress, bright yellows for happiness), enhancing the user's emotional comfort.

- **Near Real-Time Updates:**

  The system updates both content and UI instantly when the user changes their mood.

---

## How It Works

1. The user selects their mood by clicking on one of the mood icons.

2. The frontend sends this mood selection to the backend.

3. The backend filters and ranks news articles based on AI classification aligned with the mood.

4. The frontend updates the news feed and changes the page’s background color/theme accordingly.

5. The user enjoys a personalized, mood-sensitive news browsing experience.

---

## Technical Details

### Frontend

- Built with **React and TypeScript** for robustness and scalability.

- Mood input UI implemented as **clickable images/icons** representing moods.

- Real-time updates of the news feed and UI theme triggered on mood selection.

- Background color and theme controlled dynamically using CSS variables or styled-components based on mood.

### Backend

- News ingestion and preprocessing pipeline fetches and prepares articles.

- AI models classify articles by emotional tone and sentiment.

- Feed ranking algorithm prioritizes mood-appropriate articles to improve user comfort.

---

## Benefits

- Enhances user retention by serving emotionally relevant content.

- Reduces stress or discomfort caused by inappropriate news or UI visuals.

- Creates a pleasant, hyper-personalized browsing experience.

- Demonstrates practical AI use in UX hyper-personalization.

---

## Future Improvements

- Add indirect mood detection via facial or voice analysis.

- Implement continuous mood tracking for adaptive, evolving feeds.

- Expand mood categories for more granular personalization.

- Use user feedback to improve AI content classification and theme effectiveness.

---

## Getting Started

1. Clone the repo:

   ```bash

   git clone <your-repo-url>

   cd mood-adaptive-news-feed

 
