# zeroPadding (value: number | string, quantity = number) - 1.0.0

## Description

This function adds "0"s as a padding to a string or number accordingly with its length.

## Parameters

- value: base value that will be converted to string if it is a number and will have the padding added as needed.
- quantity: the expected length of the resulting string.

## Returned Value

- String: formatted result.

## Usage:

```
import { zeroPadding } from "ts-cornucopia/number";

const result = zeroPadding(10, 3);

console.log(result);
// "010"
```
