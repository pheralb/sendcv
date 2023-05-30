## 👋 Introduction

[**Sendcv**](https://sendcv.vercel.app) is a web app to explore jobs and create a beautiful profiles with your projects, social networks and experience. Inspired by [read.cv](https://read.cv/) ✨.

## ✨ Features

- Explore & save offers using Infojobs API.
- Create a beautiful profile with your description, experience, projects & social networks.
- CMDK to navigate between pages.
- Light/dark theme.

## 🤔 Known issues

- [ ] Search job offers / users from the CMDK modal ([route](https://github.com/pheralb/sendcv/blob/main/src/components/search/index.tsx#L63)).
- [ ] Button to change the light/dark mode on the main sidebar. Server/client side rendering ([route](https://github.com/pheralb/sendcv/blob/main/src/components/changeTheme.tsx#L13)).
- [ ] Sometimes it does not show the tooltip in the sidebar ([route](https://github.com/pheralb/sendcv/blob/main/src/components/mainSidebar/sidebarItem.tsx#L20)).

## ⚙️ Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app):

- [**Next.js 13 /app directory** + Typescript](https://nextjs.org/) - The React Framework for the Web.
- [**Prisma**](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM.
- [**Planetscale**](https://planetscale.com/) - The world’s most advanced serverless MySQL platform.
- [**Next-Auth**](https://next-auth.js.org/) - Authentication for Next.js.
- [**Next-Themes**](https://github.com/pacocoursey/next-themes) - Perfect Next.js dark mode in 2 lines of code.
- [**@t3-oss/env-nextjs**](https://env.t3.gg/) - Framework agnostic validation for type-safe environment variables.
- [**Zod**](https://zod.dev/) - TypeScript-first schema validation with static type inference.
- [**React Hook Form**](https://react-hook-form.com/) - Performant, flexible and extensible forms with easy-to-use validation.
- [**Prettier** + **prettier-plugin-tailwindcss**](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) - A Prettier plugin for Tailwind CSS that automatically sorts classes based on our recommended class order.
- [**Tailwind CSS** + **Tailwind Merge** + **clsx**](https://github.com/dcastil/tailwind-merge) - Merge Tailwind CSS classes without style conflicts.
- [**shadcn/ui** components using **Radix UI** + **Class Variance Authority**](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.
- [**Lucide icons**](https://lucide.dev/) - Beautiful & consistent icon toolkit made by the community.
- [**Sonner**](https://sonner.emilkowal.ski/) - An opinionated toast component for React.

## 🚀 Getting Started

To get a local copy up and running, please follow these simple steps:

**Recommended extensions** for Visual Studio Code:

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss).
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma).
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

**Setup development server**:

1. Clone or [fork](https://github.com/pheralb/sendcv/fork) the repository:

```bash
git@github.com:pheralb/sendcv.git
```

2. Go to the project folder:

```bash
cd sendcv
```

3. Install the dependencies with your favorite package manager:

```bash
# with npm:
npm install

# with pnpm:
pnpm install
pnpm postinstall

# with yarn:
yarn install
```

**Setup environment variables**:

Create a `.env` file in the root folder of the project with the following variables:

```env
# Prisma:
DATABASE_URL=""

# Next Auth:
NEXTAUTH_SECRET="" // Generate a random string.
NEXTAUTH_URL="" // http://localhost:3000/

# Github OAuth Provider:
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Infojobs Credentials:
INFOJOBS_CLIENT_ID=""
INFOJOBS_CLIENT_SECRET=""
INFOJOBS_TOKEN=""
```

- [`DATABASE_URL`](https://planetscale.com/docs/tutorials/connect-nextjs-app#generate-a-connection-string) - Planetscale docs.
- [`GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) - Github OAuth docs.
- [`INFOJOBS_CLIENT_ID` & `INFOJOBS_CLIENT_SECRET`](https://developer.infojobs.net/app/manage-app/create.xhtml) - Create an app on Infojobs.
- [`INFOJOBS_TOKEN`](https://developer.infojobs.net/documentation/app-auth/index.xhtml) - In the _client credentials_ section, enter the INFOJOBS_CLIENT_ID and the INFOJOBS_CLIENT_SECRET.

**Open development server**:

1. Run to open the Next.js development server:

```bash
# with npm:
npm run dev

# with pnpm:
pnpm dev

# with yarn:
yarn dev
```

2. Run to open Prisma Studio:

```bash
# with npm:
npm run studio

# with pnpm:
pnpm studio

# with yarn:
yarn studio
```

## 📝 License

- Distributed under the Apache License 2.0. See [`LICENSE`](https://github.com/pheralb/sendcv/blob/main/LICENSE).
