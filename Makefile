.DEFAULT_GOAL := help
.PHONY: docker-build docker-up build start log stop restart

DOCKER_COMPOSE=docker-compose -f docker-compose.yaml
DOCKER_COMPOSE_PROD=docker-compose -f docker-compose-prod.yaml
DOCKER_COMPOSE_TEST=docker-compose -f docker-compose-test.yaml
DOCKER_COMPOSE_DEV=docker-compose -f docker-compose-dev.yaml

# Docker
docker-build:
	$(DOCKER_COMPOSE) build

docker-build-prod:
	$(DOCKER_COMPOSE_PROD) build

docker-up:
	$(DOCKER_COMPOSE) up -d

docker-stop:
	$(DOCKER_COMPOSE) down

docker-stop-prod:
		$(DOCKER_COMPOSE_PROD) down

docker-stop-dev:
		$(DOCKER_COMPOSE_DEV) down

docker-clean:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) rm -fv

docker-start:
	$(DOCKER_COMPOSE) up -d --force-recreate

docker-start-prod:
	$(DOCKER_COMPOSE_PROD) up -d --force-recreate

docker-start-dev:
	make install
	$(DOCKER_COMPOSE_DEV) up -d --force-recreate

docker-restart: docker-start

log:
	$(DOCKER_COMPOSE) logs -f admin frontend middleware

log-prod:
	$(DOCKER_COMPOSE_PROD) logs -f admin frontend middleware traefik

start: docker-start

start-prod: docker-start-prod

start-dev: docker-start-dev

stop: docker-stop

stop-prod: docker-stop-prod

stop-dev: docker-stop-dev

restart: docker-restart

init :
	make install
	make bootstrap

install :
	sudo rm -rf client/node_modules/
	sudo rm -rf server/node_modules/
	cd ./client && make install
	cd ./server && make install

build:docker-build

build-prod: docker-build-prod

prettier:
	npm run prettier --prefix ./client
	npm run prettier --prefix ./server

clean:
	make server-clean

link:
	make client-link
	make server-link

link-yarn:
	make client-link-yarn
	make server-link-yarn

client-link:
	cd ./client && make link

server-link:
	cd ./server &&	make link

server-clean:
	cd ./server &&	make clean

client-link-yarn:
	cd ./client && 	make link-yarn

server-link-yarn:
	cd ./server && 	make link-yarn

unlink-yarn:
	make client-unlink-yarn
	make server-unlink-yarn

unlink:
	make client-unlink
	make server-unlink

client-unlink:
	cd ./client && 	make unlink

server-unlink:
	cd ./server &&	make unlink

client-unlink-yarn:
	cd ./client && make unlink-yarn

server-unlink-yarn:
	cd ./server && 	make unlink-yarn
# For tests we currently only need fuseki
test:
	$(DOCKER_COMPOSE_TEST) build
	$(DOCKER_COMPOSE_TEST) up -d
	npm run test --prefix ./src/middleware/tests/
	$(DOCKER_COMPOSE_TEST) down
