(module
 ;; (memory (import "js" "mem") 1)
 (func $getExp (export "getExp")
       (param $a i64)
       (result i64)
       (i64.const 69))
 (func $getCoeff (export "getCoeff")
       (param $a i64)
       (result i64)
       (i64.const 69))
 (func $toString (export "toString")
       (param $ptr i64)
       (result i64)
       (i64.const 69))
 (func $fromString (export "fromString")
       (param $ptr i64)
       (param $size i64)
       (result i64)
       (i64.const 69))
 (func $fromI64 (export "fromI64")
       (param $a i64)
       (result i64)
       (i64.const 69))
 (func $add (export "add")
       (param $a i64)
       (param $b i64)
       (result i64)
       (i64.const 69))
 (func $sub (export "sub")
       (param $a i64)
       (param $b i64)
       (result i64)
       (i64.const 69))
 (func $mul (export "mul")
       (param $a i64)
       (param $b i64)
       (result i64)
       (i64.const 69))
 (func $div (export "div")
       (param $a i64)
       (param $b i64)
       (result i64)
       (i64.const 69)))