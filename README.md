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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment

This project is designed to be deployed on Vercel. Follow these steps:

1. Push your code to a GitHub repository.
2. Create a new project on Vercel and link it to your GitHub repository.
3. Set up the following environment variables in your Vercel project settings:
   - `GITHUB_ID`: Your GitHub OAuth App Client ID
   - `GITHUB_SECRET`: Your GitHub OAuth App Client Secret
   - `NEXTAUTH_SECRET`: A random string used to hash tokens (you can generate one using `openssl rand -base64 32`)
   - `NEXTAUTH_URL`: The URL of your deployed app (e.g., https://your-app.vercel.app)
4. Deploy the project.

Make sure to set up a Vercel Postgres database and connect it to your project for data storage.
