.DEFAULT_GOAL := help
.PHONY: link link-yarn unlink unlink-yarn
SEMAPPS_PATH=./../../semapps


install :
	yarn install --force

rollup :
	yarn --cwd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout run dev &
	yarn --cwd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider run dev &
	yarn --cwd $(SEMAPPS_PATH)/src/frontend/packages/auth-provider run dev

link:
	cd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout && yarn link
	yarn link @semapps/archipelago-layout
	cd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider && yarn link
	yarn link @semapps/semantic-data-provider
	cd $(SEMAPPS_PATH)/src/frontend/packages/auth-provider && yarn link
	yarn link @semapps/auth-provider
	make rollup

unlink:
	yarn unlink @semapps/archipelago-layout --no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout && yarn unlink
	yarn unlink @semapps/semantic-data-provider --no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider && yarn unlink
	yarn unlink @semapps/auth-provider--no-save
	cd $(SEMAPPS_PATH)/src/frontend/packages/auth-provider && yarn unlink
	make install
