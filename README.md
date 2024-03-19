# Document Tracking Application
An application design to track document in an office/organisation.

## Running Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Project Organisation

        ├── README.md
        ├── actions
        ├── app
        │   .
        │   .
        │   └── user
        │       ├── login
        │       └── register
        ├── components
        ├── components.json
        ├── jsconfig.json
        ├── lib
        │   ├── auth.js
        │   ├── luciaPrisma.js
        │   ├── prisma.js
        │   └── utils.js
        ├── next.config.mjs
        ├── node_modules
        ├── package.json
        ├── pnpm-lock.yaml
        ├── postcss.config.js
        ├── prisma
        │   .
        │   ├── migrations
        │   └── schema.prisma
        ├── providers
        │   └── sessionProvider.js
        ├── public
        └── tailwind.config.js

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.