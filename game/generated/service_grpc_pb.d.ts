// package: 
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as service_pb from "./service_pb";

interface IgameOfLivesService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    solve: IgameOfLivesService_Isolve;
    watch: IgameOfLivesService_Iwatch;
    draw: IgameOfLivesService_Idraw;
}

interface IgameOfLivesService_Isolve extends grpc.MethodDefinition<service_pb.Board, service_pb.Board> {
    path: string; // "/.gameOfLives/solve"
    requestStream: boolean; // true
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<service_pb.Board>;
    requestDeserialize: grpc.deserialize<service_pb.Board>;
    responseSerialize: grpc.serialize<service_pb.Board>;
    responseDeserialize: grpc.deserialize<service_pb.Board>;
}
interface IgameOfLivesService_Iwatch extends grpc.MethodDefinition<service_pb.Noop, service_pb.Board> {
    path: string; // "/.gameOfLives/watch"
    requestStream: boolean; // false
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<service_pb.Noop>;
    requestDeserialize: grpc.deserialize<service_pb.Noop>;
    responseSerialize: grpc.serialize<service_pb.Board>;
    responseDeserialize: grpc.deserialize<service_pb.Board>;
}
interface IgameOfLivesService_Idraw extends grpc.MethodDefinition<service_pb.Pixel, service_pb.Noop> {
    path: string; // "/.gameOfLives/draw"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<service_pb.Pixel>;
    requestDeserialize: grpc.deserialize<service_pb.Pixel>;
    responseSerialize: grpc.serialize<service_pb.Noop>;
    responseDeserialize: grpc.deserialize<service_pb.Noop>;
}

export const gameOfLivesService: IgameOfLivesService;

export interface IgameOfLivesServer {
    solve: grpc.handleBidiStreamingCall<service_pb.Board, service_pb.Board>;
    watch: grpc.handleServerStreamingCall<service_pb.Noop, service_pb.Board>;
    draw: grpc.handleUnaryCall<service_pb.Pixel, service_pb.Noop>;
}

export interface IgameOfLivesClient {
    solve(): grpc.ClientDuplexStream<service_pb.Board, service_pb.Board>;
    solve(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.Board, service_pb.Board>;
    solve(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.Board, service_pb.Board>;
    watch(request: service_pb.Noop, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<service_pb.Board>;
    watch(request: service_pb.Noop, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<service_pb.Board>;
    draw(request: service_pb.Pixel, callback: (error: grpc.ServiceError | null, response: service_pb.Noop) => void): grpc.ClientUnaryCall;
    draw(request: service_pb.Pixel, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.Noop) => void): grpc.ClientUnaryCall;
    draw(request: service_pb.Pixel, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.Noop) => void): grpc.ClientUnaryCall;
}

export class gameOfLivesClient extends grpc.Client implements IgameOfLivesClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public solve(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.Board, service_pb.Board>;
    public solve(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<service_pb.Board, service_pb.Board>;
    public watch(request: service_pb.Noop, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<service_pb.Board>;
    public watch(request: service_pb.Noop, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<service_pb.Board>;
    public draw(request: service_pb.Pixel, callback: (error: grpc.ServiceError | null, response: service_pb.Noop) => void): grpc.ClientUnaryCall;
    public draw(request: service_pb.Pixel, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: service_pb.Noop) => void): grpc.ClientUnaryCall;
    public draw(request: service_pb.Pixel, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: service_pb.Noop) => void): grpc.ClientUnaryCall;
}
