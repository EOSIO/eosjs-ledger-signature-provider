import { Signature } from 'eosjs/dist/eosjs-jssig'
import { convertSignatures } from './LedgerUtils'

const mockedConvertedSignatureValue = 'mockedConvertedSignatureValue'

describe('JsSignatureProvider', () => {
  it('should not convert signature given string with length < 130 characters', async () => {
    const signature = 'someSignature'
    const result = convertSignatures([signature], mockConvertSignature)

    expect(result[0]).toBe(signature)
  })

  it('should not convert signature given string with length > 130 characters', async () => {
    const signature = '4cf0909aa10f10341cd7ca013630492d09b65e50c80974e962d94bbc95df635e90afb2e4dd22eb254cb451ca26a6aeb0b88e9b031a2233b2a16d56252dba83f9632-more-than-130-characters'
    const result = convertSignatures([signature], mockConvertSignature)

    expect(result[0]).toBe(signature)
  })

  it('should convert signature given string with length === 130 characters', () => {
    const signature = 'SIG_K1_HKkqi3zray76i63ZQwAHWMjoLk3wTa1ajZWPcUnrhgmSWQYEHDJsxkny6VDTWEmVdfktxpGoTA81qe6QuCrDmazeQndmxhktxpGoTA81qe6QuCrDmazeQndmxhD'
    const result = convertSignatures([signature], mockConvertSignature)

    expect(result[0]).toBe(mockedConvertedSignatureValue)
  })

  it('should convert signature given string with length === 130 characters, but not another signature with length < 130 characters', () => {
    const signature1 = 'SIG_K1_HKkqi3zray76i63ZQwAHWMjoLk3wTa1ajZWPcUnrhgmSWQYEHDJsxkny6VDTWEmVdfktxpGoTA81qe6QuCrDmazeQndmxhktxpGoTA81qe6QuCrDmazeQndmxhD'
    const signature2 = 'someSignature'
    const result = convertSignatures([signature1, signature2], mockConvertSignature)

    expect(result[0]).toBe(mockedConvertedSignatureValue)
    expect(result[1]).toBe(signature2)
  })

  it('should convert signature given string with length === 130 characters, but not another signature with length > 130 characters', () => {
    const signature1 = 'SIG_K1_HKkqi3zray76i63ZQwAHWMjoLk3wTa1ajZWPcUnrhgmSWQYEHDJsxkny6VDTWEmVdfktxpGoTA81qe6QuCrDmazeQndmxhktxpGoTA81qe6QuCrDmazeQndmxhD'
    const signature2 = '4cf0909aa10f10341cd7ca013630492d09b65e50c80974e962d94bbc95df635e90afb2e4dd22eb254cb451ca26a6aeb0b88e9b031a2233b2a16d56252dba83f9632-more-than-130-characters'
    const result = convertSignatures([signature1, signature2], mockConvertSignature)

    expect(result[0]).toBe(mockedConvertedSignatureValue)
    expect(result[1]).toBe(signature2)
  })

  it('should convert multiple signatures given string with length === 130 characters', () => {
    const signature1 = 'SIG_K1_HKkqi3zray76i63ZQwAHWMjoLk3wTa1ajZWPcUnrhgmSWQYEHDJsxkny6VDTWEmVdfktxpGoTA81qe6QuCrDmazeQndmxhktxpGoTA81qe6QuCrDmazeQndmxhD'
    const signature2 = 'SIG_K1_HKkqi3zray76i63ZQwAHWMjoLk3wTa1ajZWPcUnrhgmSWQYEHDJsxkny6VDTWEmVdfktxpGoTA81qe6QuCrDmazeQndmxhktxpGoTA81qe6QuCrDmazeQndmxhD'
    const result = convertSignatures([signature1, signature2], mockConvertSignature)

    expect(result[0]).toBe(mockedConvertedSignatureValue)
    expect(result[1]).toBe(mockedConvertedSignatureValue)
  })
})

function mockConvertSignature(signature: string) {
  return mockedConvertedSignatureValue
}
