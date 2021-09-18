.DEFAULT_GOAL := help
.PHONY: link unlink install push allo
SEMAPPS_PATH=./../../semapps
PACKAGES=jsonld inference auth webid ldp middlewares


clean :
	sudo rm -rf .yalc
	sudo rm -rf node_modules


install :
	rm -f yarn.lock
	rm -f yarn-error.log
	yarn install

link:
	$(foreach package,$(PACKAGES),$(call link-package,$(package)))
	nodemon -w $(SEMAPPS_PATH)/src/middleware/packages -x "make push";

push:
	$(foreach package,$(PACKAGES),$(call push-package,$(package)))

unlink:
	yalc installations clean
	yalc remove --all
	make install

define link-package
	yalc publish $(SEMAPPS_PATH)/src/middleware/packages/$(1);
	yalc link @semapps/$(1);
endef

define push-package
	yalc push $(SEMAPPS_PATH)/src/middleware/packages/$(1) --changed;
endef
