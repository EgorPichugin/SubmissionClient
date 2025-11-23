# Submission Client (Nuxt 4 + Vue 3)

Minimal instructions to run locally and in Docker.

## Quick Start
1) Create .env file with API_BASE url inside
```bash
API_BASE=http://localhost:5203 # example
```

2) Install dependencies
```bash
npm install
```
3) Run application
```bash
npm run dev
```

## Docker Usage Guide
You can build or pull client docker image.

### Build docker image
1) Build docker image
```bash
docker build -t submission-client .
```

2) Run docker container
```bash
docker run -p 3000:3000 -e -e NUXT_PUBLIC_API_BASE="http://0.0.0.0:8080" submission-client
```
Open http://localhost:3000

### Pull docker image
1) Pull docker image
```bash
docker pull egorpichugin/submission-client:latest
```

2) Run docker container
```bash
docker run -p 3000:3000 -e -e NUXT_PUBLIC_API_BASE="http://0.0.0.0:8080" egorpichugin/submission-client:latest
```
Open http://localhost:3000