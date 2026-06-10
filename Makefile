export UID := $(shell id -u)
export GID := $(shell id -g)

.PHONY=start
start:
	docker compose stop
	docker compose up -d
	docker compose logs -f frontend

.PHONY=stop
stop:
	docker compose stop
