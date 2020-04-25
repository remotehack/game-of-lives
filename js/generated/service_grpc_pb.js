// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var service_pb = require('./service_pb.js');

function serialize_Board(arg) {
  if (!(arg instanceof service_pb.Board)) {
    throw new Error('Expected argument of type Board');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Board(buffer_arg) {
  return service_pb.Board.deserializeBinary(new Uint8Array(buffer_arg));
}

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


var gameOfLivesService = exports.gameOfLivesService = {
  // clients would solve using this
  solve: {
    path: '/gameOfLives/solve',
    requestStream: true,
    responseStream: true,
    requestType: service_pb.Board,
    responseType: service_pb.Board,
    requestSerialize: serialize_Board,
    requestDeserialize: deserialize_Board,
    responseSerialize: serialize_Board,
    responseDeserialize: deserialize_Board,
  },
  // for showing a frontend
  watch: {
    path: '/gameOfLives/watch',
    requestStream: false,
    responseStream: true,
    requestType: service_pb.Noop,
    responseType: service_pb.Board,
    requestSerialize: serialize_Noop,
    requestDeserialize: deserialize_Noop,
    responseSerialize: serialize_Board,
    responseDeserialize: deserialize_Board,
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
