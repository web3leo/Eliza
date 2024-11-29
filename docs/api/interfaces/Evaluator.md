[@ai16z/eliza v0.1.4-alpha.3](../index.md) / Evaluator

# Interface: Evaluator

Evaluator for assessing agent responses

## Properties

### alwaysRun?

> `optional` **alwaysRun**: `boolean`

Whether to always run

#### Defined in

[packages/core/src/types.ts:425](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L425)

***

### description

> **description**: `string`

Detailed description

#### Defined in

[packages/core/src/types.ts:428](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L428)

***

### similes

> **similes**: `string`[]

Similar evaluator descriptions

#### Defined in

[packages/core/src/types.ts:431](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L431)

***

### examples

> **examples**: [`EvaluationExample`](EvaluationExample.md)[]

Example evaluations

#### Defined in

[packages/core/src/types.ts:434](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L434)

***

### handler

> **handler**: [`Handler`](../type-aliases/Handler.md)

Handler function

#### Defined in

[packages/core/src/types.ts:437](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L437)

***

### name

> **name**: `string`

Evaluator name

#### Defined in

[packages/core/src/types.ts:440](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L440)

***

### validate

> **validate**: [`Validator`](../type-aliases/Validator.md)

Validation function

#### Defined in

[packages/core/src/types.ts:443](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L443)
