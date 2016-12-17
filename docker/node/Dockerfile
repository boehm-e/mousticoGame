FROM node:7.2

RUN echo "#!/bin/bash" >> /start.sh \
    && echo "/usr/local/bin/npm install" >> /start.sh \
    && echo "/usr/local/bin/npm run docker:run" >> /start.sh \
    && chmod +x /start.sh

EXPOSE 4242

WORKDIR /var/www/app

ENTRYPOINT ["/start.sh"]
