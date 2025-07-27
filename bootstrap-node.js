import { createLibp2p } from 'libp2p';
import { webSockets } from '@libp2p/websockets';
import { kadDHT } from '@libp2p/kad-dht';
import { noise } from '@libp2p/noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { identify } from '@libp2p/identify'; // ✅ added before
import { ping } from '@libp2p/ping';         // ✅ add this
import { createFromJSON } from '@libp2p/peer-id-factory';
import fs from 'fs';

const peerIdJson = JSON.parse(fs.readFileSync('peer-id.json', 'utf-8'));
const peerId = await createFromJSON(peerIdJson);

const node = await createLibp2p({
  peerId,
  addresses: {
    listen: ['/ip4/0.0.0.0/tcp/15001/ws'],
  },
  transports: [webSockets()],
  connectionEncryption: [noise()],
  streamMuxers: [yamux()],
  services: {
    identify: identify(),
    ping: ping(),           // ✅ add this
    dht: kadDHT({ enabled: true }),
  },
});

await node.start();

console.log('✅ Bootstrap node is live!');
node.getMultiaddrs().forEach((addr) =>
  console.log(`${addr.toString()}/p2p/${node.peerId.toString()}`)
);
