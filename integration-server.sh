#!/bin/bash
curl -O http:/192.168.50.11/images/pcserver.tar.gz
echo "Start load Dockerimage"
docker load -i pcserver.tar.gz
echo "Start load Dockerimage"
if [ ! "$(docker network ls | grep pcnetwork)" ]; then
  echo "Creating pcnetwork network ..."
  docker network create pcnetwork
else
  echo "pcnetwork network exists."
fi
echo "Network checked!"
echo "Docker container stop ..."
docker stop pcserver
echo "Docker container create ..."
docker run -p 8081:8081 --name="pcserver" --network="pcnetwork" -d pcserver
echo "Docker container running ..."
