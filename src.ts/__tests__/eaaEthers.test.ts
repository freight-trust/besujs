import * as privateEthers from '../index'
import {UnsignedTransaction} from '../transactions'

describe('EEA Ethers', () => {

    test('init', ()=> {
        expect(privateEthers).toBeDefined()
        expect(privateEthers.utils).toBeDefined()
        expect(privateEthers.utils.serialize).toBeInstanceOf(Function)
        expect(privateEthers.utils.encode).toBeInstanceOf(Function)
    })

    test('sign transaction matches EEA client', async() => {

        // fe3b557e8fb62b89f4916b721be55ceb828dbd73
        const privateKey = '0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63'
        let wallet = new privateEthers.Wallet(privateKey)

        const eeaSignedRlpEncoded = '0xf903378080832dc6c08080b90281608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610221806100606000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f2451461005c5780636057361d1461008757806367e404ce146100b4575b600080fd5b34801561006857600080fd5b5061007161010b565b6040518082815260200191505060405180910390f35b34801561009357600080fd5b506100b260048036038101908080359060200190929190505050610115565b005b3480156100c057600080fd5b506100c96101cb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600254905090565b7fc9db20adedc6cf2b5d25252b101ab03e124902a73fcb12b753f3d1aaa2d8f9f53382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a18060028190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050905600a165627a7a723058208efaf938851fb2d235f8bf9a9685f149129a30fe0f4b20a6c1885dc02f639eba0029820fe8a0c6ed0b2b08e0e65bdda3a239e546e215e62dd15086d3b2c3fc1d6996d47a71bea065b30e766ab58eca8dd758d9e05cf2d98536c68b9ab1607bc2a1d7ef37bd279cac41316156744d784c4355486d425648586f5a7a7a42675062572f776a3561784470573958386c393153476f3dedac4b6f32625671442b6e4e6c4e594c35454537793349644f6e766966746a69697a706a52742b4854754642733d8a72657374726963746564'

        // deploy a contract
        const unsignedTransaction: UnsignedTransaction = {
            nonce: 0,
            data: '0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610221806100606000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680633fa4f2451461005c5780636057361d1461008757806367e404ce146100b4575b600080fd5b34801561006857600080fd5b5061007161010b565b6040518082815260200191505060405180910390f35b34801561009357600080fd5b506100b260048036038101908080359060200190929190505050610115565b005b3480156100c057600080fd5b506100c96101cb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6000600254905090565b7fc9db20adedc6cf2b5d25252b101ab03e124902a73fcb12b753f3d1aaa2d8f9f53382604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a18060028190555033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050905600a165627a7a723058208efaf938851fb2d235f8bf9a9685f149129a30fe0f4b20a6c1885dc02f639eba0029',
            value: 0,
            gasPrice: 0,
            gasLimit: 3000000,
            chainId: 2018,
            privateFrom: 'A1aVtMxLCUHmBVHXoZzzBgPbW/wj5axDpW9X8l91SGo=',
            privateFor: ['Ko2bVqD+nNlNYL5EE7y3IdOnviftjiizpjRt+HTuFBs='],
            restriction: 'restricted',
        }

        let signedTransaction = await wallet.signTransaction(unsignedTransaction)

        expect(signedTransaction).toEqual(eeaSignedRlpEncoded)
    })
})