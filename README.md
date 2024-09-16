# Scaffold

Scaffold is a tool for creating and managing examples for your Large Language Model (LLM) pipelines.

## Features

- User authentication with GitHub
- Project management (create, view, delete projects)
- Input-output pair creation and management within projects
- Feedback submission system
- Responsive design (desktop-only)

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- NextAuth.js for authentication
- Vercel Postgres for database
- Framer Motion for animations

## Getting Started

1. Set up your environment variables:

   ```
   GITHUB_ID=your_github_oauth_app_client_id
   GITHUB_SECRET=your_github_oauth_app_client_secret
   NEXTAUTH_SECRET=random_string_for_token_hashing
   NEXTAUTH_URL=http://localhost:3000 (for local development)
   ```

2. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Main application pages and API routes
- `src/components`: Reusable React components
- `src/contexts`: React context providers
- `src/hooks`: Custom React hooks
- `src/lib`: Utility functions and shared logic
- `src/utils`: Helper functions

## Deployment

Deploy on Vercel:

1. Push your code to a GitHub repository.
2. Create a new project on Vercel and link it to your GitHub repository.
3. Set up environment variables in Vercel project settings.
4. Deploy the project.
5. Set up a Vercel Postgres database and connect it to your project.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](https://choosealicense.com/licenses/mit/)