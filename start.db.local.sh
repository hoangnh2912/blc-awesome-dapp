sudo chmod +x ./*.sh
export ROOT=$(pwd)
cd $ROOT/back-end && yarn && ssh -L 27017:localhost:27017 -i $ROOT/scimta.pem ubuntu@165.232.170.40
