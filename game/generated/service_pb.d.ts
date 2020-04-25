// package: 
// file: service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Board extends jspb.Message { 
    clearPixelsList(): void;
    getPixelsList(): Array<Pixel>;
    setPixelsList(value: Array<Pixel>): void;
    addPixels(value?: Pixel, index?: number): Pixel;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Board.AsObject;
    static toObject(includeInstance: boolean, msg: Board): Board.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Board, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Board;
    static deserializeBinaryFromReader(message: Board, reader: jspb.BinaryReader): Board;
}

export namespace Board {
    export type AsObject = {
        pixelsList: Array<Pixel.AsObject>,
    }
}

export class Pixel extends jspb.Message { 
    getX(): number;
    setX(value: number): void;

    getY(): number;
    setY(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Pixel.AsObject;
    static toObject(includeInstance: boolean, msg: Pixel): Pixel.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Pixel, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Pixel;
    static deserializeBinaryFromReader(message: Pixel, reader: jspb.BinaryReader): Pixel;
}

export namespace Pixel {
    export type AsObject = {
        x: number,
        y: number,
    }
}

export class Noop extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Noop.AsObject;
    static toObject(includeInstance: boolean, msg: Noop): Noop.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Noop, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Noop;
    static deserializeBinaryFromReader(message: Noop, reader: jspb.BinaryReader): Noop;
}

export namespace Noop {
    export type AsObject = {
    }
}
