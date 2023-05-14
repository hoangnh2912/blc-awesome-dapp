sudo chmod +x ./*.sh
export ROOT=$(pwd)
cd $ROOT/back-end && yarn && yarn build && yarn dev
