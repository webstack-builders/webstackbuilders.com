# We use this dockerfile to build a packed tarfile which we import in our `docker` tests
# @TODO: Set up the Dockerfile
FROM node:current
COPY . /web/src
WORKDIR /build
RUN npm ci
RUN npm pack .
