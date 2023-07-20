FROM arm64v8/node:18
#Para arquitectura x86
#FROM node:18
LABEL mantainer="ADIEZ"

RUN mkdir /360VR-server
COPY package.json 360VR-server
COPY tsconfig.json 360VR-server
WORKDIR /360VR-server

RUN npm install
RUN mkdir src
COPY src/ src

RUN mkdir scripts
COPY scripts/ scripts

EXPOSE 3443 3080
CMD ["npm", "run", "start"]