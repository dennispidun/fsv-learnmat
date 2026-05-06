FROM node:18-bullseye-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY decorate-angular-cli.js ./

RUN npm install --legacy-peer-deps
RUN npx ngcc --properties es2015 browser module main --create-ivy-entry-points

COPY . .

RUN npx nx build api --configuration=production
RUN npx nx build learnmat --configuration=production

# Copy config files to dist and create empty production.json
RUN cp -r apps/api/src/configs dist/apps/api/configs && echo '{}' > dist/apps/api/configs/production.json

FROM node:18-bullseye-slim AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev --legacy-peer-deps --ignore-scripts

COPY --from=builder /app/dist/apps/api ./dist/apps/api
COPY --from=builder /app/dist/apps/learnmat ./dist/apps/learnmat

# SSL certs are expected at /app/key.pem and /app/cert.pem
# Mount them at runtime: -v /host/key.pem:/app/key.pem -v /host/cert.pem:/app/cert.pem

ENV NODE_ENV=production
ENV NODE_CONFIG_DIR=/app/dist/apps/api/configs

# Required environment variables:
# SECRET_KEY     - JWT signing secret
# UNI_USERNAME   - University SMTP username
# UNI_PASSWORD   - University SMTP password
# UNI_MAIL       - University sender email
# ACC_USERNAME   - AcademicCloud username
# ACC_PASSWORD   - AcademicCloud app password
# ACC_HOST       - AcademicCloud WebDAV URL (default below)
# DOMAIN         - Public domain, e.g. https://learnmat.example.de
# PORT           - Port to listen on (default 443)
ENV ACC_HOST=https://sync.academiccloud.de/remote.php/nonshib-webdav

# Build with --build-arg PORT=443 to enable direct HTTPS mode
ARG PORT=80
ENV PORT=${PORT}

EXPOSE ${PORT}

CMD ["node", "dist/apps/api/main.js"]
