.DEFAULT_GOAL := help
.PHONY: link link-yarn unlink unlink-yarn
SEMAPPS_PATH=./../../semapps


install :
	npm install --force

link:


link-yarn:
	cd $(SEMAPPS_PATH)/src/middleware/packages/connector && yarn link
	yarn link @semapps/connector
	cd $(SEMAPPS_PATH)/src/middleware/packages/webid && yarn link
	yarn link @semapps/webid


unlink:


unlink-yarn:
	yarn unlink @semapps/connector --no-save
	cd $(SEMAPPS_PATH)/src/middleware/packages/connector && yarn unlink
	yarn unlink @semapps/webid --no-save
	cd $(SEMAPPS_PATH)/src/middleware/packages/webid && yarn unlink
