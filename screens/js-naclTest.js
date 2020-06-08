import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, Alert } from 'react-native';

const nacl_factory = require("js-nacl");

nacl_factory.instantiate(function (nacl) {

    senderKeypair = nacl.crypto_box_keypair();
    recipientKeypair = nacl.crypto_box_keypair();
    message = nacl.encode_utf8("Hello!");

    nonce = nacl.crypto_box_random_nonce();
    packet = nacl.crypto_box(message, nonce, recipientKeypair.boxPk, senderKeypair.boxSk);

    decoded = nacl.crypto_box_open(packet, nonce, senderKeypair.boxPk, recipientKeypair.boxSk);

    "Hello!" === nacl.decode_utf8(decoded); // always true
    
    console.log(nacl.to_hex(nacl.random_bytes(16)));
});