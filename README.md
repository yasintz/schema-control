# Schema Control

> Small type contoller for javascript. Powered by Lodash. 

```js
const Data = 
  [
  {name:"john",mission:"teacher",age:30,isOnline:false},
  {name:"mike",mission:"driver",age:35,isOnline:true},
  ]

const Schema ={name:"string",mission:"string",age:"number",isOnline:"boolean"}

SchemaControl([Schema],Data) //true
```

# Installation
` npm i schema-control `<br>
or <br>
` yarn add schema-control `<br>
# Usage
Basit veriler icin kullanim
```js
const SchemaControl = require('schema-control') //or using import 

const Schema = "string"
const Data = "This is String :)"

SchemaControl(Schema,Data) // true

SchemaControl(Schema,15) // false

SchemaControl(Schema,true) // false

const Schema = "string"
const StringArray = ["String 1","String 2","String 3"]

// Arrayin tipini kotrol etmek icin Schemayi bir array icine almalisin

// butun elemanlarin turu string oldugu icin true doner

SchemaControl([Schema],StringArray) // true

const Schema = "string"
const ArrayData= ["String 1","String 2","String 3", 15]

// icinde number bir tip oldugu icin false donderir

SchemaControl([Schema],ArrayData) // false 

```

Kendi Tipini olusturabilirsin
```js
const SchemaControl = require('schema-control') //or using import 

const MySchema ={name:"string",mission:"string",age:"number",isOnline:"boolean"}
const Data ={name:"john",mission:"teacher",age:30,isOnline:false}

// Data icindeki fieldlerin key'ine ve tipine bakar

SchemaControl(MySchema,Data) //true

const MySchema ={name:"string",mission:"string",age:"number",isOnline:"boolean"}
const Data ={name:"john",mission:"teacher",age:30,isOnline:false,Nothin:"nothing"}

// Data icinde Nothing olmamasi gerekir buyuzden false doner

SchemaControl(MySchema,Data) // false

```

Surekli ayni semayi kullanmak mi istiyorsun

```js 
const SchemaControl = require('schema-control') //or using import 
const MySchema ={name:"string",mission:"string",age:"number",isOnline:"boolean"}

const SpecificSchema=SchemaControl(MySchema)

const Data_One = {name:"john",mission:"teacher",age:30,isOnline:false}

const Data_Two = {name:"mike",mission:"driver",age:40,isOnline:true}

SpecificSchema(Data_One) //true

SpecificSchema(Data_Two) //true
```
yada 
```js 
const MySchema ={name:"string",mission:"string",age:"number",isOnline:"boolean"}

const SpecificSchema = require('schema-control')(MySchema)

const Data_One = {name:"john",mission:"teacher",age:30,isOnline:false}

const Data_Two = {name:"mike",mission:"driver",age:40,isOnline:true}

SpecificSchema(Data_One) //true

SpecificSchema(Data_Two) //true
```
Birden fazla sema kotrolu de yapilabilir 
> eger SchemaControl fonksiyonunun ilk paramatresine uzunlugu 1 den fazla olan bir array verirseniz multi tip moduna gecer 
- basit tipler icin multi tip kontrolu
```js
const SchemaControl = require('schema-control') //or using import 

const string = "strting"
const number = "number"

SchemaControl([string,number],15) //true

SchemaControl([string,number],"This is string :)") //true

// string yada number tipinden farkli bir tip gonderirseniz hata verir
SchemaControl([string,number],true) // false

```
- karmasik tipler icin multi tip kontrolu
```js
const SchemaControl = require('schema-control') //or using import 

const string = "strting"
const number = "number"

const ArrayData = ["string 1","string 2","string 3", 1, 2, 3]

// Array icindeki elemanlar i kontrol eder eger gonderilen tiplerden herhangi birine uyuyorsa onu dogru olarak alir 
SchemaControl([string,number],ArrayData) //true

const ArrayData_Two = ["string 1","string 2","string 3", 1, 2, 3, true]

// arrayin icinde gonderilen tiplere uymayan bir tip oldugu icin false donderir
SchemaControl([string,number],ArrayData_Two) //false
```
eger arrayin elemanlarinin degilde kendisinin tipini kontrol etmek istiyorsaniz 
```js
const SchemaControl = require('schema-control') //or using import 

const string = "strting"
const number = "number"

const ArrayData = ["string 1","string 2","string 3"]

// tiplerin kendisinide array icine almaniz arrayin kendisinin genel olarak tipini kontrol etmesini saglar
// asagidaki kullanimda arrayin gelen tipi ya strin yada number olmak zorunda

SchemaControl([[string],[number]],ArrayData) //true

const ArrayData = ["string 1","string 2","string 3", 1]

// tiplerin icinde number olmasina ragmen bu false donderir sebebi ise  arrayin tipine bakmasi itemlerinin degil

SchemaControl([[string],[number]],ArrayData_Two) //false
```
