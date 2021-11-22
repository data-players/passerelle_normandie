.DEFAULT_GOAL := help
.PHONY: link link-yarn unlink unlink-yarn
SEMAPPS_PATH=./../../semapps
PACKAGES=archipelago-layout semantic-data-provider auth-provider

install :
	yarn install --force

clean :
	sudo rm -rf node_modules

rollup :
	yarn --cwd $(SEMAPPS_PATH)/src/frontend/packages/archipelago-layout run dev &
	yarn --cwd $(SEMAPPS_PATH)/src/frontend/packages/semantic-data-provider run dev &
	yarn --cwd $(SEMAPPS_PATH)/src/frontend/packages/auth-provider run dev

link:
	$(foreach package,$(PACKAGES),$(call link-package,$(package)))
	nodemon -w $(SEMAPPS_PATH)/src/frontend/packages -x "make push"

push:
	$(foreach package,$(PACKAGES),$(call push-package,$(package)))

unlink:
	yalc installations clean
	yalc remove --all
	make install

define link-package
	yalc publish $(SEMAPPS_PATH)/src/frontend/packages/$(1);
	yalc link @semapps/$(1);
endef

define push-package
	yalc push $(SEMAPPS_PATH)/src/frontend/packages/$(1) --changed;
endef
