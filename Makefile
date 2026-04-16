deploy-dev:
	ssh spar@chodiacidotaznik.xyz -t 'cd spar-frontend; git pull; npm install && npm run build && systemctl --user restart spar-frontend.service'