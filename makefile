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
	[ -h /$(1) ] && $(call poop,"Symlink to $(1) could not be cretaed")
endef
define createSymlink
	ln -s "/$(1)" "$(DIR)/$(1)" ||  $(call symlinkCreated,$(1)) || $(call ok,"Symlink to $(1) created")
endef

#define createInexistentAlias
#	$(BASHRCALIAS)
#endef

define createProjectAliasForCurrentUser
	echo $(NODEDIR)
	$(call createInexistentAlias, $(SERVERALIAS), "/$(NODEDIR)")
#	$(call createInexistentAlias, $(CLIENTALIAS), "/$(NGINXDIR)")
endef

install:
	echo $(NODEDIR)
	@$(call createSymlink,$(NODEDIR)) 
#	$(call createSymlink,$(NGINXDIR))
	@$(call createProjectAliasForCurrentUser)
	@exec bash
SILENT:install
