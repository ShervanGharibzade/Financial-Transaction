
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json yarn.lock ./


FROM base AS deps
RUN yarn install --frozen-lockfile


FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build


FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production


RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["yarn", "start"]
