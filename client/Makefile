.DEFAULT_GOAL := help
.PHONY: link link-yarn unlink unlink-yarn
SEMAPPS_PATH=./../../semapps


install :
	npm install --force

rollup :
	npm run dev --prefix $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout &
	npm run dev --prefix $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider &
	npm run dev --prefix $(SEMAPPS_PATH)/src/frontend/packages/auth-provider

link:
	cd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout && yarn link
	yarn link @semapps/archipelago-layout
	cd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider && yarn link
	yarn link @semapps/semantic-data-provider
	cd $(SEMAPPS_PATH)/src/frontend/packages/auth-provider && yarn link
	yarn link @semapps/auth-provider

unlink:
	yarn unlink @semapps/archipelago-layout --no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout && yarn unlink
	yarn unlink @semapps/semantic-data-provider --no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider && yarn unlink
	yarn unlink @semapps/auth-provider--no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/auth-provider && yarn unlink
	make install
