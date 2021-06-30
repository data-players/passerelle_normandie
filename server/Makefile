.DEFAULT_GOAL := help
.PHONY: link link-yarn unlink unlink-yarn
SEMAPPS_PATH=./../../semapps


install :
	npm install --force

link:

link-yarn:
	cd $(SEMAPPS_PATH)/src/middleware/packages/webid && yarn link
	yarn link @semapps/webid
	cd $(SEMAPPS_PATH)/src/middleware/packages/auth && yarn link
	yarn link @semapps/auth
	cd $(SEMAPPS_PATH)/src/middleware/packages/inference && yarn link
	yarn link @semapps/inference


unlink:

unlink-yarn:
	yarn unlink @semapps/webid --no-save
	cd $(SEMAPPS_PATH)/src/middleware/packages/webid && yarn unlink
	yarn unlink @semapps/auth --no-save
	cd $(SEMAPPS_PATH)/src/middleware/packages/auth && yarn unlink
	yarn unlink @semapps/inference --no-save
	cd $(SEMAPPS_PATH)/src/middleware/packages/inference && yarn unlink
