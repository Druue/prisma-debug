# local_debug

Run the following command

    docker compose up -d mysql-5-7 && \
    npx prisma format && \
    npx prisma db push --force-reset && \
    npm run test && \
    docker compose down
