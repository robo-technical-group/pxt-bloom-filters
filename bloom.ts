interface BloomFilter {
    n: number,
    m: number,
    k: number,
    p: string,
    prob: number,
    aValues: string[],
    bValues: string[],
    filter: string,
}

//% fixedInstances
//% blockNamespace=WordLists
class Bloom {
    private _filters: BloomFilter[]
    constructor(filters: BloomFilter[]) {
        this._filters = filters
    }

    public static fromFilterSet(filters: BloomFilter[]): Bloom {
        return new Bloom(filters)
    }

    public findWord(word: string): boolean {
        if (this._filters == null) { return false }
        if (!this._filters[word.length]) { return false }
        const value: BigNum.BigInt = this.getWordValue(word)
        const k: number = this._filters[word.length].k
        for (let i: number = 0; i < k; i++) {
            if (!this.getFilterBit(this.getHashForWordValue(value, word.length, i), word.length)) {
                return false
            }
        }
        return true
    }

    protected getFilterBit(location: number, wordLength: number): boolean {
        const blockNum: number = Math.floor(location / 24)
        const byteNum: number = Math.floor((location % 24) / 8)
        const bitNum: number = location % 8
        const block: string = this._filters[wordLength].filter.substr(blockNum * 4, 4)
        const byte: number = Buffer.fromBase64(block).getUint8(byteNum)
        return (byte & (1 << bitNum)) != 0
    }

    protected getHashForWord(word: string, hash: number) {
        return this.getHashForWordValue(this.getWordValue(word), word.length, hash)
    }

    protected getHashForWordValue(value: BigNum.BigInt, wordLength: number, hash: number): number {
        const a: BigNum.BigInt = BigNum.CreateBigInt(this._filters[wordLength].aValues[hash])
        const b: BigNum.BigInt = BigNum.CreateBigInt(this._filters[wordLength].bValues[hash])
        const p: BigNum.BigInt = BigNum.CreateBigInt(this._filters[wordLength].p)
        const m: BigNum.BigInt = BigNum.CreateBigInt(this._filters[wordLength].m)
        // r = ax + b % p % m
        let r: BigNum.BigInt = a.multiply(value).add(b).mod(p).mod(m)
        return r.toNumber()
    }

    protected getWordValue(word: string): BigNum.BigInt {
        const ucWord: string = word.toUpperCase()
        let toReturn: BigNum.BigInt = BigNum.CreateBigInt(0)
        for (let c of ucWord) {
            // toReturn = (toReturn << 5) + c.charCodeAt(0) - 'A'.charCodeAt(0)
            toReturn = toReturn.leftShift(5).add(c.charCodeAt(0)).subtract('A'.charCodeAt(0))
        }
        return toReturn.length == 0 ? BigNum.CreateBigInt(1) : toReturn
    }
}

