.DEFAULT_GOAL := help
.PHONY: docker-build docker-up build start log stop restart

DOCKER_COMPOSE=docker-compose -f docker-compose.yaml
DOCKER_COMPOSE_PROD=docker-compose -f docker-compose-prod.yaml
DOCKER_COMPOSE_TEST=docker-compose -f docker-compose-test.yaml

# Docker
docker-build:
	$(DOCKER_COMPOSE) build

docker-build-prod:
	$(DOCKER_COMPOSE_PROD) build

docker-up:
	$(DOCKER_COMPOSE) up -d

docker-stop:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) rm -fv

docker-stop-prod:
		$(DOCKER_COMPOSE_PROD) kill
		$(DOCKER_COMPOSE_PROD) rm -fv

docker-clean:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) rm -fv

docker-start:
	$(DOCKER_COMPOSE) up -d --force-recreate

docker-start-prod:
	$(DOCKER_COMPOSE_PROD) up -d --force-recreate

docker-restart:
	$(DOCKER_COMPOSE) up -d --force-recreate

log:
	$(DOCKER_COMPOSE) logs -f middleware frontend admin fuseki traefik

log-prod:
	$(DOCKER_COMPOSE_PROD) logs -f admin frontend traefik

start: docker-start

start-prod: docker-start-prod

stop: docker-stop

stop-prod: docker-stop-prod

restart: docker-restart

init :
	make install
	make bootstrap

install :
	npm install --prefix ./client
	npm install --prefix ./server

build:docker-build

build-prod: docker-build-prod

prettier:
	npm run prettier --prefix ./client
	npm run prettier --prefix ./server

bootstrap:
	npm run bootstrap --prefix ./client
	npm run bootstrap --prefix ./server

# For tests we currently only need fuseki
test:
	$(DOCKER_COMPOSE_TEST) build
	$(DOCKER_COMPOSE_TEST) up -d
	npm run test --prefix ./src/middleware/tests/
	$(DOCKER_COMPOSE_TEST) down
