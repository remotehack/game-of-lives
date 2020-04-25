
echo "🥳 Generating /game"

# https://github.com/grpc/grpc/tree/v1.28.1/examples/node/static_codegen

mkdir -p game/generated

protoc \
  --js_out=import_style=commonjs,binary:./game/generated/ \
  --grpc_out=./game/generated --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  --plugin=protoc-gen-ts=./game/node_modules/.bin/protoc-gen-ts \
  --ts_out=./game/generated \
  service.proto


echo "🥰 Generating /js"

mkdir -p js/generated
protoc \
  --js_out=import_style=commonjs,binary:./js/generated/ \
  --grpc_out=./js/generated --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
  service.proto