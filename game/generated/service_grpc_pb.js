// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var service_pb = require('./service_pb.js');

function serialize_Noop(arg) {
  if (!(arg instanceof service_pb.Noop)) {
    throw new Error('Expected argument of type Noop');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Noop(buffer_arg) {
  return service_pb.Noop.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Pixel(arg) {
  if (!(arg instanceof service_pb.Pixel)) {
    throw new Error('Expected argument of type Pixel');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Pixel(buffer_arg) {
  return service_pb.Pixel.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Tile(arg) {
  if (!(arg instanceof service_pb.Tile)) {
    throw new Error('Expected argument of type Tile');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Tile(buffer_arg) {
  return service_pb.Tile.deserializeBinary(new Uint8Array(buffer_arg));
}


var gameOfLivesService = exports.gameOfLivesService = {
  // clients would solve using this
  solve: {
    path: '/gameOfLives/solve',
    requestStream: true,
    responseStream: true,
    requestType: service_pb.Tile,
    responseType: service_pb.Tile,
    requestSerialize: serialize_Tile,
    requestDeserialize: deserialize_Tile,
    responseSerialize: serialize_Tile,
    responseDeserialize: deserialize_Tile,
  },
  // for showing a frontend
  watch: {
    path: '/gameOfLives/watch',
    requestStream: false,
    responseStream: true,
    requestType: service_pb.Noop,
    responseType: service_pb.Tile,
    requestSerialize: serialize_Noop,
    requestDeserialize: deserialize_Noop,
    responseSerialize: serialize_Tile,
    responseDeserialize: deserialize_Tile,
  },
  // for adding content
  draw: {
    path: '/gameOfLives/draw',
    requestStream: false,
    responseStream: false,
    requestType: service_pb.Pixel,
    responseType: service_pb.Noop,
    requestSerialize: serialize_Pixel,
    requestDeserialize: deserialize_Pixel,
    responseSerialize: serialize_Noop,
    responseDeserialize: deserialize_Noop,
  },
};

exports.gameOfLivesClient = grpc.makeGenericClientConstructor(gameOfLivesService);
