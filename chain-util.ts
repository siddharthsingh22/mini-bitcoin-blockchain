const EC = require("elliptic").ec,
	ec = new EC("secp256k1"),
	// uuidV1 = require("uuid/v1"),
	SHA256 = require("crypto-js/sha256");

export class ChainUtil {
	static keyGen = () => {
		return ec.genKeyPair();
	};
	static id() {
		return "asdfasdf";
	}
	static hash(data) {
		return SHA256(JSON.stringify(data)).toString();
	}
	static verifySignature(publicKey, dataHash, signature) {
		return ec.keyFromPublic(publicKey, "hex").verify(dataHash, signature);
	}
}
export { }

// contains functions that may be needed by different modules. object is not created
