ifeq (,$(wildcard .env))
    $(error ".env file is missing")
endif
include .env

.PHONY: deploy-anvil
deploy-anvil:
	forge script script/PollToken.s.sol --rpc-url ${ANVIL_RPC_URL} --broadcast

.PHONY: getbal-anvil
getbal-anvil:
	forge script script/GetBalance.s.sol --rpc-url ${ANVIL_RPC_URL}

.PHONY: deploy-minato
deploy-minato:
	forge script script/PollToken.s.sol --rpc-url ${SONEIUM_RPC_URL} --broadcast
