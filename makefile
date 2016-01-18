#configuration for ths prject
PROJNAME:=dualnohm
#used in all my projects 
#todo: split this part
DIR:=${CURDIR}
NODEPATH:=usr/share/node/
NGINXPATH:=usr/share/nginx/
NODEDIR:=$(NODEPATH)$(PROJNAME)
#NGINXDIR:=$(NGINXPATH)$(PROJNAME)
SERVERALIAS:=$(PROJNAME)Server
CLIENTALIAS:=$(PROJNAME)Client
define createInexistentAlias 
	grep $1 ~/.bashrc\
	|| echo "alias $1='cd $2'">>~/.bashrc\
	&& $(call ok, "Alias $1 created successfully")
endef
define poop
	echo -e "\e[41m ABORTING \e[0m  $1"
endef
define ok
	echo -e "\e[42m 0K \e[0m $1"
endef
define  nah
	echo -e "\e[43m Warn \e[0m $1"
endef
define symlinkCreated
	[ -h /$(1) ] && $(call ok,"Symlink to $(1) already cretaed")
endef

define createSymlink
	$(call symlinkCreated,$(1))
	[ -h /$(1) ] || ln -s "$(DIR)/$(1)" "/$(1)" 
	[ -h /$(1) ] ||  $(call poop,"Symlink to $(1) could not be cretaed")

endef


define createProjectAliasForCurrentUser
	$(call createInexistentAlias, $(SERVERALIAS), "/$(NODEDIR)")
#	$(call createInexistentAlias, $(CLIENTALIAS), "/$(NGINXDIR)")
endef

install:
	@$(call createSymlink,$(NODEDIR)) 
#	$(call createSymlink,$(NGINXDIR))
	@$(call createProjectAliasForCurrentUser)
#       since sourcing wouldn't work
	@exec bash
SILENT:install
