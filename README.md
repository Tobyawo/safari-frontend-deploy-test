### Safari Webstore (frontend)

Create React App + static assets. Local dev: `npm install` then `npm start`.

### Docker

Build and run locally:

```bash
docker build -t safariwebstore:local .
docker run --rm -p 8080:80 safariwebstore:local
```

Open [http://localhost:8080](http://localhost:8080).

**GitHub → Docker Hub:** On every push to `main`, `.github/workflows/docker-publish.yml` builds and pushes `tobyawo/88990011223344556677:latest` and a tag for the commit SHA.

Add these **repository secrets** in GitHub → Settings → Secrets:

| Secret | Value |
|--------|--------|
| `DOCKERHUB_USERNAME` | `tobyawo` |
| `DOCKERHUB_TOKEN` | Docker Hub [access token](https://hub.docker.com/settings/security) |

### Stock image conversion (optional)

```bash
npm run convert-stock-images
```
