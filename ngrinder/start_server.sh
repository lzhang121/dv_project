docker run -d -v ~/ngrinder-controller:/opt/ngrinder-controller  --platform linux/amd64 --name controller -p 8083:80 -p 16001:16001 -p 12000-12009:12000-12009 ngrinder/controller

