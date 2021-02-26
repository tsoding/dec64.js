(module
 (memory (import "imports" "mem") 1)
 (func $pack (export "pack")
       (param $coeff i64)
       (param $exp i64)
       (result i64)
       (i64.or
        (i64.shl
         (get_local $coeff)
         (i64.const 8))
        (i64.and
         (get_local $exp)
         (i64.const 0xFF))))
 (func $unpackExp (export "unpackExp")
       (param $a i64)
       (result i64)
       (i64.shr_s
        (i64.shl
         (get_local $a)
         (i64.const 56))
        (i64.const 56)))
 (func $unpackCoeff (export "unpackCoeff")
       (param $a i64)
       (result i64)
       (i64.shr_s
        (get_local $a)
        (i64.const 8)))
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
