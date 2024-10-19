FROM node:22

RUN npm install -g pnpm

WORKDIR /client

COPY package.json ./
COPY pnpm-lock.yaml* ./

RUN if [ -f pnpm-lock.yaml ]; then pnpm install --frozen-lockfile; else pnpm install; fi

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]