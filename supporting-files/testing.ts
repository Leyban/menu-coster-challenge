import { isEqual } from 'lodash';

export const ExpectedRecipeSummary: any = {
    "Creme Brulee": {
        cheapestCost: 2.2291416666666666,
        nutrientsAtCheapestCost: {
            Carbohydrates: {
                nutrientName: "Carbohydrates",
                quantityAmount: {
                    uomAmount: 106.1,
                    uomName: "grams",
                    uomType: "mass"
                },
                quantityPer: {
                    uomAmount: 100,
                    uomName: "grams",
                    uomType: "mass"
                }
            },
            Fat: {
                nutrientName: "Fat",
                quantityAmount: {
                    uomAmount: 35,
                    uomName: "grams",
                    uomType: "mass"
                },
                quantityPer: {
                    uomAmount: 100,
                    uomName: "grams",
                    uomType: "mass"
                }
            },
            Protein: {
                nutrientName: "Protein",
                quantityAmount: {
                    uomAmount: 17.2,
                    uomName: "grams",
                    uomType: "mass"
                },
                quantityPer: {
                    uomAmount: 100,
                    uomName: "grams",
                    uomType: "mass"
                }
            },
            Sodium: {
                nutrientName: "Sodium",
                quantityAmount: {
                    uomAmount: 0.001,
                    uomName: "grams",
                    uomType: "mass"
                },
                quantityPer: {
                    uomAmount: 100,
                    uomName: "grams",
                    uomType: "mass"
                }
            }
        }
    }
};

export function RunTest(inputRecipeSummary: any) {
    for (const recipeName of Object.keys(ExpectedRecipeSummary)) {
        try {
            const expectedObj = ExpectedRecipeSummary[recipeName];
            const recievedObj = inputRecipeSummary[recipeName];

    //   Never do this to compare objects because order will matter
    //   const expected = JSON.stringify(expectedObj, null, 2);
    //   const recieved = JSON.stringify(recievedObj, null, 2);

    //   Use lodash instead
      console.log(
        `CHECKING RECIPE "${recipeName}" --- ${
          !isEqual(expectedObj, recievedObj) ? 'IN' : ''
        }CORRECT ANSWER`
      );
    } catch (error) {
      console.log('THREW ERROR --- INCORRECT ANSWER');
    }
  }
}
