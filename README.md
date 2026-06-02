# Ad Audio Generation

AI-powered tool that generates 15-second audio advertisements for local businesses.

## How it works

1. Select a brand from the dropdown in the browser UI
2. OpenAI generates a short advertisement script based on the brand's info
3. ElevenLabs synthesizes the narrator voice and background music
4. The two audio tracks are mixed into a final MP3, ready to play or download

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- An [OpenAI API key](https://platform.openai.com/api-keys)
- An [ElevenLabs API key](https://elevenlabs.io)

## Setup

1. Clone the repo:
   ```bash
   git clone <repo-url>
   cd ad_audio_generation
   ```

2. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
   Then open `.env` and fill in your API keys (see [Environment variables](#environment-variables) below).

## Running locally

```bash
docker-compose up --build
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Yes | Your OpenAI API key |
| `OPEN_AI_MODEL` | Yes | OpenAI model to use (e.g. `gpt-4o`) |
| `ELEVEN_LABS_KEY` | Yes | Your ElevenLabs API key |
| `ELEVEN_LABS_MODEL` | Yes | ElevenLabs voice model (e.g. `eleven_v3`) |
| `OUTPUT_DIR` | No | Where generated MP3s are saved (default: `/app/data/ad_audio`) |
| `BACKGROUND_AUDIO_DIR` | No | Background music cache directory (default: `/app/data/background_audio`) |
| `NARRATOR_AUDIO_DIR` | No | Narrator audio cache directory (default: `/app/data/narrator`) |
| `FRONTEND_DIR` | No | Frontend static files path (default: `/app/frontend`) |

The last four are pre-configured for the Docker environment — you only need to set the first four.
