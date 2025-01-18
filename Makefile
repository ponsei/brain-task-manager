DOCKER_COMPOSE_VERSION_CHECKER := $(shell docker compose > /dev/null 2>&1 ; echo $$?)
ifeq ($(DOCKER_COMPOSE_VERSION_CHECKER), 0)
DOCKER_COMPOSE_IMPL=docker compose
else
DOCKER_COMPOSE_IMPL=docker-compose
endif

.PHONY: up
up:
	$(DOCKER_COMPOSE_IMPL) up -d

.PHONY: stop
stop:
	$(DOCKER_COMPOSE_IMPL) stop

.PHONY: down/d
down/d:
	$(DOCKER_COMPOSE_IMPL) down

.PHONY: down/d/all
down/d/all:
	$(DOCKER_COMPOSE_IMPL) down --rmi all --volumes --remove-orphans

.PHONY: rebuild/d
rebuild/d:
	$(MAKE) down/d
	$(MAKE) up

.PHONY: logs
logs:
	$(DOCKER_COMPOSE_IMPL) logs -f

.PHONY: login
login:
	$(DOCKER_COMPOSE_IMPL) exec app /bin/sh

.PHONY: test
test:
	$(DOCKER_COMPOSE_IMPL) exec app yarn run test

.PHONY: fmt
fmt:
ifdef CI
	yarn run prettier . --check
else
	$(DOCKER_COMPOSE_IMPL) exec app yarn run prettier . --write
endif

.PHONY: lint
lint:
ifdef CI
	yarn run eslint src
else
	$(DOCKER_COMPOSE_IMPL) exec app yarn run eslint src
endif

.PHONY: typecheck
typecheck: TSC_OPTS=
typecheck:
ifdef CI
	yarn run tsc $(TSC_OPTS)
else
	$(DOCKER_COMPOSE_IMPL) exec app yarn run tsc $(TSC_OPTS)
endif

.PHONY: ci
ci:
	@echo "fmt\n------------------"
	$(MAKE) fmt
	@echo "lint\n------------------"
	$(MAKE) lint
	@echo "type check\n------------------"
	$(MAKE) typecheck

.PHONY: install
install:
ifdef CI
	yarn install
else
	$(DOCKER_COMPOSE_IMPL) exec app yarn install
endif

.PHONY: build
build:
ifdef CI
	yarn run build
else
	$(DOCKER_COMPOSE_IMPL) exec app yarn run build
endif

# help command shows all commands in English
.PHONY: help
help:
	@echo "Usage: make [command]"
	@echo ""
	@echo "Commands:"
	@echo "  up              Start the application"
	@echo "  stop            Stop the application"
	@echo "  down/d          Stop and remove containers"
	@echo "  down/d/all      Stop and remove containers, networks, volumes, and images"
	@echo "  logs            Show logs"
	@echo "  login           Login to the app container"
	@echo "  test            Run tests"
	@echo "  fmt             Format code"
	@echo "  lint            Lint code"
	@echo "  typecheck       Type check code"
	@echo "  ci              Run all CI checks"
	@echo "  build           Build the application"
	@echo "  help            Show this help message"

# help/ja command shows all commands in Japanese
.PHONY: help/ja
help/ja:
	@echo "使い方: make [command]"
	@echo ""
	@echo "コマンド:"
	@echo "  up              アプリケーションを起動します"
	@echo "  stop            アプリケーションを停止します"
	@echo "  down/d          コンテナを停止して削除します"
	@echo "  down/d/all      コンテナ、ネットワーク、ボリューム、イメージを停止して削除します"
	@echo "  logs            ログを表示します"
	@echo "  login           アプリケーションコンテナにログインします"
	@echo "  test            テストを実行します"
	@echo "  fmt             コードをフォーマットします"
	@echo "  lint            コードをリントします"
	@echo "  typecheck       コードを型チェックします"
	@echo "  ci              すべてのCIチェックを実行します"
	@echo "  build           アプリケーションをビルドします"
	@echo "  help            このヘルプメッセージを表示します"