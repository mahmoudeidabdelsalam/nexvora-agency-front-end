This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## NEXVORA Voice AI

The existing static Next.js site connects to a separate Node.js token API and LiveKit Agent. The browser only receives a short-lived room token; LiveKit API credentials and the OpenAI key stay in the backend environment.

### Run locally

1. Create a LiveKit Cloud project and obtain its server URL, API key, and API secret. Create an OpenAI API key with Realtime API access.
2. Configure `voice-api/.env` from `voice-api/.env.example` with `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, and `ALLOWED_ORIGINS=http://localhost:3000`. Keep `AGENT_NAME` the same in both services.
3. Configure `voice-agent/.env` from `voice-agent/.env.example` with the same LiveKit credentials and `OPENAI_API_KEY`. Keep these files private; they are ignored by git.
4. Install and run the token API in one terminal:

   ```sh
   cd voice-api
   npm install
   npm run dev
   ```

5. Install the [LiveKit CLI](https://docs.livekit.io/reference/developer-tools/livekit-cli/) (on macOS, `brew install livekit-cli`), then start the agent in another terminal:

   ```sh
   cd voice-agent
   npm install
   npm run dev
   ```

6. Add `NEXT_PUBLIC_VOICE_API_URL=http://localhost:8080` to the repository-root `.env.local` (or export it before building the static site). This is a public endpoint URL, not a secret.
7. In another terminal, install and start Next.js:

   ```sh
   npm install
   npm run dev
   ```

8. Open [http://localhost:3000](http://localhost:3000), open the assistant, choose Voice, allow microphone access, and say “Hello”.

The voice API exposes `GET /health` and `GET /token?lang=en|ar-eg&mode=text|voice`. The token endpoint allows only `ALLOWED_ORIGINS`, validates both query parameters, and limits each IP to 30 requests per minute. Text mode cannot publish microphone tracks but can publish LiveKit data messages; voice mode can publish audio. The API explicitly dispatches the configured `AGENT_NAME` (default `nexvora-assistant`) with the selected language and mode as non-secret job metadata. Behind a single trusted reverse proxy, set `TRUST_PROXY=true` so rate limits use client IPs; only do this when direct access to the service is restricted.

### Production topology

Target production topology:

```text
Next.js static site
  -> Cloudflare
  -> voice-api.nexvoraagency.com
  -> LiveKit Cloud
  -> nexvora-assistant
  -> OpenAI Realtime
```

Deploy the two Node services separately (or use their Dockerfiles), configure the voice API's allowed website origins, and provide LiveKit/OpenAI credentials only as runtime secrets. Set `NEXT_PUBLIC_VOICE_API_URL=https://voice-api.nexvoraagency.com` as a build-time variable for the static site. DNS, Cloudflare proxying, service deployment, and credentials must be provisioned separately; this repository change does not create those resources.

Build either backend with `npm run build` from its directory and run the production output with `npm start`. Docker build contexts are `voice-api/` and `voice-agent/`; inject `.env` values at runtime rather than copying environment files into the images.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
