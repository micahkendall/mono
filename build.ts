import {applyParamsToScript, Translucent, Utils} from "translucent-cardano"
import * as plutus from "./plutus.json"

const policyToVerify = "2376a27b7c3f1dc82198e8ec59875ef6e45a2abdb885f6ce8f604c45"

const genesisUtxo = {transactionId: {hash: "5f8a00dda1225ced3942acb544b62351b6e1fd6c909446c793ccc205245c6e74"}, outputIndex: 1n}
const script = applyParamsToScript(
    plutus.validators[0].compiledCode,
    [genesisUtxo, "d32f22e841ebaca47272ced568bd1148a4873cffd1a7406852f2e070", "6d6f6e6e6f6d"],
    {
        dataType: 'list',
        items: [
          {
            title: 'OutputReference',
            anyOf: [
              {
                title: 'OutputReference',
                dataType: 'constructor',
                index: 0,
                fields: [
                  {
                    title: 'transactionId',
                    anyOf: [
                      {
                        title: 'TransactionId',
                        dataType: 'constructor',
                        index: 0,
                        fields: [{ dataType: 'bytes', title: 'hash' }],
                      },
                    ],
                  },
                  { dataType: 'integer', title: 'outputIndex' },
                ],
              },
            ],
          },
          { dataType: 'bytes' },
          { dataType: 'bytes' },
        ],
      } as any
)

const translucent = await Translucent.new(undefined, "Mainnet")
const calculatedScriptHash = translucent.utils.validatorToScriptHash({type: "PlutusV2", script})
console.log("Chain Equivalence Check: ", calculatedScriptHash == policyToVerify)