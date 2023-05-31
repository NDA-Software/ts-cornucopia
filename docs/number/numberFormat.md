# numberFormat (amount: number, options: Options) - 1.0.0

## Description

This function converts a number into a string and adds a separator every three integer digits.

## Parameters

- amount: base value to be modified.
- options: configuration object to change how the function works.

## Options

- thousandSeparator (Default: ','): The symbol that will be used to separate every 3 digits found between the integers.
- decimalSeparator (Default: '.'): The symbol that will be used to separate integer and decimals.
- decimalPlaces (Default: 2): Number of decimals places that will be kept and/or added to the end of the string.

## Returned Value

- String: formatted result.

## Usage:

```
import { numberFormat } from "ts-cornucopia/number";

const result = numberFormat(1000);

console.log(result);
// "1,000.00"
```
