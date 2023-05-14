sudo chmod +x ./*.sh
export ROOT=$(pwd)
export NODE_ENV=development
cd $ROOT/front-end && yarn && yarn dev
