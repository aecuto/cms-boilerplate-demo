docker network create api_network
docker stack deploy -c docker-database.yml database
docker stack deploy -c docker-stack.yml backend --with-registry-auth 