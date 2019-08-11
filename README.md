# goodcodes-parser

[![travis build](https://img.shields.io/travis/jbdemonte/goodcodes-parser.svg)](https://travis-ci.org/jbdemonte/goodcodes-parser)
[![Coverage Status](https://coveralls.io/repos/github/jbdemonte/goodcodes-parser/badge.svg?branch=master)](https://coveralls.io/github/jbdemonte/goodcodes-parser?branch=master)
![node (tag)](https://img.shields.io/node/v/goodcodes-parser/latest.svg)

## Description

This tools extracts [GoodCodes](http://emulation.gametechwiki.com/index.php/GoodTools) from ROM names an returns a structured dataset.

## Installation

```
npm install --save goodcodes-parser
```
or
```
yarn add goodcodes-parser
```

## Usage

```typescript
import { parse } from 'goodcode-parser';
const result = parse('Zoop (U) [!].gen');
console.log(result);
```

```json
{
    "file": "Zoop (U) [!].gen",
    "cleaned": "Zoop.gen",
    "rom": "Zoop",
    "codes": {
        "countries": {
            "u": {
                "name": "USA"
            }
        },
        "good": true
    },
    "unknown": []
}
```

Have a look on the typing or on the tests to the all keys possibles.