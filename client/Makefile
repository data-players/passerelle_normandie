.DEFAULT_GOAL := help
.PHONY: link link-yarn unlink unlink-yarn
SEMAPPS_PATH=./../../semapps


install :
	npm install --force

rollup :
	npm run dev --prefix $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout &
	npm run dev --prefix $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider 

link:
	cd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout && npm link
	npm link @semapps/archipelago-layout
	cd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider && npm link
	npm link @semapps/semantic-data-provider

link-yarn:
	cd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout && yarn link
	yarn link @semapps/archipelago-layout
	cd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider && yarn link
	yarn link @semapps/semantic-data-provider

unlink:
	npm unlink @semapps/archipelago-layout --no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout && npm unlink
	npm unlink @semapps/semantic-data-provider --no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider && npm unlink
	make install

unlink-yarn:
	yarn unlink @semapps/archipelago-layout --no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout && yarn unlink
	yarn unlink @semapps/semantic-data-provider --no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider && yarn unlink
	make install
