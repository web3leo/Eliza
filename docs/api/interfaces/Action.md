# Interface: Action

Represents an action that the agent can perform, including conditions for its use, a description, examples, a handler function, and a validation function.

## Properties

### similes

> **similes**: `string`[]

#### Defined in

[packages/core/src/types.ts:215](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L215)

---

### description

> **description**: `string`

#### Defined in

[packages/core/src/types.ts:216](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L216)

---

### examples

> **examples**: [`ActionExample`](ActionExample.md)[][]

#### Defined in

[packages/core/src/types.ts:217](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L217)

---

### handler

> **handler**: [`Handler`](../type-aliases/Handler.md)

#### Defined in

[packages/core/src/types.ts:218](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L218)

---

### name

> **name**: `string`

#### Defined in

[packages/core/src/types.ts:219](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L219)

---

### validate

> **validate**: [`Validator`](../type-aliases/Validator.md)

#### Defined in

[packages/core/src/types.ts:220](https://github.com/ai16z/eliza/blob/main/packages/core/src/types.ts#L220)
