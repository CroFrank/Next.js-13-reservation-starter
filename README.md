## About

In this app you can check in European format calendar if some date is avaliable.

When you pick a date you are sending request to server _(/api/serach/route.ts)_
that will check in database if that date is available.

If not you will be notified about that and you can try with another date.

When you find avaliable date you can make reservation by sending POST request
to the server _(/api/reservation/route.ts)_ with basic info (name, email, phone).

After that, date you made reservation for is no longer available.

## Techs

> - Framework - Next.js v13<br />
> - Language - TypeScript<br />
> - Database - Postgres<br />
> - ORM - Prisma<br />
> - Hosting - Vercel<br />
> - Styling - TailwindCSS

## Extra

I was using Docker or Vercel storage for postgres db location you can pick your own
and don't forget to set .env variable DATABASE_URL=''

This code is my first version so I still didn't add backend validation (I will use zod)
and project structure may not be best but it can help you out as an idea of how to do
some reservation logic.
