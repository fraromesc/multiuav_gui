'use strict';
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, '__esModule', { value: true });
exports.eventService = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require('flatbuffers');
var msg_metadata_js_1 = require('../../fb/msg-metadata.cjs');
var event_request_js_1 = require('../../fb/aerialcore-common/event-request.cjs');
var event_response_js_1 = require('../../fb/aerialcore-common/event-response.cjs');
var eventService = /** @class */ (function () {
  function eventService() {
    this.bb = null;
    this.bb_pos = 0;
  }
  eventService.prototype.__init = function (i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  };
  eventService.getRootAseventService = function (bb, obj) {
    return (obj || new eventService()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  };
  eventService.getSizePrefixedRootAseventService = function (bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new eventService()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  };
  eventService.prototype._Metadata = function (obj) {
    var offset = this.bb.__offset(this.bb_pos, 4);
    return offset
      ? (obj || new msg_metadata_js_1.MsgMetadata()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb)
      : null;
  };
  eventService.prototype.request = function (obj) {
    var offset = this.bb.__offset(this.bb_pos, 6);
    return offset
      ? (obj || new event_request_js_1.eventRequest()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb)
      : null;
  };
  eventService.prototype.response = function (obj) {
    var offset = this.bb.__offset(this.bb_pos, 8);
    return offset
      ? (obj || new event_response_js_1.eventResponse()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb)
      : null;
  };
  eventService.starteventService = function (builder) {
    builder.startObject(3);
  };
  eventService.add_Metadata = function (builder, _MetadataOffset) {
    builder.addFieldOffset(0, _MetadataOffset, 0);
  };
  eventService.addRequest = function (builder, requestOffset) {
    builder.addFieldOffset(1, requestOffset, 0);
  };
  eventService.addResponse = function (builder, responseOffset) {
    builder.addFieldOffset(2, responseOffset, 0);
  };
  eventService.endeventService = function (builder) {
    var offset = builder.endObject();
    return offset;
  };
  return eventService;
})();
exports.eventService = eventService;
