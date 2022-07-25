```
<operator>: +, -, *, /, %, ==, !=, <, >, <=, >=, <-, ??, in

<left expression> <operator> <right expression>
```

> extends [`<expression>`](./_base/expression.md)

---

```swift
let x = {
    foo: 5
};

x <- "foo";

null() ?? 1;
2 ?? 3;
```

See [Examples/Operators](../../examples/operators.tiny) for `in` operator.