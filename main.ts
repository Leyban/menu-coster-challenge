import {
  GetProductsForIngredient,
  GetRecipes,
} from "./supporting-files/data-access";
import {
  Product,
  SupplierProduct,
  UoMName,
  UoMType,
} from "./supporting-files/models";
import {
  GetCostPerBaseUnit,
  GetNutrientFactInBaseUnits,
} from "./supporting-files/helpers";
import { ExpectedRecipeSummary, RunTest } from "./supporting-files/testing";

console.clear();
console.log("Expected Result Is:", ExpectedRecipeSummary);

const recipeData = GetRecipes(); // the list of 1 recipe you should calculate the information for
const recipeSummary: any = {}; // the final result to pass into the test function

/*
 * YOUR CODE GOES BELOW THIS, DO NOT MODIFY ABOVE
 * (You can add more imports if needed)
 * */

// Getting the cheapest product
const getCheapestProduct = (products: Product[]) => {
  // Set initial value
  let cheapestProduct: SupplierProduct = {
    supplierName: "",
    supplierProductName: "",
    supplierPrice: Number.MAX_VALUE,
    supplierProductUoM: {
      uomAmount: 0,
      uomName: UoMName.grams,
      uomType: UoMType.mass,
    },
  };
  let selectedProduct: Product = {
    productName: "",
    brandName: "",
    nutrientFacts: [],
    supplierProducts: [],
  };
  products.map((product) => {
    product.supplierProducts.map((supplierProduct) => {
      // Replace if product is cheaper
      if (
        GetCostPerBaseUnit(supplierProduct) <
        GetCostPerBaseUnit(cheapestProduct)
      ) {
        cheapestProduct = supplierProduct;
        selectedProduct = product;
      }
    });
  });
  return { cheapestProduct, selectedProduct };
};

// Sort Alphabetically
const sortObjectByKey = (unordered: object) => {
  const ordered = Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key];
      return obj;
    }, {});
  return ordered;
};

// Adding products to recipeSummary
recipeData.map((recipe) => {
  let totalPrice = 0;
  let nutrients = {};
  recipe.lineItems.map((lineItem) => {
    // get all products
    const products = GetProductsForIngredient(lineItem.ingredient);

    // calculating the total
    const { cheapestProduct, selectedProduct } = getCheapestProduct(products);
    totalPrice +=
      GetCostPerBaseUnit(cheapestProduct) * lineItem.unitOfMeasure.uomAmount;

    // adding all nutrientFacts
    selectedProduct.nutrientFacts.map((nutrientFact) => {
      const baseNutrient = GetNutrientFactInBaseUnits(nutrientFact);

      if (!nutrients[baseNutrient.nutrientName]) {
        nutrients[baseNutrient.nutrientName] = baseNutrient;
      } else {
        nutrients[baseNutrient.nutrientName].quantityAmount.uomAmount +=
          baseNutrient.quantityAmount.uomAmount;
      }
    });
  });

  const newRecipe = {
    cheapestCost: totalPrice,
    nutrientsAtCheapestCost: sortObjectByKey(nutrients),
  };

  recipeSummary[recipe.recipeName] = newRecipe;
});

/*
 * YOUR CODE ABOVE THIS, DO NOT MODIFY BELOW
 * */
RunTest(recipeSummary);
