This is the backend api server for a simple Referral page.
Built using ExpressJS and PrismaORM

## Prerequisites

You need a mysql server & a gmail account you'll send emails from.

## Getting Started

*Note: Use pnpm*

First, install dependencies

```bash
pnpm i
```

Next, create a .env file and add the following variables

```bash
DATABASE_URL = # Your mysql database url
SENDER_EMAIL = # Gmail id that you'll use to send emails from
SENDER_EMAIL_PASSWORD = # Your gmail password. You may need to generate application password from Gmail.
```

Now you can run the development server using nodemon

```bash
nodemon
```

## Contact

Report any errors or suggestions to hassansajid.dev@gmail.com
