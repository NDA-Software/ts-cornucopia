# randomRange (min: number, max: number) - 1.0.0

## Description

This function returns a random integer between two values.

## Parameters

- min: the minum amount possible for it to return.
- max: the maximum amount possible for it to return.

## Returned Value

- Number: Between min and max, inclusive.

## Usage:

```
import { randomRange } from "ts-cornucopia/number";

const result = randomRange(0, 50);

console.log(result);
// 0~50
```
