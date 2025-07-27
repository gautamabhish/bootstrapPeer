const PeerId = require('peer-id');
const fs = require('fs');

PeerId.create({ keyType: 'Ed25519' }).then((peerId) => {
  const json = peerId.toJSON();
  fs.writeFileSync('peer-id.json', JSON.stringify(json, null, 2));
  console.log('✅ peer-id.json saved');
  console.log('Peer ID:', peerId.toB58String());
});
